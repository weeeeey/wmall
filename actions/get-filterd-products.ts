import { Product } from '@/types';
import axios from 'axios';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getFilterdProducts = async (query: Query): Promise<Product[]> => {
    const { categoryId, colorId, isFeatured, sizeId } = query;
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId,
            sizeId,
            categoryId,
            isFeatured,
        },
    });
    const res = await axios(url, { headers: { 'Cache-Control': 'no-cache' } });

    return res.data;
};

export default getFilterdProducts;
