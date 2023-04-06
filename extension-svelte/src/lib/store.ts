import { writable } from 'svelte/store'

export const session = writable<Session | null>(null)

export type Session = {
	expires: string
	user: User
}

export type User = {
	email: string
	id: string
	name: string
	image: string
}
