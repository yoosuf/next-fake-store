import { GetServerSideProps } from 'next';
import React from 'react';
import { Category, Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';
import BaseLayout from '@/components/Layout/BaseLayout';

interface CategoryDetailProps {
    category: Category & { products: Product[] };
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category }) => {
    return (
        <BaseLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.products.map((product) => (
                        <ProductCard product={product} key={product.id} layout="horizontal" />
                    ))}
                </div>
            </div>
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    try {
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`);
        const category: Category = await categoryResponse.json();

        const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}/products`);
        const products: Product[] = await productsResponse.json();

        return { props: { category: { ...category, products } } };
    } catch (error) {
        console.error('Error fetching category details or products', error);
        return { props: { category: null } };
    }
};

export default CategoryDetail;
