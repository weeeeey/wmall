import { Product } from '@/types';
import { create } from 'zustand';

interface useCartProps {
    onAddCart: (value: Product) => void;
}
