import { Size } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
    const res = await axios(URL, { headers: { 'Cache-Control': 'no-cache' } });

    return res.data;
};

export default getSizes;
