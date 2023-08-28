'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessForm from './components/success-form';

interface Payment {
    orderName: string;
    approvedAt: string;
    receipt: {
        url: string;
    };
    totalAmount: number;
    method: '카드' | '가상계좌' | '계좌이체';
}

export default function SuccessPage() {
    const params = useSearchParams();
    const amount = params.get('amount');
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');
    const [paydata, setPaydata] = useState<Payment>();
    const [isMount, setisMount] = useState(false);
    useEffect(() => {
        setisMount(true);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post<Payment>(
                    'https://api.tosspayments.com/v1/payments/confirm',
                    {
                        paymentKey,
                        orderId,
                        amount,
                    },
                    {
                        headers: {
                            Authorization: `Basic ${Buffer.from(
                                `${process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY}:`
                            ).toString('base64')}`,
                        },
                    }
                );
                const updateOrder = await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
                    {
                        orderId,
                        isPaid: true,
                    }
                );

                console.log(updateOrder.data);
                setPaydata({
                    orderName: res.data.orderName,
                    approvedAt: res.data.approvedAt,
                    method: res.data.method,
                    receipt: res.data.receipt,
                    totalAmount: res.data.totalAmount,
                });
            } catch (err: any) {
                console.error('err', err);
                return {
                    redirect: {
                        destination: `/fail?code=${err.code}&message=${err.message}`,
                        permanent: false,
                    },
                };
            }
        })();
    }, [amount, orderId, paymentKey]);
    if (!isMount) {
        return null;
    }

    return <div>{paydata && <SuccessForm payment={paydata} />}</div>;
}
