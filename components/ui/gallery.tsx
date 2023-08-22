import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

interface GalleryProps {
    product: Product;
}

const Gallery = ({ product }: GalleryProps) => {
    return (
        <div className="relative aspect-square md:col-span-1 ">
            <Image
                alt={product.name}
                src={
                    product.images.length !== 0
                        ? product.images[0].url
                        : '/shirt.png'
                }
                fill
                className="rounded-md "
            />
        </div>
    );
};

export default Gallery;
