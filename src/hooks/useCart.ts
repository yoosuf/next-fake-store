// hooks/useCart.ts
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { CartItem } from '@/types';

const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    const SHIPPING_COST = 10.0;
    const TAX_RATE = 0.15; // 15% tax

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        const event = new CustomEvent('cartUpdated', { detail: cart }); // magic happens here :D
        window.dispatchEvent(event);
    }, [cart]);

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingItemIndex !== -1) {
                return prevCart.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId: number, quantity: number = 1) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === productId);
            if (existingItemIndex !== -1) {
                const existingItem = prevCart[existingItemIndex];
                if (existingItem.quantity > quantity) {
                    return prevCart.map((item, index) =>
                        index === existingItemIndex ? { ...item, quantity: item.quantity - quantity } : item
                    );
                } else {
                    return prevCart.filter((_, index) => index !== existingItemIndex);
                }
            }
            return prevCart;
        });
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return {
        cart,
        addToCart,
        removeFromCart,
        cartTotal: subtotal,
        subtotal,
        shipping,
        tax,
        total,
        totalQuantity,
    };
};

export default useCart;
