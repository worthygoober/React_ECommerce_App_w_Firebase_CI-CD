import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

// esta product state
interface ProductState {
    products: Product[];
    selectedCategory: string;
}

const initialState: ProductState = {
    products: [],
    selectedCategory: '',
};

// manages product state and actions, setting products from api and setting categories from api
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