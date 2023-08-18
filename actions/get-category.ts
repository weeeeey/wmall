import { MongoClient, ObjectId } from 'mongodb';

const getCategory = async (id: string) => {
    const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONG_API_KEY!
    );
    const db = client.db();
    const wmallCollection = db.collection('Category');

    const wmall = await wmallCollection.findOne({
        _id: new ObjectId(id),
    });
    console.log(wmall);

    client.close();
    return wmall;
};

export default getCategory;
