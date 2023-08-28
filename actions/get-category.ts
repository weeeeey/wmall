import { Category } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (categoryId: string): Promise<Category> => {
    const res = await axios(`${URL}/${categoryId}`);

    return res.data;
};

export default getCategory;
