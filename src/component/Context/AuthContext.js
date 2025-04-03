import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        username: 'unauthorized'
    }
})
export const AuthContextWrapper = (props) => {
    const authContextValue = {
        isAuthenticated: localStorage.getItem("ACCESS_TOKEN") != null,
        user: {
            username: localStorage.getItem("USER") ?? "No Name"
        }
    }
    const [auth, setAuth] = useState(authContextValue);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

