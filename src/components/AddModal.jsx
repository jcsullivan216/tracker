import React from 'react';
import AddUnitModal from './AddUnitModal';
import AddBuyerModal from './AddBuyerModal';

const AddModal = ({ onClose, onAdd, mode }) => {
  if (mode === 'users') {
    return <AddUnitModal onClose={onClose} onAdd={onAdd} />;
  }
  return <AddBuyerModal onClose={onClose} onAdd={onAdd} />;
};

export default AddModal;
