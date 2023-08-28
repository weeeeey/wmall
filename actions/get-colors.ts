import { Color } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
    const res = await axios(URL, { headers: { 'Cache-Control': 'no-cache' } });

    return res.data;
};

export default getColors;
