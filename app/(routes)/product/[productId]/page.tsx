import { getFilterdProducts, getProduct } from '@/actions';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Image from 'next/image';
import React from 'react';

interface ProductProps {
    params: {
        productId: string;
    };
}

const ProductPage = async ({ params }: ProductProps) => {
    const { productId } = params;
    const product = await getProduct(productId);
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(+product.price);
    const relatedProducts = await getFilterdProducts({
        categoryId: product.category.id,
    }).then((res) => res.filter((p) => p.id !== productId));
    console.log(relatedProducts);

    return (
        <div className="bg-white">
            <Container>
                <div className="p-16 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {/* 사진 왼쪽 */}
                        <div className="relative aspect-square md:col-span-1 ">
                            <Image
                                alt={product.name}
                                src={product.images[0].url}
                                fill
                                className="rounded-md "
                            />
                        </div>
                        {/* 정보 오른쪽 */}

                        <div className="flex flex-col  items-start space-y-4 md:col-span-1">
                            <div>
                                <div className="text-3xl font-semibold mb-4">
                                    {product.name}
                                </div>
                                <div className="font-medium ">{price}</div>
                            </div>
                            <hr />
                            <div className="flex space-x-6 justify-center items-center">
                                <div>Size:</div>
                                <div>{product.size.name}</div>
                            </div>
                            <div className="flex space-x-6 justify-center items-center">
                                <div>Color:</div>
                                <div
                                    className="rounded-full h-4 w-4"
                                    style={{
                                        backgroundColor: product.color.value,
                                    }}
                                />
                            </div>
                        </div>
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
