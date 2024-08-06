import { GetServerSideProps } from 'next';
import React from 'react';
import { Category, Product } from '@/types';
import BaseLayout from '@/components/Layout/BaseLayout';
import CategoryItem from '@/components/Category/CategoryItem';
import Link from 'next/link';

interface CategoriesProps {
    categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    return (
        <BaseLayout>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">All categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <Link href="/${category.id}" key={category.id}>
                        <CategoryItem category={category} key={category.id} />
                    </Link>
                ))}
            </div>

        </BaseLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const categories: Category[] = await categoriesResponse.json();

        return { props: { categories: categories } };

    } catch (error) {
        console.error('Error fetching categories or products', error);
        return { props: { categories: [] } };
    }
};

export default Categories;