import React from 'react';
import UserCard from './UserCard';
import BuyerCard from './BuyerCard';

const ItemCard = ({ item, onClick, compact = false, mode }) => {
  if (mode === 'users') {
    return <UserCard item={item} onClick={onClick} compact={compact} />;
  }
  return <BuyerCard item={item} onClick={onClick} compact={compact} />;
};

export default ItemCard;
