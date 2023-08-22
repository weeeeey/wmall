import { getFilterdProducts, getProduct } from '@/actions';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import React from 'react';
import ItemInfo from '@/components/ui/item-info';
import Gallery from '@/components/ui/gallery';

interface ProductProps {
    params: {
        productId: string;
    };
}

const ProductPage = async ({ params }: ProductProps) => {
    const { productId } = params;
    const product = await getProduct(productId);

    const relatedProducts = await getFilterdProducts({
        categoryId: product.category.id,
    }).then((res) => res.filter((p) => p.id !== productId));

    return (
        <div className="bg-white">
            <Container>
                <div className="p-16 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                        <Gallery product={product} />
                        <ItemInfo product={product} />
                    </div>
                    <div>
                        <ProductList
                            title="Related Items"
                            data={relatedProducts}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;
