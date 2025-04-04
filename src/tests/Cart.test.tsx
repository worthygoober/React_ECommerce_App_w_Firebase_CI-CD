import { render, screen } from "@testing-library/react";
import Cart from "../pages/Cart/Cart";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
import { Product } from "../types/types";
import '@testing-library/jest-dom';
import { getAuth } from "firebase/auth";

// mock firebase auth to prevent redirect during test
jest.mock('firebase/auth', () => ({
    onAuthStateChanged: (_auth: any, callback: Function) => {
        callback({ uid: 'test-user' }); // simulate a logged-in user
        return () => {}; // mock unsubscribe
    },
    getAuth: jest.fn(() => ({
        currentUser: { uid: 'test-user' },
    })),
}));

// mock navigate to prevent actual navigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockProduct: Product = {
    id: 'prod-1',
    title: 'Test Product',
    price: 29.99,
    description: 'A sample product',
    category: 'Sample',
    image: 'https://via.placeholder.com/150',
    createdAt: {} as any,
    updatedAt: {} as any,
    quantity: 1
};

describe('Cart integration test', () => {
    it('adds product to cart and updates UI', () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
                product: productReducer,
            },
            preloadedState: {
                cart: {
                    items: [],
                    userId: 'test-user',
                },
                product: {
                    products: [],
                    selectedCategory: ''
                }
            }
        });

        // dispatch addToCart before rendering
        store.dispatch(addToCart({ product: mockProduct, userId: 'test-user' }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        // Check product details in cart
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99 x 1')).toBeInTheDocument();
    expect(screen.getByText('Total Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Total Price: $29.99')).toBeInTheDocument();
    });
});