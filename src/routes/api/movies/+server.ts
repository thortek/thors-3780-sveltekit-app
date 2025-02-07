import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb/mongodb.client';

export const POST = async ({ request }) => {
    const body = await request.json();
    console.log('body: ', body);

 	let movies;
	let client;

	try {
		client = await clientPromise;
		const movieDb = client?.db('sample_mflix');
		const moviesCollection = movieDb?.collection('movies');

		const movieArray = await moviesCollection
			?.find({
                $and: [
				 { year: { $gte: 2000, $lte: 2016 }},
                 { 'imdb.rating': { $gte: 7 }},
                 {$or: [{ rated: 'PG' }, { rated: 'G' }]}
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