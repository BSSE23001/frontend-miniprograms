import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [couponDiscount, setCouponDiscount] = useState(0);

    const addToCart = (prod) => {
        setCart((prev) => {
            const pres = prev.find((p) => p.id === prod.id);
            if (pres) {
                return prev.map(
                    (p) => p.id === prod.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...prod, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (pid) => {
        setCart((prev) => prev.filter((p) => p.id !== pid));
    };

    const setQuantity = (pid, quan) => {
        setCart((prev) => prev.map((p) => {
            return p.id === pid ? { ...p, quantity: quan } : p;
        }));
    }

    const clearCart = () => {
        setCart([]);
        setCouponDiscount(0);
    };

    const getTotalItems = () => { return cart.reduce((total, item) => total += item.quantity, 0) }

    const getOriginalTotalPrice = () => { return cart.reduce((total, item) => total += (item.quantity * item.price), 0) }

    const getTotalPrice = () => {
        const originalPrice = getOriginalTotalPrice();
        return originalPrice - couponDiscount;
    }

    const applyCoupon = (couponCode) => {
        if (couponCode === 'DISCOUNT10') {
            setCouponDiscount(getOriginalTotalPrice() * 0.10);
            return true;
        } else {
            setCouponDiscount(0);
            return false;
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice, getOriginalTotalPrice, setQuantity, applyCoupon }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);