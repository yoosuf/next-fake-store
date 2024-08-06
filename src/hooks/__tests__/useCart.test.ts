// hooks/__tests__/useCart.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import useCart from '../useCart';
import { Product } from '@/types';

describe('useCart', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should initialize with an empty cart', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.cart).toEqual([]);
        expect(result.current.totalQuantity).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('should add a product to the cart', () => {
        const product: Product = { id: 1, name: 'Product 1', price: 100 };
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(product, 2);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].quantity).toBe(2);
        expect(result.current.totalQuantity).toBe(2);
        expect(result.current.subtotal).toBe(200);
    });

    it('should remove a product from the cart', () => {
        const product: Product = { id: 1, name: 'Product 1', price: 100 };
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(product, 2);
        });

        act(() => {
            result.current.removeFromCart(product.id, 1);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].quantity).toBe(1);
        expect(result.current.totalQuantity).toBe(1);
        expect(result.current.subtotal).toBe(100);

        act(() => {
            result.current.removeFromCart(product.id, 1);
        });

        expect(result.current.cart).toHaveLength(0);
        expect(result.current.totalQuantity).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('should handle adding and removing products correctly', () => {
        const product1: Product = { id: 1, name: 'Product 1', price: 100 };
        const product2: Product = { id: 2, name: 'Product 2', price: 50 };
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(product1, 2);
            result.current.addToCart(product2, 3);
        });

        expect(result.current.cart).toHaveLength(2);
        expect(result.current.totalQuantity).toBe(5);
        expect(result.current.subtotal).toBe(350);

        act(() => {
            result.current.removeFromCart(product1.id, 1);
            result.current.removeFromCart(product2.id, 3);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].id).toBe(1);
        expect(result.current.cart[0].quantity).toBe(1);
        expect(result.current.totalQuantity).toBe(1);
        expect(result.current.subtotal).toBe(100);
    });

    it('should update the localStorage and dispatch event on cart change', () => {
        const product: Product = { id: 1, name: 'Product 1', price: 100 };
        const { result } = renderHook(() => useCart());

        const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent');
        const mockCustomEvent = jest.fn();
        (window as any).CustomEvent = jest.fn().mockImplementation(mockCustomEvent);

        act(() => {
            result.current.addToCart(product, 1);
        });

        expect(localStorage.getItem('cart')).toBe(JSON.stringify(result.current.cart));
        expect(mockDispatchEvent).toHaveBeenCalled();
        expect(mockCustomEvent).toHaveBeenCalledWith('cartUpdated', { detail: result.current.cart });
    });
});