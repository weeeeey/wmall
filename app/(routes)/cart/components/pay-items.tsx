'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PayItems = () => {
    const { payProducts, initializePayProducts, removeCart } = useCart();
    const p = payProducts.reduce((acc, current) => acc + current.price, 0);
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(p);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useParams();

    useEffect(() => {
        const url = `${pathname}`;
        if (url !== `${window.location.href}/pay`) {
            initializePayProducts();
        }
    }, []);

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

    return (
        <div className="flex flex-col items-end space-y-4 mt-8">
            <div className="flex space-x-4 justify-center items-center">
                <div className="text-sm font-light">Payment amount:</div>
                <div className="font-bold text-xl">{price}</div>
            </div>
            <Button
                onClick={() => {
                    handleSummary();
                }}
                className={cn('px-20', p ? 'bg-neutral-800' : 'bg-neutral-500')}
            >
                Buy
            </Button>
        </div>
    );
};

export default PayItems;
