'use client';
import { Color, Size } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import OptionModal from './optionModal';
import { Button } from '@/components/ui/button';

interface MobileFilterProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilter = ({ colors, sizes }: MobileFilterProps) => {
    const [isOpen, setisOpen] = useState(false);
    const onClose = () => {
        setisOpen(false);
    };
    return (
        <div>
            {isOpen && (
                <OptionModal
                    onClick={onClose}
                    sizes={sizes}
                    colors={colors}
                    isOpen={isOpen}
                />
            )}
            <Button
                disabled={isOpen}
                onClick={() => {
                    setisOpen(true);
                }}
            >
                <SlidersHorizontal />
            </Button>
        </div>
    );
};

export default MobileFilter;
