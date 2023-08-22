'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PayItems = () => {
    const { payProducts, initializePayProducts } = useCart();
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

    return (
        <div className="flex flex-col items-end space-y-4 mt-8">
            <div className="flex space-x-4 justify-center items-center">
                <div className="text-sm font-light">Payment amount:</div>
                <div className="font-bold text-xl">{price}</div>
            </div>
            <Button
                onClick={() => {
                    router.push('/pay');
                }}
                className={cn('px-20', p ? 'bg-neutral-800' : 'bg-neutral-500')}
            >
                Buy
            </Button>
        </div>
    );
};

export default PayItems;
