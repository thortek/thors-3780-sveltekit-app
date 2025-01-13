import clientPromise from "$lib/mongodb/mongodb.client"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    let movies
    let client

    try {
        client = await clientPromise
        const movieDb = client?.db('sample_mflix')
        const moviesCollection = movieDb?.collection('movies')

        const movieArray = await moviesCollection?.find().limit(10).toArray()

        movies = movieArray?.map((movie) => {
            return { ...movie, _id: movie._id.toString() }
            }
        )
        
        console.log('Movies: ', movies)

    } catch (error) {
        console.error("MongoDB connection error:", error)
        if (client) await client.close() // if error, close the connection
        return {
            status: 500,
            message: "MongoDB connection error"
        }
    }
    return {
        status: 200,
        body: movies
    }
}