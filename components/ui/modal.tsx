'use client';
import { Product } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Gallery from './gallery';
import ItemInfo from './item-info';
import ProductList from '../product-list';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    data: Product;
    onClick: () => void;
}

const Modal = ({ isOpen, onClick, data }: ModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClick}>
                <div className="fixed inset-0 bg-black bg-opacity-25" />

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex h-full items-center justify-center  text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative space-y-4 p-4 w-full max-w-3xl overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl ">
                                <div className="absolute top-4 right-4">
                                    <button onClick={onClick}>
                                        <X className="w-6 h-6 rounded-full hover:ring-1 hover:ring-offset-2 hover:ring-black hover:outline-none" />
                                    </button>
                                </div>
                                <div className=" grid grid-cols-2 gap-x-2">
                                    <Gallery product={data} />
                                    <ItemInfo product={data} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
