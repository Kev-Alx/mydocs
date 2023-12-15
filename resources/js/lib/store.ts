import { create } from "zustand";
import { ReformattedDoc } from "./utils";

export type MDoc = {
    content: string | undefined;
    created_at: string;
    document_id: number | null;
    icon: string | null;
    id: number;
    is_folder: number;
    is_published: number;
    title: string;
    updated_at: string;
    user_id: number;
    author?: string;
};

export const useDocStore = create((set) => ({
    activeDocument: null,
    setActiveDocument: (document: MDoc) => set(document),
}));

interface FolderModal {
    isActive: boolean;
    isFolder: boolean;
    document_id: number | null;
    openModal: () => void;
    closeModal: () => void;
    updateData: (isFolder: boolean, document_id: number) => void;
}

export const useFolderModalStore = create<FolderModal>((set) => ({
    isActive: false,
    isFolder: true,
    document_id: null,
    openModal: () => set({ isActive: true }),
    closeModal: () => set({ isActive: false }),
    updateData: (isFolder, document_id) =>
        set((state) => ({ ...state, isFolder, document_id })),
}));

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};

export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen }),
}));

type PublishStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};

export const usePublish = create<PublishStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen }),
}));

type CopyContext = {
    copyDoc: ReformattedDoc | null;
    onCopy: (doc: ReformattedDoc | null) => void;
};

export const useCopy = create<CopyContext>((set, get) => ({
    copyDoc: null,
    onCopy: (doc) =>
        set({
            copyDoc: doc,
        }),
}));
