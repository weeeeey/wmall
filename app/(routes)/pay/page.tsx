'use client';
import { useCart } from '@/hooks/useCart';
import React from 'react';

const PaymentPage = () => {
    const { payProducts } = useCart();
    payProducts.map((p: any) => console.log(p.price));
    return <div>PaymentPage</div>;
};

export default PaymentPage;
