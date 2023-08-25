'use client';
import Container from '@/components/ui/container';
import { useCart } from '@/hooks/useCart';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TossPayment from './components/toss-payment';

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
import { useEffect, useState } from 'react';
import { useStateList } from 'react-use';

const formSchema = z.object({
    phone: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
});

const CheckoutPage = ({ params }: { params: { orderId: string } }) => {
    const [isMount, setisMount] = useState(false);
    const { payProducts, removeCart } = useCart();

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    const p = payProducts.reduce((acc, current) => acc + current.price, 0);
    const orderName = `${payProducts[0].name} ${
        payProducts.length === 1 ? '' : `외 ${payProducts.length - 1}`
    }`;
    const { orderId } = params;
    if (!orderId) {
        return null;
    }
    const showingPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(p);

    // const handleSummary = async () => {
    //     try {
    //         const res = await axios.post(
    //             `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
    //             {
    //                 productIds: payProducts.map((pro) => pro.id),
    //             }
    //         );
    //         console.log(res.data);
    //         toast.success('success');
    //         removeCart();
    //     } catch (error) {
    //         toast.error('error');
    //     }
    // };

    return (
        <div className="mt-12 mb-36 ">
            <Container>
                <TossPayment
                    price={p}
                    orderId={orderId}
                    orderName={orderName}
                    showingPrice={showingPrice}
                />
            </Container>
        </div>
    );
};

export default CheckoutPage;
