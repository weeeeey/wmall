import { Size } from '@/types';
import React from 'react';

interface FilterProps {
    title: string;
    datas: Size[];
}
const Filter = ({ datas, title }: FilterProps) => {
    return (
        <div className="flex flex-col space-y-4 p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <hr />
            <div className="flex gap-4 flex-wrap">
                {datas.map((data: Size) => (
                    <div
                        key={data.id}
                        className="border-[1px] font-medium text-black/100 rounded-lg px-3 py-4"
                    >
                        {data.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
