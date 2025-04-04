import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    userId?: string;
}

const initialState: CartState ={
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; userId?: string }>) => {
            if (!state.userId) {
                state.userId = action.payload.userId;
            }
            const itemInCart = state.items.find((item) => item.id === action.payload.product.id);
            if (itemInCart) {
                itemInCart.quantity += 1;
            } else {
                state.items.push({ ...action.payload.product, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<{ userId: string; id: string }>) => {
            if (state.userId === action.payload.userId) {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ userId: string; id: string; quantity: number }>) => {
            if (state.userId === action.payload.userId) {
                const item = state.items.find((item) => item.id === action.payload.id)
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            }
        },
        clearCart: (state, action) => {
            const { userId } = action.payload;
            if (state.userId === userId) {
                state.items = []
            };
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;