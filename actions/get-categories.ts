import { Category } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
    const res = await axios(URL!, { headers: { 'Cache-Control': 'no-cache' } });

    return res.data;
};

export default getCategories;
