'use client';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NavbarActions = () => {
    const router = useRouter();
    const { count } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <button
            onClick={() => {
                router.push('/cart');
            }}
            className="bg-black text-white px-3 py-1 rounded-full flex justify-center items-center space-x-2 hover:ring-2 hover:ring-offset-2 hover ring-black"
        >
            <ShoppingBag className="w-4 h-4 " />
            <div>{count}</div>
        </button>
    );
};

export default NavbarActions;
