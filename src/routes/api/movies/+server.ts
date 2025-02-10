import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { initMongoDB } from '$lib/mongodb/mongodb.client';

export const POST = async ({ request }) => {
    const body = await request.json();
    console.log('body: ', body);

 	let movies;
	let client;

	try {
		client = await initMongoDB();
		
		const movieDb = client?.db('sample_mflix');
		
		const moviesCollection = movieDb?.collection('movies');

		const movieArray = await moviesCollection
			?.find({
                $and: [
				 { year: { $gte: 1976, $lte: 1978 }},
                 { 'imdb.rating': { $gte: 8 }},
                 {$or: [{ rated: 'PG' }]}
            ]
			})
			.toArray();

		movies = movieArray?.map((movie) => {
			return {
				id: movie._id.toString(),
				title: movie.title,
				year: movie.year,
				poster: movie.poster
			};
		});

		//console.log('Movies: ', movies)
	} catch (error) {
		console.error('MongoDB connection error:', error);
		if (client) await client.close(); // if error, close the connection
		return json({ error: 'Internal Server Error' }, { status: 500 });
	} 
    return json(movies, { status: 200 });

}