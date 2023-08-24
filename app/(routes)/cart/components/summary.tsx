import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SummaryProps {
    price: number;
}

const Summary = ({ price }: SummaryProps) => {
    const router = useRouter();

    return (
        <Button
            onClick={() => {}}
            className={cn('px-20', price ? 'bg-neutral-800' : 'bg-neutral-500')}
        >
            Buy
        </Button>
    );
};

export default Summary;
