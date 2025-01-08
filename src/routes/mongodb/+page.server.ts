import clientPromise from "$lib/mongodb/mongodb.client";

export async function load() {
    const client = await clientPromise;
    try {
        await client?.db('sample_airbnb').command({ ping: 1 });
        console.log('Pinged my MongoDB database.  It worked!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    } finally {
        await client?.close();
    }
}