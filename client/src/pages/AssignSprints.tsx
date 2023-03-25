import {
    Button, Flex, Input,
    FormControl,
    FormLabel,
    Container,
    Text,
    Textarea,
    useToast,
    Divider
} from '@chakra-ui/react'
import axios from 'axios';

import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useCallback, useState } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai';
import { sprintvalidationSchema } from '../controller/FormValidation';
import { sprintAssign, useAppDispatch, useAppSelector } from '../types/user';

const initState: sprintAssign = {
    endDate: "",
    startDate: "",
    desc: "",
    title: "",

}

const AssignSprints: FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast()
    const handleSprintPost = async (values: sprintAssign, { resetForm }: FormikHelpers<sprintAssign>): Promise<any> => {
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            console.log(values)
            let { data } = await axios.post("https://real-lime-cockroach-tutu.cyclic.app/sprint", { ...values }, config)
            toast({
                title: data.message,
                description: "You've Added New Sprint",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setLoading(false)
            // console.log(formik.values)
            formik.setValues(initState);
            resetForm();
        } catch {
            toast({
                title: 'title Already Taken',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setLoading(false);
        }
    }
    const formik: FormikProps<sprintAssign> = useFormik<sprintAssign>({
        initialValues: initState,
        validationSchema: sprintvalidationSchema,
        onSubmit: handleSprintPost
    });


    return (
        <Flex flexDirection="column" w="80%" ml="auto" >
            <Text as='em' textAlign={"center"} fontSize="25" mt="5" mb="2" >Add Sprint</Text>
            <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" mb="5" />
            <Flex flexDirection="row" alignItems={"center"} p="2" bg="#c4e6f5" border="1px solid #c4e6f5 " w="90%" m="auto" >
                <AiFillExclamationCircle color='#30a8db' fontSize={"25"} />
                <Text fontSize="18" ml="5" >All Input Feilds are Mandotary</Text>
            </Flex>
            <form onSubmit={formik.handleSubmit} style={{ width: "90%", margin: "auto", marginTop: "20px" }} >
                <Container
                    maxW="100%"
                    mb="10"
                    borderRadius="20"
                    background={"#fff"}
                    centerContent
                >
                    <FormControl py="10" >
                        <Flex flexDirection="column" w="100%" >
                            <FormLabel fontWeight="700" mb="1" mt="5">
                                Sprint Title
                            </FormLabel>
                            <Input
                                name='title'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values?.title.toString()}
                                placeholder="Enter Sprint Title"
                                variant="outline"
                                isInvalid={formik.touched.title && Boolean(formik.errors.title)}
                                onBlur={formik.handleBlur}
                                pl="3"

                            />
                            {formik.touched.title && formik.errors.title && <Text color="red.400" fontSize={12} >title is required.</Text>}
                        </Flex>
                        <Flex flexDirection="row" w="100%" justifyContent={"space-between"} >
                            <Flex flexDirection="column" w="49%" >
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Start date
                                </FormLabel>
                                <Input
                                    name='startDate'
                                    type='datetime-local'
                                    onChange={formik.handleChange}
                                    value={formik.values?.startDate.toString()}
                                    variant="outline"
                                    isInvalid={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                    onBlur={formik.handleBlur}
                                    pl="3"

                                />
                                {formik.touched.startDate && formik.errors.startDate && <Text color="red.400" fontSize={12} >start date is required.</Text>}
                            </Flex>
                            <Flex flexDirection="column" w="49%">
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    End date
                                </FormLabel>
                                <Input
                                    name='endDate'
                                    type='datetime-local'
                                    onChange={formik.handleChange}
                                    value={formik.values?.endDate.toString()}
                                    variant="outline"
                                    isInvalid={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    onBlur={formik.handleBlur}
                                    pl="3"

                                />
                                {formik.touched.endDate && formik.errors.endDate && <Text color="red.400" fontSize={12} >end date is required.</Text>}
                            </Flex>
                        </Flex>
                        <Flex flexDirection="column" w="100%">
                            <FormLabel fontWeight="700" mb="1" mt="5">
                                Description
                            </FormLabel>
                            <Textarea
                                pr="4.5rem"
                                name="desc"
                                value={formik.values?.desc.toString()}
                                onChange={formik.handleChange}
                                placeholder="Enter description"
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.desc && Boolean(formik.errors.desc)}
                                variant="outline"
                                pl="3"
                                size='md'
                                h="200px"
                            />
                            {formik.touched.desc && formik.errors.desc && <Text color="red.400" fontSize={12} >description is required.</Text>}
                        </Flex>
                        <Button colorScheme="blue" mt="10" mb="2" w="25%" ml="auto" type="submit">
                            Create Sprint
                        </Button>
                    </FormControl>
                </Container>
            </form>
        </Flex>
    )
}

export default AssignSprints