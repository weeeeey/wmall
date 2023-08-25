'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/hooks/useCart';
import { Color, Image as ImageType, Size } from '@/types';
import { Trash } from 'lucide-react';
import Image from 'next/image';

export const OrderCheckBox = ({
    productId,
    price,
    name,
}: {
    productId: string;
    price: number;
    name: string;
}) => {
    const { addCheck, deleteCheck } = useCart();
    return (
        <Checkbox
            key={productId}
            onCheckedChange={(checked) => {
                return checked
                    ? addCheck(productId, price, name)
                    : deleteCheck(productId);
            }}
        />
    );
};

interface OrderPriceProps {
    initialPrice: number;
}
export const OrderPrice = ({ initialPrice }: OrderPriceProps) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(initialPrice);
    return <div className="ml-3">{price}</div>;
};

interface OrderColorProps {
    initialColor: Color;
}

export const OrderColor = ({ initialColor }: OrderColorProps) => {
    return (
        <div
            className="w-4 h-4 rounded-full ring-1"
            style={{ backgroundColor: initialColor.value }}
        />
    );
};

interface OrderSizeProps {
    initialSize: Size;
}

export const OrderSize = ({ initialSize }: OrderSizeProps) => {
    return <div>{initialSize.name}</div>;
};

interface OrderImagesProps {
    initialImages: ImageType[];
}

export const OrderImages = ({ initialImages }: OrderImagesProps) => {
    if (initialImages.length === 0) {
        return <div></div>;
    }
    return (
        <div className="relative w-12 h-12">
            <Image
                alt={initialImages ? initialImages[0].url : '/shirt'}
                src={initialImages ? initialImages[0].url : '/shirt.png'}
                fill
                className="rounded-full"
            />
        </div>
    );
};

interface OrderDeleteProps {
    productId: string;
}

export const OrderDelete = ({ productId }: OrderDeleteProps) => {
    const { deleteCart, deleteCheck } = useCart();

    return (
        <Button
            onClick={() => {
                deleteCart(productId);
                deleteCheck(productId);
            }}
            variant="ghost"
        >
            <Trash className="w-4 h-4 rounded-full" />
        </Button>
    );
};
