import clientPromise from '$lib/mongodb/mongodb.client';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import type { Movie } from '$lib/types/MovieType';


export const load: PageServerLoad = async ({ params }) => {
    console.log('params: ', params)

    let client
    let movie: Movie | undefined

    try {
        client = await clientPromise
        const movieDb = client?.db('sample_mflix')
        const moviesCollection = movieDb?.collection('movies')
        const foundMovie = await moviesCollection?.findOne({ _id: new ObjectId(params._id) })
        console.log('foundMovie: ', foundMovie)

        if (foundMovie) {
            const { _id, ...movieData } = foundMovie
            movie = {
                id: _id.toString(),
                ...movieData
            } as Movie // Type assertion needed here because the MongoDB document may contain additional fields
        }
    } catch (error) {
        console.error('MongoDB connection error:', error)
        if (client) await client.close()
        return {
            status: 500,
            message: 'MongoDB connection error'
        }
    }
    // return the POJO movie object
    return {
        status: 200,
        body: movie
    }

}

/* runtime: movie.runtime,
plot: movie.plot,
rated: movie.rated,
imdb: {
    rating: movie.imdb.rating
}, */