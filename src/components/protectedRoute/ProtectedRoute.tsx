import { useAuth } from "@/context/AuthContext";
import { FC }      from "react";
import Login       from "@/pages/Login";

type ProtectedRouteProps = {
    Component: React.Component | FC<{}>,
    props?: any
}
export const ProtectedRoute = ({ Component, props }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Login/>;
    }
    // @ts-ignore
    return <Component {...props}/>;
};