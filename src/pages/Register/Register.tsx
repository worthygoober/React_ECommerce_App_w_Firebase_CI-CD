import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";
import './Register.css'
import { Flip, ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userData: User = {
                displayName,
                email,
                address,
                createdAt: serverTimestamp(),
                uid: userCredential.user.uid
            };

            await setDoc(doc(db, 'users', userCredential.user.uid), userData);

            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            toast.success('Registration successful!');
            setTimeout(() => navigate('/profile'), 3500);
        } catch (err: any) {
            toast.error(`Registration failed!: ${err.message}`, {
                autoClose: 5000,
            });
            console.error('Registration error:', err);
        }
    };
  
    return (
    <>
        <div className="form">
            <h1>Create an Account</h1>

            <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                <legend className="legend">Register</legend>

                    <label htmlFor="name">Display Name</label>
                    <input className="input" 
                    type="text"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    />
                

                    <label htmlFor="email">Email</label>
                    <input className="input" 
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                    <label htmlFor="password">Password</label>
                    <input className="input" 
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />

                    <label htmlFor="address">Shipping Address</label>
                    <input className="input" 
                    type="text"
                    placeholder="Your shipping address (optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </fieldset>

                <button type="submit" className="button">Register</button>
                
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

export default Register;