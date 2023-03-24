import {
  Button, Flex, Heading, Input, InputGroup, InputRightElement,
  FormControl,
  FormLabel,
  Container,
  Text,
} from '@chakra-ui/react'

import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useCallback, useState } from 'react'
import { LoginvalidationSchema, SingupvalidationSchema } from '../controller/FormValidation';
import { LogIn } from '../redux/auth/auth.actions';
import { SingupProps, LoginUserState, useAppDispatch } from '../types/user';

const initState: LoginUserState = {
  email: "",
  password: "",
};
const Login: FC<SingupProps> = ({ ToggleForm }) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = (): void => setShow(!show);
  const dispatch = useAppDispatch()
  // Here I am caching my submit function 
  const handleLogin = useCallback((values: LoginUserState, { resetForm }: FormikHelpers<LoginUserState>): void => {
    console.log(values);
    dispatch(LogIn(values))
    formik.setValues(initState);
    resetForm();
    ToggleForm()
  }, [])

  const formik: FormikProps<LoginUserState> = useFormik<LoginUserState>({
    initialValues: initState,
    validationSchema: LoginvalidationSchema,
    onSubmit: handleLogin
  });


  return (
    <Flex w="100%" h="100%" flexDir={"column"} bg={"#cc8bf0"} className='right-clip' >
      <Heading color={"blackAlpha.800"} ml="60%" my="10" >Log In</Heading>
      <form onSubmit={formik.handleSubmit} style={{ width: "50%", marginLeft: "40%" }} >
        <Container
          maxW="70%"
          mb="10"
          borderRadius="20"
          background={"#fff"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          centerContent
        >
          <FormControl py="10" maxW="80%">
            <FormLabel fontWeight="700" mb="1" mt="5">
              Email
            </FormLabel>
            <Input
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values?.email.toString()}
              placeholder="Enter email"
              variant="flushed"
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              pl="3"

            />
            {formik.touched.email && formik.errors.email && <Text color="red.400" fontSize={12} >email is required.</Text>}
            <FormLabel fontWeight="700" mb="1" mt="5">
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                name="password"
                type={show ? "text" : "password"}
                value={formik.values?.password.toString()}
                onChange={formik.handleChange}
                placeholder="Enter password"
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                variant="flushed"
                pl="3"

              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && <Text color="red.400" fontSize={12} >password is required.</Text>}
            <Button colorScheme="blue" mt="10" mb="2" w="100%" textAlign={"center"} type="submit">
              Login
            </Button>
            <Text as='cite'>Create Account ?{' '}
              <span style={{ color: "hotpink", cursor: 'pointer' }} onClick={ToggleForm}>
                Signup
              </span></Text>
          </FormControl>
        </Container>
      </form>
    </Flex>
  )
}

export default Login