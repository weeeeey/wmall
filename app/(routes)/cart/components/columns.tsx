'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import {
    AllCheckBox,
    OrderCheckBox,
    OrderColor,
    OrderDelete,
    OrderImages,
    OrderPrice,
    OrderSize,
} from './col-actions';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Product>[] = [
    // checkbox
    {
        accessorKey: 'id',
        header: ({ table }) => {
            return <AllCheckBox table={table} />;
        },

        cell: ({ row }) => {
            return (
                <OrderCheckBox
                    productId={row.getValue('id')}
                    name={row.getValue('name')}
                    price={row.getValue('price')}
                    row={row}
                />
            );
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
            return (
                <div className="hidden sm:block">
                    <OrderSize initialSize={row.getValue('size')} />
                </div>
            );
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
        accessorKey: '_id',
        header: '',
        cell: ({ row }) => {
            return <OrderDelete productId={row.getValue('id')} />;
        },
    },
];
