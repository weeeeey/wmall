import { Product } from '@/types';
import { count } from 'console';
import { create } from 'zustand';

interface PayProductProps {
    id: string;
    price: number;
}
interface useCartProps {
    count: number;
    products: Product[];
    payProducts: PayProductProps[];
    addCart: (p: Product) => void;
    deleteCart: (id: string) => void;
    addCheck: (id: string, price: number) => void;
    deleteCheck: (id: string) => void;
}

export const useCart = create<useCartProps>((set) => ({
    count: 0,
    products: [],
    payProducts: [],
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
    addCheck: (id: string, price: number) =>
        set((state) => ({
            payProducts: [...state.payProducts, { id, price }],
        })),
    deleteCheck: (id: string) =>
        set((state) => ({
            payProducts: state.payProducts.filter(
                (p: PayProductProps) => p.id !== id
            ),
        })),
}));
