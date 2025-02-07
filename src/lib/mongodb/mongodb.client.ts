import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const mongoURI = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient> | undefined;

export const initMongoDB = async () => {
	if (!clientPromise) {
		try {
			const client = new MongoClient(mongoURI, {
				serverApi: {
					version: ServerApiVersion.v1,
					strict: true,
					deprecationErrors: true
				}
			});
			clientPromise = client.connect()
            await clientPromise // Tests the connection
            console.log('MongoDB connected successfully');
		} catch (error) {
			console.error('MongoDB connection error:', error);
            throw error
		}
	}
    return clientPromise
}

export default clientPromise;
