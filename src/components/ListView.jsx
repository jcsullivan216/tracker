import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getServiceColor } from '../data/config';
import ItemCard from './ItemCard';

const ListView = ({
  groupedData,
  expandedGroups,
  setExpandedGroups,
  onItemClick,
  mode
}) => {
  const toggleGroup = (key) => {
    setExpandedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sortedGroups = Object.entries(groupedData).sort((a, b) => b[1].length - a[1].length);

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '20px 24px'
    }}>
      {sortedGroups.map(([service, items]) => {
        const svc = getServiceColor(service);
        const isExpanded = expandedGroups[service] !== false;

        return (
          <div key={service} style={{ marginBottom: '16px' }}>
            {/* Group Header */}
            <div
              onClick={() => toggleGroup(service)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: svc.bg,
                border: `1px solid ${svc.border}`,
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: isExpanded ? '12px' : '0',
                transition: 'all 0.2s ease'
              }}
            >
              {isExpanded ? (
                <ChevronDown size={18} style={{ color: svc.text }} />
              ) : (
                <ChevronRight size={18} style={{ color: svc.text }} />
              )}
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: svc.text,
                background: svc.badge,
                padding: '4px 12px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {service}
              </span>
              <span style={{
                color: '#94a3b8',
                fontSize: '13px',
                marginLeft: 'auto'
              }}>
                {items.length} {mode === 'users' ? 'units' : 'programs'}
              </span>
            </div>

            {/* Group Items */}
            {isExpanded && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '12px',
                paddingLeft: '12px'
              }}>
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={onItemClick}
                    mode={mode}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {sortedGroups.length === 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          color: '#64748b',
          fontSize: '14px'
        }}>
          No items match your filters
        </div>
      )}
    </div>
  );
};

export default ListView;
