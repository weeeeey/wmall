import { useEffect, useRef, useState } from 'react';
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
    ANONYMOUS,
} from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import { useAsync } from 'react-use';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const clientKey = process.env.NEXT_PUBLIC_TOSS_API_CLIENT;

interface TossPaymentsProps {
    orderId: string;
    orderName: string;
    price: number;
    showingPrice: string;
}

const formSchema = z.object({
    phone: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
});

export default function TossPayments({
    price,
    orderId,
    orderName,
    showingPrice,
}: TossPaymentsProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            address: '',
        },
    });

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance['renderPaymentMethods']
    > | null>(null);

    useAsync(async () => {
        const paymentWidget = await loadPaymentWidget(clientKey!, ANONYMOUS); // 비회원 결제

        // ------  결제위젯 렌더링 ------
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            '#payment-widget',
            { value: price }
        );

        // ------  이용약관 렌더링 ------
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
        paymentMethodsWidget.updateAmount(
            price,
            paymentMethodsWidget.UPDATE_REASON.COUPON
        );
    }, [price]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const paymentWidget = paymentWidgetRef.current;

        try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
                orderId,
                orderName,
                customerName: 'anonymous',
                customerEmail: 'qser155@naver.com',
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            });
        } catch (error) {
            // 에러 처리하기
            console.error(error);
        }
    }
    return (
        <div>
            <main className="flex flex-col items-start ">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >
                        <div className="px-6 flex flex-col space-y-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col  space-y-4">
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">order </div>
                                    <div className="text-xl">{orderName}</div>
                                </div>
                                <hr />
                                <div className="flex items-center justify-between  w-full">
                                    <div className="text-xl ">Pay amount</div>
                                    <div className="font-semibold text-3xl">
                                        {showingPrice}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div id="payment-widget" className="w-full" />
                            <div id="agreement" className="w-full" />

                            <Button type="submit" className="ml-6">
                                결제하기
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    );
}
