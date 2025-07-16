import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (prod) => {
        setCart((prev) => {
            const pres = prev.find((p) => p.id === prod.id);
            if(pres) {
                return prev.map(
                    (p) => p.id === prod.id ? {...p, quantity: p.quantity + 1} : p
                );
            } else {
                return [...prev, {...prod, quantity: 1}];
            }
        });
    };

    const removeFromCart = (pid) => {
        setCart((prev) => prev.filter((p) => p.id !== pid));
    };

    const clearCart = () => {setCart([]);};

    const getTotalItems = () => { return cart.reduce((total, item) => total+=item.quantity, 0) }

    const getTotalPrice = () => { return cart.reduce((total, item) => total+=(item.quantity*item.price), 0) }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);