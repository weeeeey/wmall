import { getProduct } from '@/actions';
import React from 'react';

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { categoryId } = params;

    return <div className=" "></div>;
};

export default CategoryPage;
