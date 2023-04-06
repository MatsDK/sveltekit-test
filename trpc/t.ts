import type { Context } from './context';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';

export const t = initTRPC.context<Context>().create();

const auth = t.middleware(async ({ next, ctx }) => {
	if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});

export const publicProcedure = t.procedure;
export const authProcedure = t.procedure.use(auth);
