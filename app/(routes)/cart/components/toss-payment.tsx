import { useEffect, useRef, useState } from 'react';
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
    ANONYMOUS,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useAsync } from 'react-use';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TossPaymentProps {
    price: number;
}

const TossPayment = ({ price }: TossPaymentProps) => {
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance['renderPaymentMethods']
    > | null>(null);

    useAsync(async () => {
        // ------  결제위젯 초기화 ------
        // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
        const paymentWidget = await loadPaymentWidget(
            process.env.NEXT_PUBLIC_TOSS_API_CLIENT!,
            ANONYMOUS
        );
        // ------  결제위젯 렌더링 ------
        // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            '#payment-widget',
            { value: price }
        );

        // ------  이용약관 렌더링 ------
        // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
        paymentWidget.renderAgreement('#agreement');

        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        // ------ 금액 업데이트 ------
        // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
        paymentMethodsWidget.updateAmount(
            price,
            paymentMethodsWidget.UPDATE_REASON.COUPON
        );
    }, [price]);

    const handleBtn = async () => {
        const paymentWidget = paymentWidgetRef.current;

        try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: '토스 티셔츠 외 2건',
                customerName: '김토스',
                customerEmail: 'customer123@gmail.com',
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            });
        } catch (error) {
            // 에러 처리하기
            console.error(error);
        }
    };

    return (
        <Button
            onClick={handleBtn}
            className={cn('px-20', price ? 'bg-neutral-800' : 'bg-neutral-500')}
        >
            Buy
        </Button>
    );
};

export default TossPayment;
