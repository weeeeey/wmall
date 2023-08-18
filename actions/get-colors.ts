import { MongoClient } from 'mongodb';

const getColors = async () => {
    const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONG_API_KEY!
    );
    const db = client.db();
    const wmallCollection = db.collection('Color');

    const wmalls = await wmallCollection.find().toArray();

    client.close();
    return wmalls;
};

export default getColors;
