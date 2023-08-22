'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import {
    OrderColor,
    OrderDelete,
    OrderImages,
    OrderPrice,
    OrderSize,
} from './col-actions';

export const columns: ColumnDef<Product>[] = [
    // checkbox
    {
        accessorKey: 'id',
        header: '',
        cell: ({ row }) => {
            return <Checkbox />;
        },
    },
    // Image
    {
        accessorKey: 'images',
        header: 'Image',
        cell: ({ row }) => {
            return <OrderImages initialImages={row.getValue('images')} />;
        },
    },
    // Name
    {
        accessorKey: 'name',
        header: 'Name',
    },
    // Size
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => {
            return <OrderSize initialSize={row.getValue('size')} />;
        },
    },

    // Color
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
            return <OrderColor initialColor={row.getValue('color')} />;
        },
    },
    // Price
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
            return <OrderPrice initialPrice={row.getValue('price')} />;
        },
    },
    // Order Delete
    {
        accessorKey: 'id',
        header: '',
        cell: ({ row }) => {
            return <OrderDelete productId={row.getValue('id')} />;
        },
    },
];
