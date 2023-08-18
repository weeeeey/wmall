import { ShoppingBag } from 'lucide-react';
import React from 'react';

const Navbar = () => {
    return (
        <div className="w-full h-16 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">STORE</h1>
                <div className="text-lg text-neutral-500">Suits</div>
                <div className="text-lg text-neutral-500">Shirts</div>
                <div className="text-lg text-neutral-500">Glasses</div>
            </div>
            <button className="px-2 py-1 bg-black flex justify-center items-center space-x-2 text-white rounded-xl">
                <ShoppingBag className="h-6 w-6" />
                <div>1</div>
            </button>
        </div>
    );
};

export default Navbar;
