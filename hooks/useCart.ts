import { Product } from '@/types';
import { count } from 'console';
import { create } from 'zustand';

interface useCartProps {
    count: number;
    products: Product[];
    addCart: (p: Product) => void;
    deleteCart: (id: string) => void;
}

export const useCart = create<useCartProps>((set) => ({
    count: 0,
    products: [],
    addCart: (p: Product) =>
        set((state) => ({
            count: state.count + 1,
            products: [...state.products, p],
        })),
    deleteCart: (id: string) =>
        set((state) => ({
            count: state.count - 1,
            products: state.products.filter((p: Product) => p.id !== id),
        })),
}));
