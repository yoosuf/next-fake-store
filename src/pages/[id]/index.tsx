// pages/catalog.tsx
import { GetServerSideProps } from 'next';
import React from 'react';
import { Category, Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';
import BaseLayout from '@/components/Layout/BaseLayout';

interface CatalogProps {
    categories: Category[];
}

const Catalog: React.FC<CatalogProps> = ({ categories }) => {
    return (
        <BaseLayout>
            {categories.map((category) => (
                <div key={category.id} className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category?.products?.map((item) => (
                            <ProductCard product={item} key={item.id} layout="horizontal" />
                        ))}
                    </div>
                </div>
            ))}
        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const categories: Category[] = await categoriesResponse.json();

        const categoriesWithProducts = await Promise.all(
            categories.map(async (category) => {
                const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category.id}/products`);
                const products: Product[] = await productsResponse.json();
                return { ...category, products };
            })
        );

        return { props: { categories: categoriesWithProducts } };
    } catch (error) {
        console.error('Error fetching categories or products', error);
        return { props: { categories: [] } };
    }
};

export default Catalog;