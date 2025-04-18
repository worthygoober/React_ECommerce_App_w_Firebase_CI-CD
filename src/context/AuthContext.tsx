import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../lib/firebase/firebase';

// esta auth state
interface AuthState {
    user: User | null,
    setUser: (user: User) => void;
}

const AuthContext = createContext<AuthState>({
    user: null,
    setUser: (_user: User) => {}
});

// function we can call later through useAuth to check for changes in auth state, ie whether user has logged in or out
export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState< User | null> (null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;