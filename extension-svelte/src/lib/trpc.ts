import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { serverUrl } from './utils'
import type { Router } from '../../../trpc/router'

export const trpc = createTRPCProxyClient<Router>({
	links: [
		httpBatchLink({
			url: `${serverUrl}/trpc`,
		}),
	],
})
