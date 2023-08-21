import { getBillboards, getFilterdProducts } from '@/actions';
import ProductList from '@/components/product-list';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import Modal from '@/components/ui/modal';

const HomePage = async () => {
    const billboard = await getBillboards('64dc87f318c1fa9cf40fc652');
    const allProducts = await getFilterdProducts({ isFeatured: true });
    return (
        <div className="px-4 sm:px-6 lg:px-8 ">
            <Container>
                <Billboard data={billboard} />
                <ProductList data={allProducts} title="Featured Products" />
            </Container>
        </div>
    );
};

export default HomePage;
