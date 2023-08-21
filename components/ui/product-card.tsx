'use client';

import { Product } from '@/types';
import Image from 'next/image';
import IconButton from './icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

interface ProductProps {
    data: Product;
}

const ProductCard = ({ data }: ProductProps) => {
    const router = useRouter();
    const { addCart } = useCart();

    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        addCart(data);
    };
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(+data.price);

    const handleClick = () => {
        router.push(`/product/${data.id}`);
    };

    return (
        <div className="border-[1px] p-4 rounded-lg space-y-4 shadow-lg hover:bg-slate-100 transition">
            <div className="aspect-square relative">
                {data.images.length !== 0 ? (
                    <Image
                        alt="product card"
                        src={data.images[0].url}
                        fill
                        className="aspect-square object-cover rounded-md"
                    />
                ) : (
                    <div className="flex justify-center items-center h-full text-neutral-500 bg-slate-200 rounded-md">
                        이미지 준비 중
                    </div>
                )}
                <div className="absolute bottom-5 w-full">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            onClick={() => {}}
                            icon={
                                <Expand
                                    size={20}
                                    className="text-gray-600 hover:scale-125 transition"
                                />
                            }
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={
                                <ShoppingCart
                                    size={20}
                                    className="text-gray-600 hover:scale-125 transition"
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start">
                <div
                    className="inline text-xl font-semibold cursor-pointer "
                    onClick={handleClick}
                >
                    {data.name}
                </div>
                <div
                    className="text-sm font-medium text-neutral-400 cursor-pointer "
                    onClick={() => {
                        router.push(`/category/${data.category.id}`);
                    }}
                >
                    {data.category.name}
                </div>
            </div>
            <div className="text-xl font-semibold">{price}</div>
        </div>
    );
};

export default ProductCard;
