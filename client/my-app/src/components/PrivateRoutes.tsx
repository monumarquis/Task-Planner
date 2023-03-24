import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { privateRouteProps, useAppSelector } from "../types/user";
import { FC } from 'react';

const Privateroutes: FC<privateRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state.auth)
    const toast = useToast()
    if (!isAuth) {
        toast({
            title: "You are not Authenticated",
            description: "Please log in to our app",
            status: 'error',
            duration: 2000,
            isClosable: true,
        })
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}

export default Privateroutes