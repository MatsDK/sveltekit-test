import type { DefaultSession } from '@auth/core/types';
import type { DefaultJWT } from '@auth/core/jwt';

declare module '@auth/core/types' {
	interface Session extends DefaultSession {
		user?: DefaultSession['user'] & { id: string };
	}
}

declare module '@auth/core/jwt' {
	interface JWT extends DefaultJWT {
		uid: string;
	}
}
