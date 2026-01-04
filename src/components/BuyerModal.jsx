import React, { useState } from 'react';
import { X, Check, User } from 'lucide-react';
import { getServiceColor, statusConfig } from '../data/config';
import { isCustomItem } from '../utils/helpers';

const BuyerModal = ({ item, onClose, onUpdate, onDelete }) => {
  const [notes, setNotes] = useState(item.notes || '');
  const [status, setStatus] = useState(item.status);
  const [poc, setPoc] = useState(item.poc || '');
  const svc = getServiceColor(item.service);
  const isCustom = isCustomItem(item.id);

  const handleSave = () => {
    onUpdate(item.id, { status, notes, poc });
    onClose();
  };

  const handleDelete = () => {
    onDelete(item.id);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
          border: `1px solid ${svc.border}`,
          borderRadius: '16px',
          padding: '28px',
          width: '600px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: svc.text,
                background: svc.badge,
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {item.service}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#94a3b8',
                background: '#334155',
                padding: '4px 10px',
                borderRadius: '4px'
              }}>
                {item.category}
              </span>
              {isCustom && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#f59e0b',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  CUSTOM
                </span>
              )}
            </div>
            <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>
              {item.name}
            </h3>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.organization}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px', padding: '16px', background: '#1e293b', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
            Description
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            {item.description}
          </p>
        </div>

        {/* Point of Contact */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#94a3b8',
            fontSize: '11px',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Point of Contact
          </label>
          <input
            value={poc}
            onChange={e => setPoc(e.target.value)}
            placeholder="Name, title, email, phone..."
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '12px',
              color: '#f1f5f9',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Engagement Status */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#94a3b8',
            fontSize: '11px',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}>
            Engagement Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setStatus(key)}
                style={{
                  background: status === key ? cfg.color : '#0f172a',
                  border: `2px solid ${status === key ? cfg.textColor : '#334155'}`,
                  borderRadius: '8px',
                  padding: '12px',
                  color: status === key ? cfg.textColor : '#64748b',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            color: '#94a3b8',
            fontSize: '11px',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}>
            Notes & Intelligence
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add engagement notes, next steps, observations..."
            style={{
              width: '100%',
              minHeight: '100px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '14px',
              color: '#f1f5f9',
              fontSize: '13px',
              resize: 'vertical',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${svc.border}, ${svc.badge})`,
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Check size={18} />Save
          </button>
          {isCustom && (
            <button
              onClick={handleDelete}
              style={{
                padding: '14px 24px',
                background: '#7f1d1d',
                border: 'none',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '14px 24px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#94a3b8',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerModal;
