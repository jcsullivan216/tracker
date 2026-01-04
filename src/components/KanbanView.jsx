import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { kanbanColumns, statusConfig, getServiceColor } from '../data/config';
import { User, GripVertical } from 'lucide-react';

// Draggable card component
const DraggableCard = ({ item, onClick, mode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const svc = getServiceColor(item.service);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: svc.bg,
        border: `1px solid ${svc.border}`,
        borderRadius: '6px',
        padding: '10px 12px',
        marginBottom: '8px',
        cursor: 'grab',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          color: '#64748b',
          padding: '2px',
          marginTop: '2px',
        }}
      >
        <GripVertical size={14} />
      </div>

      {/* Card content - clickable */}
      <div
        onClick={() => onClick(item)}
        style={{ flex: 1, cursor: 'pointer' }}
      >
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
          {item.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '9px',
            color: svc.text,
            background: svc.badge,
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            {item.service}
          </span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>
            {mode === 'users' ? item.location : item.organization}
          </span>
        </div>
        {item.poc && (
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <User size={10} />{item.poc}
          </div>
        )}
      </div>
    </div>
  );
};

// Card preview for drag overlay
const CardPreview = ({ item, mode }) => {
  const svc = getServiceColor(item.service);

  return (
    <div
      style={{
        background: svc.bg,
        border: `2px solid ${svc.border}`,
        borderRadius: '6px',
        padding: '10px 12px',
        width: '280px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        cursor: 'grabbing',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
        {item.name}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '9px',
          color: svc.text,
          background: svc.badge,
          padding: '2px 6px',
          borderRadius: '3px'
        }}>
          {item.service}
        </span>
        <span style={{ fontSize: '10px', color: '#64748b' }}>
          {mode === 'users' ? item.location : item.organization}
        </span>
      </div>
    </div>
  );
};

// Droppable column component
const DroppableColumn = ({ status, items, onItemClick, mode }) => {
  const cfg = statusConfig[status];

  return (
    <div
      style={{
        flex: 1,
        minWidth: '280px',
        maxWidth: '350px',
        background: '#0f172a',
        borderRadius: '12px',
        border: `1px solid ${cfg.border}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Column Header */}
      <div style={{
        padding: '16px',
        borderBottom: `1px solid ${cfg.border}33`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: cfg.border
            }} />
            <span style={{
              color: cfg.textColor,
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {cfg.label}
            </span>
          </div>
          <span style={{
            background: `${cfg.border}33`,
            color: cfg.textColor,
            fontSize: '11px',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '6px'
          }}>
            {items.length}
          </span>
        </div>
      </div>

      {/* Column Items */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          minHeight: '100px'
        }}
      >
        <SortableContext
          items={items.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map(item => (
            <DraggableCard
              key={item.id}
              item={item}
              onClick={onItemClick}
              mode={mode}
            />
          ))}
        </SortableContext>

        {items.length === 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80px',
            color: '#475569',
            fontSize: '12px',
            fontStyle: 'italic',
            border: '2px dashed #334155',
            borderRadius: '8px'
          }}>
            Drop items here
          </div>
        )}
      </div>
    </div>
  );
};

const KanbanView = ({ filteredData, onItemClick, onStatusChange, mode }) => {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Group items by status for kanban columns
  const getItemsByStatus = (status) => {
    return filteredData.filter(item => item.status === status);
  };

  // Find which column an item belongs to
  const findColumn = (id) => {
    for (const status of kanbanColumns) {
      const items = getItemsByStatus(status);
      if (items.find(item => item.id === id)) {
        return status;
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeItem = filteredData.find(item => item.id === active.id);
    if (!activeItem) return;

    // Determine target status
    let targetStatus = null;

    // Check if dropped over a column (by checking if over.id is a status)
    if (kanbanColumns.includes(over.id)) {
      targetStatus = over.id;
    } else {
      // Dropped over another item - find that item's status
      const overItem = filteredData.find(item => item.id === over.id);
      if (overItem) {
        targetStatus = overItem.status;
      }
    }

    // Update status if changed
    if (targetStatus && targetStatus !== activeItem.status) {
      onStatusChange(activeItem.id, targetStatus);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeColumn = findColumn(activeId);
    let overColumn = null;

    if (kanbanColumns.includes(overId)) {
      overColumn = overId;
    } else {
      overColumn = findColumn(overId);
    }

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    // Update item status when dragged over a different column
    const activeItem = filteredData.find(item => item.id === activeId);
    if (activeItem && activeItem.status !== overColumn) {
      onStatusChange(activeId, overColumn);
    }
  };

  const activeItem = activeId ? filteredData.find(item => item.id === activeId) : null;

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '20px 24px'
    }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div style={{
          display: 'flex',
          gap: '16px',
          minHeight: '100%',
          paddingBottom: '20px'
        }}>
          {kanbanColumns.map(status => (
            <DroppableColumn
              key={status}
              status={status}
              items={getItemsByStatus(status)}
              onItemClick={onItemClick}
              mode={mode}
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <CardPreview item={activeItem} mode={mode} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanView;
