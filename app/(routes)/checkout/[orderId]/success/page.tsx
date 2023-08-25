'use client';
import { useSearchParams } from 'next/navigation';
import PostPayment from './components/post-payment';

export default function SuccessPage() {
    const params = useSearchParams();
    const amount = params.get('amount');
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');

    return (
        <div>
            <PostPayment
                amount={amount as string}
                paymentKey={paymentKey as string}
                orderId={orderId as string}
            />
        </div>
    );
}
