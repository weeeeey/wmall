import { Product } from '@/types';
import { MongoClient, ObjectId } from 'mongodb';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getProducts;
