import { Product } from "../../types/types";
import './ProductCard.css';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard: React.FC<{product: Product, userId?: string}> = ({product, userId}) => {
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <h6>{product.category}</h6>
            <p>${product.price.toFixed(2)}</p>
            <Rating value={product.rating.rate} readOnly={true} style={{maxWidth: 125}}  />
            <img className="product-image" src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <button onClick={() => dispatch(addToCart({ product, userId }))}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;