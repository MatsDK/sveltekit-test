import db from "$lib/db"

// /** @type {import('./$types').PageServerLoad} */
export const load = async ({ }) => {
	return {
		todos: await db.todo.findMany()
	}
}