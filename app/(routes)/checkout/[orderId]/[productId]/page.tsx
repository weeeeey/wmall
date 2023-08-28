import { getProduct } from '@/actions';
import Container from '@/components/ui/container';
import React from 'react';
import TossPayments from '@/app/(routes)/checkout/[orderId]/[productId]/components/toss-payment';
import { Product } from '@/types';

interface CheckoutOnePageProps {
    params: {
        orderId: string;
        productId: string;
    };
}

const CheckoutOnePage = async ({ params }: CheckoutOnePageProps) => {
    const { orderId, productId } = params;
    const product: Product = await getProduct(productId);
    const showingPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(+product.price);

    return (
        <div className="mt-12 mb-36">
            <Container>
                <TossPayments
                    orderId={orderId}
                    orderName={product.name}
                    price={+product.price}
                    productIds={[productId]}
                    showingPrice={showingPrice}
                />
            </Container>
        </div>
    );
};

export default CheckoutOnePage;
