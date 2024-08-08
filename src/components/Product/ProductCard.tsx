import React from 'react';
import { Product } from '@/types';
import useCart from '@/hooks/useCart';
import Stepper from './Stepper';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: Product & { quantity?: number };
    layout: 'horizontal' | 'vertical';
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    layout,
    onIncrement,
    onDecrement,
    onRemove,
}) => {
    const { addToCart } = useCart();
    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

    const ProductImage: React.FC<{ imageUrl: string; alt: string; className: string }> = ({
        imageUrl,
        alt,
        className,
    }) => (
        <Image
        src={imageUrl}
        alt={alt}
        width={100}
        height={100}
        className={className} />
    );

    const HorizontalLayout = () => (
        <Link href={`/products/${product.id}`} passHref legacyBehavior>

        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-xs mx-4 my-4 font-sans flex flex-col">
            <div className="relative w-full pt-[75%]">
                <ProductImage
                    imageUrl={imageUrl}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
        </Link>
    );

    const VerticalLayout = () => (
        <div className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <ProductImage
                    imageUrl={imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    {onIncrement && onDecrement && (
                        <Stepper
                            quantity={product.quantity!}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center">
                {onRemove && (
                    <button
                        className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                        onClick={onRemove}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );

    return layout === 'horizontal' ? <HorizontalLayout /> : <VerticalLayout />;
};

export default ProductCard;
