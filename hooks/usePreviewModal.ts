import { create } from 'zustand';

interface PreviewModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePreviewModal = create<PreviewModal>((set) => ({
    isOpen: false,
    onOpen: () => set(() => ({ isOpen: true })),
    onClose: () => set(() => ({ isOpen: false })),
}));
