'use client';
import Container from '@/components/ui/container';
import { useCart } from '@/hooks/useCart';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TossPayment from './components/toss-payment';
import CheckoutForm from './components/checkout-form';

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

const formSchema = z.object({
    phone: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
});

const CheckoutPage = ({ params }: { params: { orderId: string } }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: '',
            address: '',
        },
    });

    const { payProducts, removeCart } = useCart();
    const p = payProducts.reduce((acc, current) => acc + current.price, 0);
    const { orderId } = params;
    if (!orderId) {
        return null;
    }

    const handleSummary = async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
                {
                    productIds: payProducts.map((pro) => pro.id),
                }
            );
            console.log(res.data);
            toast.success('success');
            removeCart();
        } catch (error) {
            toast.error('error');
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <div className="mt-12 mb-36 ">
            <Container>
                <div className="px-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
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
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <TossPayment />
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;
