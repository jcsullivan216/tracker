import React, { useState, useMemo } from 'react';

// Data
import usersData from './data/users.json';
import buyersData from './data/buyers.json';

// Components
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ListView from './components/ListView';
import KanbanView from './components/KanbanView';
import ItemModal from './components/ItemModal';
import AddModal from './components/AddModal';

// Utils
import { generateId, getCurrentDate, filterData, groupByService, calculateStats } from './utils/helpers';

function App() {
  // Mode state: 'users' or 'buyers'
  const [mode, setMode] = useState('users');

  // Data state
  const [units, setUnits] = useState(usersData);
  const [orgs, setOrgs] = useState(buyersData);

  // UI state
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});
  const [viewMode, setViewMode] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);

  // Get current data based on mode
  const data = mode === 'users' ? units : orgs;
  const setData = mode === 'users' ? setUnits : setOrgs;

  // Computed values
  const services = useMemo(() =>
    [...new Set(data.map(d => d.service))].sort(),
    [data]
  );

  const categories = useMemo(() =>
    mode === 'buyers' ? [...new Set(orgs.map(o => o.category))].sort() : [],
    [orgs, mode]
  );

  const filteredData = useMemo(() =>
    filterData(data, {
      status: filterStatus,
      service: filterService,
      category: filterCategory,
      search: searchQuery
    }, mode),
    [data, filterStatus, filterService, filterCategory, searchQuery, mode]
  );

  const groupedData = useMemo(() =>
    groupByService(filteredData),
    [filteredData]
  );

  const stats = useMemo(() =>
    calculateStats(data),
    [data]
  );

  // Handlers
  const updateItem = (itemId, updates) => {
    setData(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, ...updates, lastContact: getCurrentDate() }
        : item
    ));
  };

  const addItem = (newItem) => {
    const id = generateId(mode === 'users' ? 'unit' : 'org');
    setData(prev => [...prev, {
      ...newItem,
      id,
      status: 'not-engaged',
      lastContact: null
    }]);
  };

  const deleteItem = (itemId) => {
    setData(prev => prev.filter(item => item.id !== itemId));
    setSelectedItem(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFilterStatus('all');
    setFilterService('all');
    setFilterCategory('all');
    setSearchQuery('');
    setSelectedItem(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Header
        mode={mode}
        setMode={handleModeChange}
        stats={stats}
      />

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterService={filterService}
        setFilterService={setFilterService}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        services={services}
        categories={categories}
        mode={mode}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Main Content */}
      {viewMode === 'list' ? (
        <ListView
          groupedData={groupedData}
          expandedGroups={expandedGroups}
          setExpandedGroups={setExpandedGroups}
          onItemClick={setSelectedItem}
          mode={mode}
        />
      ) : (
        <KanbanView
          filteredData={filteredData}
          onItemClick={setSelectedItem}
          mode={mode}
        />
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={updateItem}
          onDelete={deleteItem}
          mode={mode}
        />
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onAdd={addItem}
          mode={mode}
        />
      )}
    </div>
  );
}

export default App;
