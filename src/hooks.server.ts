import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import prisma from '$lib/db';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { sequence } from '@sveltejs/kit/hooks';
import { createContext } from '../trpc/context';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '../trpc/router';

const authHandle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	session: {
		strategy: 'jwt'
	},
	debug: true,
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) session.user.id = token.uid;

			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) token.uid = user.id;

			return token;
		}
	}
});

const trpcHandle = createTRPCHandle({ router, createContext });

export const handle = sequence(authHandle, trpcHandle);
