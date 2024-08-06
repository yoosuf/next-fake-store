import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CartItem } from '@/types';

const Navigation: React.FC = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const calculateTotalQuantity = (cart: CartItem[]) => {
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            setTotalQuantity(total);
        };

        // Event listener for cart updates
        const handleCartUpdated = (event: CustomEvent) => {
            calculateTotalQuantity(event.detail);
        };

        // Attach event listener
        window.addEventListener('cartUpdated', handleCartUpdated as EventListener);

        // Initial calculation
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                calculateTotalQuantity(JSON.parse(storedCart));
            }
        }

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdated as EventListener);
        };
    }, []);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Link href="/" legacyBehavior>
                        <a className="text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</a>
                    </Link>
                    <Link href="/categories" legacyBehavior>
                        <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</a>
                    </Link>
                </div>
                <div className="flex space-x-4 rtl:space-x-reverse">
                    <Link href="/cart" legacyBehavior>
                        <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart {totalQuantity}</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;