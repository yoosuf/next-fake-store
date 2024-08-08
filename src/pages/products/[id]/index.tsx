import { GetServerSideProps } from 'next';
import React from 'react';
import { Product } from '@/types';
import BaseLayout from '@/components/Layout/BaseLayout';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    return (
        <BaseLayout>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="md:w-1/2 md:ml-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-4">${product.price}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        const product: Product = await response.json();

        return { props: { product } };
    } catch (error) {
        console.error('Error fetching product details', error);
        return { props: { product: null } };
    }
};

export default ProductDetail;
