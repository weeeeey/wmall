import { getProduct } from '@/actions';
import React from 'react';

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    console.log(params.categoryId);
    return <div className=" "></div>;
};

export default CategoryPage;
