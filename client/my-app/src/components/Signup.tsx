import {
  Button, Flex, Heading, Input, InputGroup, InputRightElement,
  FormControl,
  FormLabel,
  Container,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios';

import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useCallback, useState } from 'react'
import { SingupvalidationSchema } from '../controller/FormValidation';
import { SingupProps, SingupUserState } from '../types/user';

const initState: SingupUserState = {
  name: "",
  email: "",
  password: "",
};

const Signup: FC<SingupProps> = ({ ToggleForm }) => {

  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast()
  const handleClick = () => setShow(!show);

  // Here I am caching my submit function 
  const handleSignup = useCallback(async (values: SingupUserState, { resetForm }: FormikHelpers<SingupUserState>): Promise<any> => {
    setLoading(true)
    try {
      console.log(values)
      let { data } = await axios.post("https://real-lime-cockroach-tutu.cyclic.app/user/register", { ...values, role: "user" })
      toast({
        title: data.message,
        description: "We've created your account for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
      // console.log(formik.values)
      formik.setValues(initState);
      resetForm();
      ToggleForm()
    } catch {
      toast({
        title: 'Something went wrong',
        description: "Something went wrong",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  }, [])

  const formik: FormikProps<SingupUserState> = useFormik<SingupUserState>({
    initialValues: initState,
    validationSchema: SingupvalidationSchema,
    onSubmit: handleSignup
  });


  return (
    <Flex w="100%" h="100%" flexDir={"column"} justifyContent="flex-start" bg={"#cc8bf0"} className='left-clip' >
      <Heading color={"blackAlpha.800"} ml="60" my="10" >Sign Up</Heading>
      <form onSubmit={formik.handleSubmit} style={{ width: "50%" }}>
        <Container
          maxW="70%"
          mb="10"
          borderRadius="20"
          background={"#fff"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          centerContent

        >
          <FormControl py="10" maxW="80%">
            <FormLabel fontWeight="700" mb="1">
              Name
            </FormLabel>
            <Input
              name="name"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter name"
              variant="flushed"
              value={formik.values?.name.toString()}
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
              pl="3"

            />
            {formik.touched.name && formik.errors.name && <Text color="red.400" fontSize={12} >name is required.</Text>}
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
            <InputGroup size="md" >
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
            <Button colorScheme="blue" mt="10" mb="2" w="100%" textAlign={"center"} type="submit" isLoading={loading} >
              Register
            </Button>
            <Text as='cite'>Already have an Account{' '}
              <span style={{ color: "hotpink", cursor: 'pointer' }} onClick={ToggleForm}>
                Login
              </span></Text>
          </FormControl>
        </Container>
      </form>
    </Flex>
  )
}

export default Signup