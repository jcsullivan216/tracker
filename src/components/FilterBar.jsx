import React from 'react';
import { Search, List, Kanban, Plus } from 'lucide-react';
import { statusConfig } from '../data/config';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterService,
  setFilterService,
  filterCategory,
  setFilterCategory,
  viewMode,
  setViewMode,
  services,
  categories,
  mode,
  onAddClick
}) => {
  return (
    <div style={{
      padding: '16px 24px',
      background: '#0f172a',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#1e293b',
        borderRadius: '8px',
        padding: '8px 12px',
        flex: '1',
        minWidth: '200px',
        maxWidth: '400px'
      }}>
        <Search size={16} style={{ color: '#64748b', marginRight: '8px' }} />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={mode === 'users' ? 'Search units, locations, missions...' : 'Search programs, organizations...'}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f1f5f9',
            fontSize: '13px',
            width: '100%'
          }}
        />
      </div>

      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#f1f5f9',
          fontSize: '13px',
          cursor: 'pointer'
        }}
      >
        <option value="all">All Status</option>
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <option key={key} value={key}>{cfg.label}</option>
        ))}
      </select>

      {/* Service Filter */}
      <select
        value={filterService}
        onChange={e => setFilterService(e.target.value)}
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#f1f5f9',
          fontSize: '13px',
          cursor: 'pointer'
        }}
      >
        <option value="all">All {mode === 'users' ? 'Services' : 'Agencies'}</option>
        {services.map(svc => (
          <option key={svc} value={svc}>{svc}</option>
        ))}
      </select>

      {/* Category Filter (Buyers only) */}
      {mode === 'buyers' && (
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#f1f5f9',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}

      <div style={{ flex: 1 }} />

      {/* View Mode Toggle */}
      <div style={{
        display: 'flex',
        background: '#1e293b',
        borderRadius: '8px',
        padding: '4px',
        gap: '4px'
      }}>
        <button
          onClick={() => setViewMode('list')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: viewMode === 'list' ? '#334155' : 'transparent',
            color: viewMode === 'list' ? '#f1f5f9' : '#64748b',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <List size={14} />
          List
        </button>
        <button
          onClick={() => setViewMode('kanban')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: viewMode === 'kanban' ? '#334155' : 'transparent',
            color: viewMode === 'kanban' ? '#f1f5f9' : '#64748b',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <Kanban size={14} />
          Pipeline
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={onAddClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          background: mode === 'users'
            ? 'linear-gradient(135deg, #2563eb, #1e40af)'
            : 'linear-gradient(135deg, #f59e0b, #b45309)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600'
        }}
      >
        <Plus size={16} />
        Add {mode === 'users' ? 'Unit' : 'Buyer'}
      </button>
    </div>
  );
};

export default FilterBar;
