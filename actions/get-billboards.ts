import { Billboard } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboards = async (id: string): Promise<Billboard> => {
    const res = await axios(`${URL}/${id}`, {
        headers: { 'Cache-Control': 'no-cache' },
    });

    return res.data;
};

export default getBillboards;
