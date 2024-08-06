import React, { useEffect, useState } from 'react';
import useCart from '@/hooks/useCart';
import BaseLayout from '@/components/Layout/BaseLayout';
import Link from 'next/link';
import ProductCard from '@/components/Product/ProductCard';


const Cart: React.FC = () => {
    const { cart, addToCart, removeFromCart, subtotal, shipping, tax, total } = useCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <BaseLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h1>
            <div className="flex">
                <div className="w-3/4 pr-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                        cart.map((item, index) => (
                            <ProductCard
                                key={`${item.id}-${index}`}
                                product={item}
                                layout="vertical"
                                onIncrement={() => addToCart(item, 1)}
                                onDecrement={() => removeFromCart(item.id, 1)}
                                onRemove={() => removeFromCart(item.id, item.quantity)}
                            />
                        ))
                    )}
                    <div className="mt-4">
                        <Link href="/" legacyBehavior>
                            <a className="text-blue-500 hover:underline">&larr; Continue Shopping</a>
                        </Link>
                    </div>
                </div>
                <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h2>
                    <p className="text-gray-700">Subtotal: ${subtotal.toFixed(2)}</p>
                    <p className="text-gray-700">Shipping: ${shipping.toFixed(2)}</p>
                    <p className="text-gray-700">Tax: ${tax.toFixed(2)}</p>
                    <p className="text-gray-700 font-bold">Total: ${total.toFixed(2)}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
                        Checkout
                    </button>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Cart;