import getBillboards from '@/actions/get-billboards';
import { MongoClient } from 'mongodb';
import React from 'react';

const HomePage = async () => {
    const billboards = await getBillboards();
    console.log(billboards);
    return <div>page</div>;
};

export default HomePage;
