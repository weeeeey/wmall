import { Product } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    removeCart: () => void;
    addCheck: (id: string, price: number) => void;
    deleteCheck: (id: string) => void;
    initializePayProducts: () => void;
}

export const useCart = create(
    persist<useCartProps>(
        (set, get) => ({
            count: 0,
            products: [],
            payProducts: [],
            addCart: (p: Product) =>
                set({
                    count: get().count + 1,
                    products: [...get().products, p],
                }),
            deleteCart: (id: string) =>
                set({
                    count: get().count - 1,
                    products: get().products.filter(
                        (p: Product) => p.id !== id
                    ),
                }),
            removeCart: () =>
                set({
                    count: 0,
                    products: [],
                    payProducts: [],
                }),
            addCheck: (id: string, price: number) =>
                set({
                    payProducts: [...get().payProducts, { id, price }],
                }),
            deleteCheck: (id: string) =>
                set({
                    payProducts: get().payProducts.filter(
                        (p: PayProductProps) => p.id !== id
                    ),
                }),
            initializePayProducts: () =>
                set({
                    payProducts: [],
                }),
        }),
        { name: 'cart-storage', storage: createJSONStorage(() => localStorage) }
    )
);
