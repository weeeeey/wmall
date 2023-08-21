import { Color } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
    const res = await fetch(URL, { headers: { 'Cache-Control': 'no-cache' } });

    return res.json();
};

export default getColors;
