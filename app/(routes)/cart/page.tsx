'use client';
import Container from '@/components/ui/container';
import { useCart } from '@/hooks/useCart';
import React from 'react';
import CartItem from './components/cart-item';

const CartPage = () => {
    const { products } = useCart();

    return (
        <div>
            <Container>
                <CartItem data={products} />
            </Container>
        </div>
    );
};

export default CartPage;
