import { writable } from 'svelte/store';

type RenameModal = {
	active: boolean;
	name?: string;
	id?: string;
	type?: 'tab' | 'folder';
};

export const renameModal = writable<RenameModal>({ active: false });

export const closeRenameModal = () => {
	renameModal.set({ active: false });
};

type MoveTabModal = {
	active: boolean;
	currentLocation?: string;
	id?: string;
};

export const moveTabModal = writable<MoveTabModal>({ active: false });

export const closeMoveTabModal = () => {
	moveTabModal.set({ active: false });
};
