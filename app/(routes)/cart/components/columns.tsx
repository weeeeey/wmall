'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Color, Image as ImageType, Product, Size } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: '',
        cell: ({ row }) => {
            return <Checkbox />;
        },
    },
    {
        accessorKey: 'images',
        header: 'Image',
        cell: ({ row }) => {
            const images: ImageType[] = row.getValue('images');
            return (
                <div className="relative w-12 h-12">
                    <Image
                        alt={images[0].url}
                        src={images[0].url}
                        fill
                        className="rounded-full"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => {
            const size: Size = row.getValue('size');
            return <div>{size.name}</div>;
        },
    },

    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
            const color: Color = row.getValue('color');
            return (
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                />
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const price = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(row.getValue('price'));
            return <div className="ml-3">{price}</div>;
        },
    },
];
