import React from 'react';

interface ProductProps {
    params: {
        productId: string;
    };
}

const ProductPage = ({ params }: ProductProps) => {
    const { productId } = params;
    return <div>ProductPage</div>;
};

export default ProductPage;
