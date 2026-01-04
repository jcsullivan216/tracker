import React from 'react';
import { Building2, User } from 'lucide-react';
import { getServiceColor, statusConfig } from '../data/config';
import { isCustomItem } from '../utils/helpers';

const BuyerCard = ({ item, onClick, compact = false }) => {
  const svc = getServiceColor(item.service);
  const st = statusConfig[item.status];
  const isCustom = isCustomItem(item.id);

  if (compact) {
    return (
      <div
        onClick={() => onClick(item)}
        style={{
          background: svc.bg,
          border: `1px solid ${svc.border}`,
          borderRadius: '6px',
          padding: '10px 12px',
          cursor: 'pointer',
          marginBottom: '8px',
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
          <span style={{ fontSize: '10px', color: '#64748b' }}>{item.organization}</span>
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
    );
  }

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        background: `linear-gradient(135deg, ${svc.bg} 0%, ${st.color} 100%)`,
        border: `1px solid ${svc.border}`,
        borderLeft: `4px solid ${svc.border}`,
        borderRadius: '8px',
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${svc.border}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {isCustom && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '8px',
          background: '#f59e0b',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '3px'
        }}>
          CUSTOM
        </div>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
            {item.name}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.organization}</div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px',
          marginLeft: '12px',
          marginTop: isCustom ? '16px' : '0'
        }}>
          <span style={{
            fontSize: '9px',
            fontWeight: '600',
            color: svc.text,
            background: svc.badge,
            padding: '2px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            {item.service}
          </span>
          <span style={{
            fontSize: '9px',
            color: st.textColor,
            background: `${st.border}33`,
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            {st.label}
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#64748b',
        fontSize: '11px',
        marginBottom: '6px'
      }}>
        <Building2 size={10} />{item.category}
      </div>
      {item.poc && (
        <div style={{
          fontSize: '11px',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <User size={10} />{item.poc}
        </div>
      )}
      {item.notes && (
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: '#94a3b8',
          fontStyle: 'italic',
          borderTop: '1px solid #334155',
          paddingTop: '8px'
        }}>
          {item.notes}
        </div>
      )}
    </div>
  );
};

export default BuyerCard;
