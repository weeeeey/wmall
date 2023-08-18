import { MongoClient, ObjectId } from 'mongodb';

const getProduct = async (id: string) => {
    const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONG_API_KEY!
    );
    const db = client.db();
    const wmallCollection = db.collection('Product');

    const wmall = await wmallCollection.findOne({
        _id: new ObjectId(id),
    });
    client.close();
    return wmall;
};

export default getProduct;
