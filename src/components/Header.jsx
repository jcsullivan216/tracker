import React from 'react';
import { Users, ShoppingCart, Zap } from 'lucide-react';

const Header = ({ mode, setMode, stats }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      padding: '20px 24px',
      borderBottom: '1px solid #334155'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={28} style={{ color: '#fbbf24' }} />
          <div>
            <h1 style={{
              color: '#f1f5f9',
              fontSize: '22px',
              fontWeight: '700',
              margin: 0
            }}>
              DoD Engagement Tracker
            </h1>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0 0' }}>
              EW/SIGINT Customer Relationship Management
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          background: '#1e293b',
          borderRadius: '10px',
          padding: '4px',
          gap: '4px'
        }}>
          <button
            onClick={() => setMode('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'users' ? 'linear-gradient(135deg, #2563eb, #1e40af)' : 'transparent',
              color: mode === 'users' ? 'white' : '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            <Users size={16} />
            Users
          </button>
          <button
            onClick={() => setMode('buyers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'buyers' ? 'linear-gradient(135deg, #f59e0b, #b45309)' : 'transparent',
              color: mode === 'buyers' ? 'white' : '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingCart size={16} />
            Buyers
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#64748b', fontSize: '12px' }}>Total:</span>
          <span style={{
            color: '#f1f5f9',
            fontSize: '16px',
            fontWeight: '700'
          }}>
            {stats.total}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#64748b', fontSize: '12px' }}>Engaged:</span>
          <span style={{
            color: '#4ade80',
            fontSize: '16px',
            fontWeight: '700'
          }}>
            {stats.engaged}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#64748b', fontSize: '12px' }}>Pipeline:</span>
          <span style={{
            color: '#60a5fa',
            fontSize: '16px',
            fontWeight: '700'
          }}>
            {stats.pipeline}
          </span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{
          background: '#1e293b',
          borderRadius: '6px',
          padding: '8px 16px'
        }}>
          <div style={{
            height: '6px',
            background: '#334155',
            borderRadius: '3px',
            width: '200px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(stats.engaged / stats.total) * 100}%`,
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            color: '#94a3b8',
            fontSize: '10px',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            {Math.round((stats.engaged / stats.total) * 100)}% Engaged
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
