'use client';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClick: () => void;
}

const Modal = ({ isOpen, onClick }: ModalProps) => {
    return (
        <Dialog open={isOpen} onClose={onClick}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                </p>

                <button onClick={onClick}>Deactivate</button>
                <button onClick={onClick}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    );
};

export default Modal;
