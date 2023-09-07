'use client';
import { useRef, useState } from 'react';
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
    ANONYMOUS,
} from '@tosspayments/payment-widget-sdk';
import { useAsync } from 'react-use';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import getDollarToKr from '@/actions/get-dollarToKr';
import axios from 'axios';

const clientKey = process.env.NEXT_PUBLIC_TOSS_API_CLIENT;

interface TossPaymentsProps {
    orderId: string;
    orderName: string;
    price: number;
    showingPrice: string;
    productIds: string[];
}

const formSchema = z.object({
    phone: z
        .string()
        .min(2)
        .max(50)
        .regex(/^010\d{8}$/),
    address: z.string().min(2).max(50),
    customerEmail: z.string().min(2),
    customerName: z.string().min(2),
});

export default function TossPayments({
    price,
    orderId,
    orderName,
    showingPrice,
    productIds,
}: TossPaymentsProps) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            address: '',
            customerEmail: '',
            customerName: '',
        },
    });

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance['renderPaymentMethods']
    > | null>(null);

    useAsync(async () => {
        const paymentWidget = await loadPaymentWidget(clientKey!, ANONYMOUS); // 비회원 결제
        const krwPrice = await getDollarToKr(price);
        // console.log(krwPrice);
        // ------  결제위젯 렌더링 ------
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            '#payment-widget',
            // { value: krwPrice }
            { value: krwPrice }
        );

        // ------  이용약관 렌더링 ------
        paymentWidget.renderAgreement('#agreement');

        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const paymentWidget = paymentWidgetRef.current;

        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                productIds,
                orderId,
                phone: values.phone,
                address: values.address,
            });

            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
                orderId,
                orderName,
                customerName: values.customerName,
                customerEmail: values.customerEmail,
                successUrl: `${window.location.href}/success`,
                failUrl: `${window.location.href}/fail`,
            });
        } catch (error) {
            // 에러 처리하기
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full md:grid md:grid-cols-2  md:gap-x-8"
                >
                    <div className="px-6 flex flex-col justify-center space-y-6 mt-16 ">
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Customer name
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="name" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="customerEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Customer email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="email@0000.000"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Phone
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="01000000000"
                                            type="tel"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* daum-postcode로 업데이트 예정 */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col space-y-4">
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

                        <Button
                            type="submit"
                            className="ml-6"
                            disabled={loading}
                        >
                            결제하기
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
