'use client';

import { Color, Size } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface OptionModalProps {
    onClick: () => void;
    sizes: Size[];
    colors: Color[];
    isOpen: boolean;
}

const OptionModal = ({ colors, sizes, onClick, isOpen }: OptionModalProps) => {
    const currentOption = qs.parseUrl(window.location.href).query;

    const [selectSize, setSelectSize] = useState(currentOption.sizeId);
    const [selectColor, setSelectColor] = useState(currentOption.colorId);

    const router = useRouter();

    const handleApply = () => {
        const url = qs.stringifyUrl({
            url: `${window.location.origin}${window.location.pathname}`,
            query: {
                colorId: selectColor,
                sizeId: selectSize,
            },
        });
        router.push(url, { scroll: false });
        onClick();
    };
    return (
        <div className="flex w-full h-full justify-center items-center">
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClick}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-14 text-left align-middle shadow-xl transition-all flex flex-col space-y-8">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-black/50"
                                    >
                                        Choice the options
                                    </Dialog.Title>
                                    {/* Size */}
                                    <div className="mt-4 flex flex-col space-y-4 px-6">
                                        <div className="text-xl font-semibold">
                                            Sizes
                                        </div>
                                        <hr />
                                        <div className=" flex flex-wrap space-x-4">
                                            {sizes.map((data: Size) => (
                                                <button
                                                    key={data.id}
                                                    value={data.value}
                                                    onClick={() => {
                                                        if (
                                                            selectSize ===
                                                            data.id
                                                        ) {
                                                            setSelectSize('');
                                                        } else {
                                                            setSelectSize(
                                                                data.id
                                                            );
                                                        }
                                                    }}
                                                    className={cn(
                                                        'border-[1px] font-medium text-black/100 rounded-lg px-3 py-2',
                                                        selectSize === data.id
                                                            ? 'bg-neutral-400'
                                                            : 'bg-white'
                                                    )}
                                                >
                                                    {data.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* color */}
                                    <div className="mt-4 flex flex-col space-y-4 px-6">
                                        <div className="text-xl font-semibold">
                                            Colors
                                        </div>
                                        <hr />
                                        <div className=" flex flex-wrap space-x-4">
                                            {colors.map((data: Color) => (
                                                <button
                                                    key={data.id}
                                                    value={data.value}
                                                    onClick={() => {
                                                        if (
                                                            selectColor ===
                                                            data.id
                                                        ) {
                                                            setSelectColor('');
                                                        } else {
                                                            setSelectColor(
                                                                data.id
                                                            );
                                                        }
                                                    }}
                                                    className={cn(
                                                        'border-[1px] font-medium text-black/100 rounded-lg px-3 py-2',
                                                        selectColor === data.id
                                                            ? 'bg-neutral-400'
                                                            : 'bg-white'
                                                    )}
                                                >
                                                    {data.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button onClick={handleApply}>Apply</Button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default OptionModal;
