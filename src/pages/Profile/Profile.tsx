import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { Order } from "../../types/types";
import { Flip, ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] =  useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    console.log('User state in useEffect:', user);
    const loadUserData = async () => {
      if (!user?.uid) {
        console.log('User UID is missing, exiting function');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Fetched user data from Firestore:", userData);
          setDisplayName(user?.displayName || userData.displayName || '');
          setAddress( userData.address || '');
        } else {
          console.log('User document does not exist.');
        }
      } catch (err: any) {
        toast.error(`Failed to load profile data: ${err.message}`, {
          autoClose: 5000,
        });
        console.error('Error fetching user data:', err);
      }
    };
    loadUserData();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const orderQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(orderQuery);

        const fetchedOrders: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Order, "id">;
          return { id: doc.id, ...data };
        });

        setOrders(fetchedOrders);
      } catch (error: any) {
        toast.error(`Failed to fetch order data: ${error.message}`, {
          autoClose: 5000,
        });
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not found');
      return;
    }

    try {
      await updateProfile(user, {
        displayName: displayName,
      });

      await updateDoc(doc(db, 'users', user.uid), {
        address: address,
        displayName: displayName,
        updatedAt: new Date()
      });

      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(`Profile update failed!: ${error.message}`, {
        autoClose: 5000,
      });
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.uid) return;

    try{
      if (!user) {
        toast.error('User not found');
        return;
      }

      await deleteDoc(doc(db, 'users', user.uid));

      await deleteUser(user);

      toast.success('Account deleted successfully');
      navigate('/register');
    } catch (error: any) {
      toast.error(`Profile deletion failed!: ${error.message}`, {
        autoClose: 5000,
      });
      console.error('Error deleting profile:', error);
    }
  };
  
  void auth;

  return (
    <div className="form">
      <h1>Profile</h1>

      <h3>Welcome back, {user?.displayName}</h3>

      <form onSubmit={handleUpdateProfile}>
        <fieldset className="fieldset">
        <legend className="legend">Profile</legend>

          <input
          className="input"
          type="text"
          value={displayName}
          placeholder="Name"
          onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
          className="input"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          />

          <input
          className="input"
          type="email"
          value={email}
          placeholder="Email"
          disabled={true}
          />

        </fieldset>
        <button type="submit" className="button">
          Update Profile
        </button>
      </form>
      <button className="deleteButton" onClick={handleDeleteAccount}>
            Delete Account
      </button>

      <div>
        <h2>Order History</h2>
        {orders.length === 0 ? 
        <p>No orders found.</p> : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                  Order ID: {order.id} (Total: ${order.totalPrice.toFixed(2)})
                </button>
                {expandedOrder === order.id && (
                  <div>
                    <p>Placed on: {order.createdAt instanceof Timestamp ? order.createdAt.toDate().toLocaleString() : 'Unknown Date'}</p>
                    <ul>
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.title} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
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
    </div>
  );
};

export default Profile;