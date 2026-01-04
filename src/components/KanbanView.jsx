import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { statusConfig, getServiceColor } from '../data/config';
import { User, GripVertical } from 'lucide-react';

// All kanban columns including not-engaged
const allKanbanColumns = ['not-engaged', 'contacted', 'engaged', 'deployed', 'contract', 'on-ice'];

// Draggable card component
const DraggableCard = ({ item, onClick, mode }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  const svc = getServiceColor(item.service);

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
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
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
        touchAction: 'none',
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          color: '#94a3b8',
          padding: '2px',
          marginTop: '2px',
          touchAction: 'none',
        }}
      >
        <GripVertical size={16} />
      </div>

      {/* Card content - clickable */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick(item);
        }}
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
        width: '260px',
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
const DroppableColumn = ({ status, items, onItemClick, mode, isOver }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const cfg = statusConfig[status];

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minWidth: '240px',
        maxWidth: '300px',
        background: isOver ? '#1e293b' : '#0f172a',
        borderRadius: '12px',
        border: `2px solid ${isOver ? cfg.border : cfg.border + '33'}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Column Header */}
      <div style={{
        padding: '14px',
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
              fontSize: '12px',
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
            padding: '3px 8px',
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
          padding: '10px',
          minHeight: '150px'
        }}
      >
        {items.map(item => (
          <DraggableCard
            key={item.id}
            item={item}
            onClick={onItemClick}
            mode={mode}
          />
        ))}

        {items.length === 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            color: '#475569',
            fontSize: '11px',
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
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Group items by status for kanban columns
  const getItemsByStatus = (status) => {
    return filteredData.filter(item => item.status === status);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    setOverId(over?.id || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const activeItem = filteredData.find(item => item.id === active.id);
    if (!activeItem) return;

    // Check if dropped over a column
    const targetStatus = over.id;

    if (allKanbanColumns.includes(targetStatus) && targetStatus !== activeItem.status) {
      onStatusChange(activeItem.id, targetStatus);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
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
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div style={{
          display: 'flex',
          gap: '12px',
          minHeight: 'calc(100vh - 200px)',
          paddingBottom: '20px'
        }}>
          {allKanbanColumns.map(status => (
            <DroppableColumn
              key={status}
              status={status}
              items={getItemsByStatus(status)}
              onItemClick={onItemClick}
              mode={mode}
              isOver={overId === status}
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
