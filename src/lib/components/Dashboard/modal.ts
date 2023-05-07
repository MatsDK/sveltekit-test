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
