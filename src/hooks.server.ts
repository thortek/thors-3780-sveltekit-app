// src/hooks.server.ts
import { sessionHooks, type Handler } from '@kinde-oss/kinde-auth-sveltekit'
import { initMongoDB } from '$lib/mongodb/mongodb.client'

export const handle: Handler = async ({ event, resolve }) => {
	// call a function to initialize the connection to the database
	await initMongoDB()

	sessionHooks({ event })
	const response = await resolve(event)
	return response
}
