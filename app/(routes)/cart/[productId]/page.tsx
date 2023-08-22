import Container from '@/components/ui/container';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import PayItems from '../components/pay-items';
import { getProduct } from '@/actions';

interface CartOnePageProps {
    params: {
        productId: string;
    };
}

const CartOnePage = async ({ params }: CartOnePageProps) => {
    const product = await getProduct(params.productId);

    return (
        <div className="mt-12 mb-36 ">
            <Container>
                <div className="px-16">
                    <DataTable columns={columns} data={[product]} />
                    <PayItems />
                </div>
            </Container>
        </div>
    );
};

export default CartOnePage;
