import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("jobtracker_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email) => {
        const newUser = { email };
        setUser(newUser);
        localStorage.setItem("jobtracker_user", JSON.stringify(newUser));
        return Promise.resolve(newUser);
    };

    const register = (name, email) => {
        const newUser = { name, email};
        setUser(newUser);
        localStorage.setItem("jobtracker_user", JSON.stringify(newUser));
        return Promise.resolve(newUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("jobtracker_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
export const useAuth = () => useContext(AuthContext);