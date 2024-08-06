import React from 'react';
import { Product } from '@/types';
import useCart from '@/hooks/useCart';
import Stepper from './Stepper';

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

    return layout === 'horizontal' ? (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-xs mx-4 my-4 font-sans flex flex-col">
            <div className="relative w-full pt-[75%]">
                <img
                    src={imageUrl}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    ) : (
        <div className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <img
                    src={imageUrl}
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
                <div className="mr-4 text-right">
                    <p className="text-gray-700">Quantity: {product.quantity}</p>
                    <p className="text-gray-700">
                        Total: ${(product.price * product.quantity!).toFixed(2)}
                    </p>
                </div>
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
};

export default ProductCard;