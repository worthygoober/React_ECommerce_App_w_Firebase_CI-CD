import { Product, Category } from "../../types/types";
import ProductCard from "../../components/ProductCard/ProductCard";
import './Home.css';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setProducts, setSelectedCategory } from '../../redux/productSlice';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../context/AuthContext";

const Home: React.FC = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const selectedCategory = useSelector((state: RootState) => state.product.selectedCategory);
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth();
    
    const navigate = useNavigate();

    // fetches products to display from api
    const {data: productsData} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // fetches categories to display from api
    const {data: categories} = useQuery({
        queryKey: ['category'],
        queryFn: fetchCategories,
    });

    // check auth state to see if user is logged in, if not, user is redirected to login page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            setIsLoading(true);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
          } else {
            setIsLoading(false);
          }
        });
        return () => unsubscribe();
      }, [navigate]);

    // if there are products pulled from api, then dispatch from productSlice is used to display products
    useEffect(() => {
        if (productsData) {
            dispatch(setProducts(productsData.data));
        }
    }, [dispatch, productsData])

    // function that filters products based on the selected category in category drop down menu
    const getFilteredProducts = () => {
        if (!products) return [];
        if (selectedCategory) {
            return products?.filter(
                (product: Product) => product.category === selectedCategory
            );
        }
        return products;
    };

    const filteredProducts = getFilteredProducts();

    // loading message that appears if user is not logged in before redirection to login page
    if (isLoading) { 
        return (
            <div className="loading-container">
                <h3>Redirecting to login page...</h3>
            </div>)
    };

    return(
        <>
        <div>
            {/* drop down menu and reset button for categories */}
            <select onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                value={selectedCategory || ''}
                >
                <option value="">All Categories</option>
                {categories?.data.map((category: Category) => (
                    <option value={category} key={category}>
                        {category}
                    </option>
                ))}
            </select>

            <button onClick={() => {dispatch(setSelectedCategory(''))}}>
                Reset category
            </button>

            {/* ensure products match Product type and are displayed based on product card */}
            <div className="container">
                {filteredProducts.map((product: Product) => (
                <ProductCard product={product} key={product.id} userId={user?.uid}/>
                ))}
            </div>
        </div>
        </>
    )
};

export default Home;