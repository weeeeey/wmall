'use client';
import Container from '@/components/ui/container';
import { useCart } from '@/hooks/useCart';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import PayItems from './components/pay-items';
import { useEffect, useState } from 'react';

const CartPage = () => {
    const { products } = useCart();

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    return (
        <div className="mt-12 mb-36 ">
            <Container>
                <div className="px-16">
                    <DataTable columns={columns} data={products} />
                    <PayItems />
                </div>
            </Container>
        </div>
    );
};

export default CartPage;
