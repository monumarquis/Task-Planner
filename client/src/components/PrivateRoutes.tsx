import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { privateRouteProps, useAppSelector } from "../types/user";
import { FC } from 'react';

const Privateroutes: FC<privateRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state.auth)
    if (!isAuth) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}

export default Privateroutes