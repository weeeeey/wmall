import { Product } from '@/types';
import React from 'react';

interface CartItemProps {
    data: Product[];
}

const CartItem = ({ data }: CartItemProps) => {
    return <div className="px-8 flex flex-col"></div>;
};

export default CartItem;
