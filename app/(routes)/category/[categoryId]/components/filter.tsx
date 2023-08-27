'use client';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import qs from 'query-string';

interface FilterProps {
    title?: string;
    datas: Size[] | Color[];
    typeId: 'sizeId' | 'colorId';
}
const Filter = ({ datas, title, typeId }: FilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const seletedValue = searchParams.get(typeId);
    // 사이즈 내용 클릭 시 userouter를 통해 쿼리 스트링 넘겨주기

    const handleClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [typeId]: id,
        };
        if (current[typeId] === id) {
            query[typeId] = null;
        }
        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );
        router.push(url, { scroll: false });
    };
    return (
        <div className="flex flex-col space-y-4 p-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <hr />
            <div className="flex gap-4 flex-wrap">
                {datas.map((data: Size) => (
                    <button
                        key={data.id}
                        value={data.value}
                        className={cn(
                            'border-[1px] font-medium text-black/100 rounded-lg px-3 py-4',
                            seletedValue === data.id
                                ? 'bg-neutral-400'
                                : 'bg-white'
                        )}
                        // onClick={handleClick}
                        onClick={() => {
                            handleClick(data.id);
                        }}
                    >
                        {data.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
