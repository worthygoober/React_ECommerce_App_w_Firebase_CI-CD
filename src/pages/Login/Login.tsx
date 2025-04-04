import { useState, useEffect } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import { Flip, ToastContainer, toast } from "react-toastify";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile')
        }
    }, [user, navigate]);

    if (user) {
        return null;
    };
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            toast.success("Login successful!");
            navigate('/profile');
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 5000,
            });
        }
    };

    return (
    <>
        <div className="form">
            <h1>Welcome back</h1>
            <h2>Please Login</h2>

            <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                <legend className="legend">Login</legend>
                    
                    <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                </fieldset>

                <button type="submit" className="button">Login</button>
                <Link to='/register' className="button">New Users</Link>
            </form>
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
    </>
  );
};

export default Login;