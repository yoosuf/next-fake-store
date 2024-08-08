import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryItemProps {
    category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
    return (
        <Link href={`/categories/${category.id}`} passHref legacyBehavior>
            <a className="block border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-xs mx-4 my-4 font-sans">
                <div className="relative w-full pt-[75%]">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                </div>
            </a>
        </Link>
    );
};

export default CategoryItem;
