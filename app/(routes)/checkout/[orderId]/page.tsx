'use client';
import Container from '@/components/ui/container';
import { useCart } from '@/hooks/useCart';
import TossPayment from './components/toss-payment';

import { useEffect, useState } from 'react';

const CheckoutPage = ({ params }: { params: { orderId: string } }) => {
    const [isMount, setisMount] = useState(false);
    const { payProducts } = useCart();

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    const p = payProducts.reduce((acc, current) => acc + current.price, 0);
    const orderName = `${payProducts[0].name} ${
        payProducts.length === 1 ? '' : `외 ${payProducts.length - 1}`
    }`;
    const { orderId } = params;
    if (!orderId) {
        return null;
    }
    const showingPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(p);

    return (
        <div className="mt-12 mb-36 ">
            <Container>
                <TossPayment
                    price={p}
                    orderId={orderId}
                    orderName={orderName}
                    showingPrice={showingPrice}
                    productIds={payProducts.map((pro) => pro.id)}
                />
            </Container>
        </div>
    );
};

export default CheckoutPage;
