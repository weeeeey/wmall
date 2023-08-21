import { LucideIcon } from 'lucide-react';
import React, { MouseEventHandler } from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
    return <button onClick={onClick}>{Icon}</button>;
};

export default IconButton;
