import clientPromise from '$lib/mongodb/mongodb.client';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {
    console.log('params: ', params)

    let client, movie

    try {
        client = await clientPromise
        const movieDb = client?.db('sample_mflix')
        const moviesCollection = movieDb?.collection('movies')
        movie = await moviesCollection?.findOne({ _id: new ObjectId(params._id) })
        console.log('movie: ', movie)

        if (movie) {
            movie = {
                title: movie.title,
                id: movie._id.toString(),
            }
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