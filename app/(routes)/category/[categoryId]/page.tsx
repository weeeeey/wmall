import {
    getBillboards,
    getCategory,
    getColors,
    getFilterdProducts,
    getSizes,
} from '@/actions';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import ProductCard from '@/components/ui/product-card';
import Filter from '@/app/(routes)/category/[categoryId]/components/filter';
import { SlidersHorizontal } from 'lucide-react';
import MobileFilter from './components/mobileFilter';
import NoResults from '@/components/ui/no-results';

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
    searchParams: {
        colorId: string;
        sizeId: string;
    };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
    const products = await getFilterdProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const billboard = await getBillboards();
    return (
        <div className="bg-white">
            <Container>
                <Billboard data={billboard} />
                <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="hidden lg:block lg:col-span-1 space-y-8">
                        <Filter title="Size" datas={sizes} typeId="sizeId" />
                        <Filter title="Color" datas={colors} typeId="colorId" />
                    </div>
                    <div className="col-span-3 lg:hidden">
                        <MobileFilter colors={colors} sizes={sizes} />
                    </div>

                    <div className="grid col-span-3 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                        {products.length === 0 && <NoResults />}
                        {products.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;
