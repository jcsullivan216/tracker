import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { serviceColors } from '../data/config';

const buyerCategories = [
  'Electronic Warfare',
  'SIGINT',
  'Cyber/EW',
  'C4ISR',
  'C2',
  'AI/Autonomy',
  'Autonomy',
  'ISR',
  'Counter-UAS',
  'Space',
  'R&D',
  'Other'
];

const AddBuyerModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    service: 'OSD',
    organization: '',
    category: 'Electronic Warfare',
    description: '',
    notes: '',
    poc: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.organization) return;
    onAdd(formData);
    onClose();
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          border: '1px solid #f59e0b',
          borderRadius: '16px',
          padding: '28px',
          width: '600px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', margin: 0 }}>
            Add Custom Buyer/Program
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Name */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Program/Office Name *
            </label>
            <input
              value={formData.name}
              onChange={e => updateField('name', e.target.value)}
              placeholder="Enter program or office name..."
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

          {/* Organization */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Parent Organization *
            </label>
            <input
              value={formData.organization}
              onChange={e => updateField('organization', e.target.value)}
              placeholder="e.g., PEO IEW&S, DARPA TTO..."
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

          {/* Service/Agency */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Service/Agency
            </label>
            <select
              value={formData.service}
              onChange={e => updateField('service', e.target.value)}
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
            >
              {Object.keys(serviceColors).map(svc => (
                <option key={svc} value={svc}>{svc}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={e => updateField('category', e.target.value)}
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
            >
              {buyerCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder="Describe the program or organization..."
              style={{
                width: '100%',
                minHeight: '80px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '12px',
                color: '#f1f5f9',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* POC */}
          <div>
            <label style={{
              display: 'block',
              color: '#94a3b8',
              fontSize: '11px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Point of Contact
            </label>
            <input
              value={formData.poc}
              onChange={e => updateField('poc', e.target.value)}
              placeholder="Name, title, contact info..."
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
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.organization}
            style={{
              flex: 1,
              background: formData.name && formData.organization
                ? 'linear-gradient(135deg, #f59e0b, #b45309)'
                : '#334155',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: formData.name && formData.organization ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} />Add Buyer
          </button>
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

export default AddBuyerModal;
