import { Timestamp, FieldValue} from "firebase/firestore";

// esta user type
export interface User {
    uid: string;
    displayName: string;
    email: string;
    address?: string;
    createdAt: Timestamp | FieldValue;
}

// esta product type
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
    quantity: number;
    rating: {
        rate: number;
        count: number;
    },
}

// esta order type
export interface Order {
    id: string;
    userId: string;
    totalPrice: number;
    createdAt: Timestamp | FieldValue;
    items: { 
        id: string;
        title: string;
        quantity: number;
        price: number
    }[];
}

// esta cart item type
export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

// esta category type
export type Category = string;