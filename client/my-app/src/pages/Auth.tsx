import { Box } from '@chakra-ui/react'
import { FC, useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Auth: FC = () => {
    const [login, setLogin] = useState<Boolean>(false)
    const ToggleForm = (): any => {
        setLogin(!login)
    }
    return (
        <Box display={"flex"} flexDirection={"column"} w="100%" h="100vh"  >
            {login ? <Login ToggleForm={ToggleForm} /> : <Signup ToggleForm={ToggleForm} />}
        </Box>
    )
}

export default Auth