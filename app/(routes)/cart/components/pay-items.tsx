'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const PayItems = () => {
    const router = useRouter();
    const { payProducts } = useCart();
    const p = payProducts.reduce((acc, current) => acc + current.price, 0);
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(p);
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
