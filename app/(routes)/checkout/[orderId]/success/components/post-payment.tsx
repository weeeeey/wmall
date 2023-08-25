import getTossSuccess from '@/actions/get-tossSuccess';

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

const PostPayment = async ({
    amount,
    orderId,
    paymentKey,
}: PostPaymentProps) => {
    const payment: any = await getTossSuccess({ amount, orderId, paymentKey });
    return (
        <div>
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>결제 성공</h1>
                <p>주문: {payment.orderName}</p>
                <p>결제 수단: {payment.method}</p>
                <p>결제 금액: {payment.totalAmount.toLocaleString()}원</p>

                <p>
                    <a href={payment.receipt.url}>영수증</a>
                </p>
            </main>
        </div>
    );
};

export default PostPayment;
