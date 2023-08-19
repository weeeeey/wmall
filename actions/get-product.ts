import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (categoryId: string): Promise<Product> => {
    const res = await fetch(`${URL}/${categoryId}`);

    return res.json();
};

export default getProduct;
