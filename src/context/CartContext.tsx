"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext<any>(null);

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    sku?: string;
    quantity: number;
    }

    interface CartState {
    items: CartItem[];
    }

    type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

    const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
            return {
            ...state,
            items: state.items.map(item =>
                item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
            };
        }
        return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }]
        };

        case 'REMOVE_ITEM':
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
        };

        case 'UPDATE_QUANTITY':
        return {
            ...state,
            items: state.items.map(item =>
            item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            )
        };

        case 'CLEAR_CART':
        return {
            ...state,
            items: []
        };

        case 'LOAD_CART':
        return {
            ...state,
            items: action.payload
        };

        default:
        return state;
    }
    };

    const initialState: CartState = {
    items: []
    };

    export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        const savedCart = localStorage.getItem('moreci-cart');
        if (savedCart) {
        try {
            const parsedCart = JSON.parse(savedCart);
            dispatch({ type: 'LOAD_CART', payload: parsedCart });
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('moreci-cart', JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (product: Omit<CartItem, 'quantity'>) => {
        dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } });
    };

    const removeItem = (productId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
        removeItem(productId);
        return;
        }
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getCartTotal = (): number => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemsCount = (): number => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
    };

    export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};