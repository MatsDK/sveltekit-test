import db from "$lib/db"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ }) => {
	return {
		todos: await db.todo.findMany()
	}
}