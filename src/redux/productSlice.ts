import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface ProductState {
    products: Product[];
    selectedCategory: string;
}

const initialState: ProductState = {
    products: [],
    selectedCategory: '',
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setProducts, setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;