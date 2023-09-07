import axios from 'axios';
import { format, sub } from 'date-fns';

// https://www.koreaexim.go.kr/site/program/financial/exchangeJSON

// https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C#tab1

// https://velog.io/@aimzero9303/Next.js-CORS-%EC%97%90%EB%9F%AC

const getDollarToKr = async (price: number) => {
    // next.config.js
    const searchdate = format(sub(new Date(), { days: 1 }), 'yyyyMMdd');
    const url = `/api?authkey=${process.env.NEXT_PUBLIC_ACCESS_KEY}&searchdate=${searchdate}&data=AP01`;
    const res = await axios(url);
    const usd = res.data
        .find((data: any) => data.cur_unit === 'USD')
        .bkpr.replace(',', '');

    return parseInt(+usd * price + '');
};

export default getDollarToKr;
