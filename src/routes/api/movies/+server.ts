import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { initMongoDB } from '$lib/mongodb/mongodb.client';

async function validateImageUrl(url: string | null | undefined): Promise<string> {
    // Return default image if url is falsy
    if (!url) {
        return '/defaultMoviePoster.png';
    }

    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            return url;
        } else {
            return '/defaultMoviePoster.png';
        }
    } catch (error) {
        console.error('Error validating image URL:', error);
        return '/defaultMoviePoster.png';
    }
}

export const POST = async ({ request }) => {
    const {
		yearRange: [startYear, endYear],
		selectedRatings,
		scoreRange: [minScore, maxScore]
	} = await request.json();

 	let movies;
	let client;

	try {
		client = await initMongoDB();
		
		const movieDb = client?.db('sample_mflix');
		
		const moviesCollection = movieDb?.collection('movies');

		const movieArray = await moviesCollection
			?.find({
                $and: [
				 { year: { $gte: startYear, $lte: endYear }},
                 { 'imdb.rating': { $gte: minScore, $lte: maxScore }},
                 { rated: { $in: selectedRatings }}]
            
			})
			.toArray();

		movies = await Promise.all(
		(movieArray ?? []).map(async (movie) => ({
				id: movie._id.toString(),
				title: movie.title,
				year: movie.year,
				poster: await validateImageUrl(movie.poster)
			}))
		)

		//console.log('Movies: ', movies)
	} catch (error) {
		console.error('MongoDB connection error:', error);
		if (client) await client.close(); // if error, close the connection
		return json({ error: 'Internal Server Error' }, { status: 500 });
	} 
    return json(movies, { status: 200 });

}