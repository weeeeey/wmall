import axios from 'axios';

interface PostPaymentProps {
    amount: string;
    paymentKey: string;
    orderId: string;
}
interface Payment {
    orderName: string;
    approvedAt: string;
    receipt: {
        url: string;
    };
    totalAmount: number;
    method: '카드' | '가상계좌' | '계좌이체';
}

const getTossSuccess = async ({
    amount,
    orderId,
    paymentKey,
}: PostPaymentProps) => {
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
        return res.data;
    } catch (err: any) {
        console.error('err', err);
        return {
            redirect: {
                destination: `/fail?code=${err.code}&message=${err.message}`,
                permanent: false,
            },
        };
    }
};

export default getTossSuccess;
