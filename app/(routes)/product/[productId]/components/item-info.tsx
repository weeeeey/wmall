'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ItemInfoProps {
    product: Product;
}
const ItemInfo = ({ product }: ItemInfoProps) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(+product.price);

    const router = useRouter();

    return (
        <div className=" h-full flex flex-col  items-start space-y-5 md:col-span-1">
            <div>
                <div className="text-3xl font-semibold mb-4">
                    {product.name}
                </div>
                <div className="font-medium ">{price}</div>
            </div>
            <hr />
            <div className="flex space-x-6 justify-center items-center">
                <div>Size:</div>
                <div>{product.size.name}</div>
            </div>
            <div className="flex space-x-6 justify-center items-center">
                <div>Color:</div>
                <div
                    className="rounded-full h-4 w-4"
                    style={{
                        backgroundColor: product.color.value,
                    }}
                />
            </div>
            <Button className="flex justify-center items-center space-x-2 px-16 bg-neutral-800 hover:ring-2 hover:ring-offset-2 hover:ring-black">
                <div>Add to a cart</div>
                <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button
                className="flex justify-center items-center space-x-2 px-24 bg-neutral-800 hover:ring-2 hover:ring-offset-2 hover:ring-black"
                onClick={() => {
                    router.push(`/cart/${product.id}`);
                }}
            >
                <div>Buy</div>
                <CreditCard className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default ItemInfo;
