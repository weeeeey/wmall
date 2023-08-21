import { LucideIcon } from 'lucide-react';
import React, { MouseEventHandler } from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ icon: Icon }: IconButtonProps) => {
    return <button>{Icon}</button>;
};

export default IconButton;
