import { Box, useToast } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useAppSelector } from '../types/user'

const Auth: FC = () => {
    const [login, setLogin] = useState<boolean>(false)
    const { isAuth } = useAppSelector((state) => state.auth)
    const toast = useToast()
    const ToggleForm = (): any => {
        setLogin(!login)
    }
    if (isAuth) {
        toast({
            description: "hurray ! logged in",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
        return <Navigate to="/dashboard" />
    }
    return (
        <Box display={"flex"} flexDirection={"column"} w="100%" h="100vh"  >
            {login ? <Login ToggleForm={ToggleForm} /> : <Signup ToggleForm={ToggleForm} />}
        </Box>
    )
}

export default Auth