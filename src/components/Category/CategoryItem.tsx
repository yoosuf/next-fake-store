import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryItemProps {
    category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {

    const defaultImage = '/path/to/default-image.jpg'; 
    const imageUrl = category.image || defaultImage;

    return (
        <Link href={`/categories/${category.id}`} passHref legacyBehavior>
            <a className="block border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-xs mx-4 my-4 font-sans">
                <div className="relative w-full pt-[75%]">
                    <Image
                        src={imageUrl}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="absolute inset-0 w-full h-full object-cover rounded-md" />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                </div>
            </a>
        </Link>
    );
};

export default CategoryItem;
