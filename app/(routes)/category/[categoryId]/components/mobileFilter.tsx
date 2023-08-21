import { Color, Size } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';

interface MobileFilterProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilter = ({ colors, sizes }: MobileFilterProps) => {
    return (
        <div>
            <SlidersHorizontal className="cursor-pointer" />
        </div>
    );
};

export default MobileFilter;
