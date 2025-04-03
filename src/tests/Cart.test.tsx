import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "../pages/Cart/Cart";
import cartReducer, { addToCart } from "../redux/cartSlice";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import { Timestamp } from "firebase/firestore";

// create test redux store
const setupStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
    });
};

// setup mock product to test
const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 10,
    description: 'This is a test product',
    category: 'test-category',
    image: 'test-image.jpg',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    quantity: 1,
};


describe('Cart Integration Test', () => {
    let store: ReturnType<typeof setupStore>;

    beforeEach(() => {
        store = setupStore();

        store.dispatch(addToCart({ product: mockProduct, userId: 'test-user' }));
    });

    test('adds a product to the cart and updates UI', () => {
        // render cart with mock store
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        );

        // show cart with new product
        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        expect(screen.getByText(`$${mockProduct.price} x 1`)).toBeInTheDocument();
    });
});