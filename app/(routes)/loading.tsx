'use client';
import Loader from '@/components/ui/loader';
import React from 'react';

const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Loader />
        </div>
    );
};

export default Loading;
