import React from 'react';
import { kanbanColumns, statusConfig } from '../data/config';
import ItemCard from './ItemCard';

const KanbanView = ({ filteredData, onItemClick, mode }) => {
  // Group items by status for kanban columns
  const getItemsByStatus = (status) => {
    return filteredData.filter(item => item.status === status);
  };

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '20px 24px'
    }}>
      <div style={{
        display: 'flex',
        gap: '16px',
        minHeight: '100%',
        paddingBottom: '20px'
      }}>
        {kanbanColumns.map(status => {
          const cfg = statusConfig[status];
          const items = getItemsByStatus(status);

          return (
            <div
              key={status}
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
              <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '12px'
              }}>
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={onItemClick}
                    compact
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
                    fontSize: '12px',
                    fontStyle: 'italic'
                  }}>
                    No items
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanView;
