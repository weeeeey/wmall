import { Billboard } from '@/types';
import axios from 'axios';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboards = async (): Promise<Billboard> => {
    const res = await axios(`${URL}`, {
        headers: { 'Cache-Control': 'no-cache' },
    });

    return res.data[0];
};

export default getBillboards;
