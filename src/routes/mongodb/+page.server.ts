import { initMongoDB } from '$lib/mongodb/mongodb.client';
import type { PageServerLoad } from './$types';

let client

export const load: PageServerLoad = async ({ params }) => {
	client = await initMongoDB();
	try {
		await client?.db('sample_airbnb').command({ ping: 1 });
		console.log('Pinged my MongoDB database.  It worked!');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		return {
			status: 500,
			message: 'MongoDB connection error'
		};
	} finally {
		await client?.close();
	}

	return {
		status: 200,
		message: 'MongoDB connection successful'
	};
};
