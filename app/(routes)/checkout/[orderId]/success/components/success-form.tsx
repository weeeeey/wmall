import { CheckCircle } from 'lucide-react';
import React from 'react';
import { format, parseISO } from 'date-fns';

interface SuccessFormProps {
    payment: {
        orderName: string;
        approvedAt: string;
        receipt: {
            url: string;
        };
        totalAmount: number;
        method: '카드' | '가상계좌' | '계좌이체';
    };
}

const SuccessForm = ({ payment }: SuccessFormProps) => {
    const formatedDate = format(
        parseISO(payment.approvedAt),
        'yyyy-MM-dd , HH:mm:ss'
    );

    return (
        <div className="w-full h-full flex flex-col justify-center items-center my-16 space-y-6">
            <h1 className="font-bold text-3xl">Complete payment</h1>
            <CheckCircle
                className="w-1/4 h-1/4 rounded-full text-neutral-500"
                style={{ strokeWidth: 1.5 }}
            />
            <p className="text-xl ">
                <span className="text-sm">주문:</span> {payment.orderName}
            </p>
            <p className="text-xl">
                <span className="text-sm">결제 수단:</span> {payment.method}
            </p>
            <p className="text-xl">
                <span className="text-sm">결제 금액:</span>{' '}
                {payment.totalAmount.toLocaleString()}원
            </p>
            <p className="text-xl">
                <span className="text-sm">결제 승인 시간:</span> {formatedDate}
            </p>
            <p className="text-xl border-b border-black">
                <a href={payment.receipt.url}>영수증</a>
                {/* https://developers.tosspayments.com/688119/accounts/862831/phases/test/payment-logs */}
            </p>
        </div>
    );
};

export default SuccessForm;
