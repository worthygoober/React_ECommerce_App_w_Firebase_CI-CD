import axios, {AxiosResponse} from "axios";
import { Product, Category } from "../types/types";

const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

// fetches products from API while ensuring they match Product type
export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => 
    apiClient.get<Product[]>('/products')

// fetches categories from API while ensuring they match Category type
export const fetchCategories = (): Promise<AxiosResponse<Category[]>> => 
    apiClient.get<Category[]>('/products/categories')