import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Flip, ToastContainer, toast } from "react-toastify";

// shopping cart icon
const SomeIconRef = FaShoppingCart as unknown as React.FC;

const NavBar = () => {
    const { user } = useAuth();

    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // logout function instead of individual logout page
    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success("Logout successful!", {
          onClose: () => navigate('/login'),
      });
      } catch (err: any) {
        toast.error(err.message, {
          autoClose: 5000,
        });
      }
    };

  return (
    <>
    <nav className="nav-container">
        <div className="link">
          <Link to='/' className="link">Home</Link>
          
          {/* NavBar varies depending on user state */}
          {user ? (
              <>
              <Link to='/profile' className="link">Profile</Link>
              <button onClick={handleLogout} className="nav-button" >
                Logout
              </button>
              </>
          ) : (
              <>
              <Link to='/login' className="link">Login</Link>
              <Link to='/register' className="link">Register</Link>
              </>
          )}
        </div>

        {/* Shopping Cart icon appears on far right side of NavBar */}
        <Link to='/cart' className="link">
          <SomeIconRef />
          {user && <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
        </Link>
        
    </nav>
    {/* styling for success/error messages */}
    <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
    </>
  );
};

export default NavBar;