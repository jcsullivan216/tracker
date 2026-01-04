import React from 'react';
import UserModal from './UserModal';
import BuyerModal from './BuyerModal';

const ItemModal = ({ item, onClose, onUpdate, onDelete, mode }) => {
  if (mode === 'users') {
    return <UserModal item={item} onClose={onClose} onUpdate={onUpdate} onDelete={onDelete} />;
  }
  return <BuyerModal item={item} onClose={onClose} onUpdate={onUpdate} onDelete={onDelete} />;
};

export default ItemModal;
