import { MongoClient } from 'mongodb';

const getSizes = async () => {
    const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONG_API_KEY!
    );
    const db = client.db();
    const wmallCollection = db.collection('Size');

    const wmalls = await wmallCollection.find().toArray();

    client.close();
    return wmalls;
};

export default getSizes;
