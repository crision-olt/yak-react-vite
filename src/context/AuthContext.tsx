import { createContext, ReactElement, useContext } from "react";
import { signInWithEmailAndPassword }              from "firebase/auth";
import { auth }                                    from "@/modulesTypes/firebase";
import { useLocalStorage }                         from "@/hooks/useLocalStorage";

export type AuthContextType = { logout: () => void, isAuthenticated: boolean, login: ({ email }: LoginType) => boolean | Promise<boolean>, user: any, token: string }

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: "",
    login: ({ email }: LoginType) => false,
    logout: () => undefined,
    token: "",
});

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
};
export type AuthProviderProps = {
    children: ReactElement,
}
export type LoginType = {
    email: string,
    password: string,
    remember: boolean,
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>("isAuthenticated", false);
    const [currentUser, setCurrentUser] = useLocalStorage<string | null>("currentUser", "");
    const [token, setToken] = useLocalStorage<string>("token", "");
    const login = async (data: LoginType): Promise<boolean> => {
        try {
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (response.user) {
                response.user.getIdToken().then((res: string) => setToken(res));
                setCurrentUser(response.user.email);
                setIsAuthenticated(true);
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser("");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user: currentUser, login, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
};