import { Product } from '@/types';
import React from 'react';
import ProductCard from './ui/product-card';
import NoResults from './ui/no-results';

interface ProductListProps {
    data: Product[];
    title?: string;
}

const ProductList = ({ data, title }: ProductListProps) => {
    return (
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
            <h3 className="font-bold text-3xl">{title}</h3>
            {data.length === 0 && <NoResults />}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {data.map((product) => (
                    <ProductCard data={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
