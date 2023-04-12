import type { Link } from '@prisma/client';
import { writable } from 'svelte/store';

type ContextMenuType = {
	x: number;
	y: number;
	showMenu: boolean;
	tab: Link | null;
};

export const contextMenu = writable<ContextMenuType>({ x: 0, y: 0, showMenu: false, tab: null });
