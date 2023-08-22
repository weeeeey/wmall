'use client';
import { useCart } from '@/hooks/useCart';
import React from 'react';

const PaymentPage = () => {
    const { payProducts } = useCart();
    return <div>PaymentPage</div>;
};

export default PaymentPage;
