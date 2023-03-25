import {
    Button, Flex, Input,
    FormControl,
    FormLabel,
    Container,
    Text,
    Select,
    Textarea,
    useToast,
    Divider
} from '@chakra-ui/react'
import axios from 'axios';

import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useCallback, useEffect, useState } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai';
import { TaskvalidationSchema } from '../controller/FormValidation';
import { getAllUserProfile } from '../redux/allUser/allUsers.actions';
import { getAllSprint } from '../redux/sprint/sprint.actions';
import { sprintMapProps, taskAssign, useAppDispatch, useAppSelector, userMapProps } from '../types/user';

const initState: taskAssign = {
    title: "",
    sprint: "",
    desc: "",
    assignTo: "",
    status: "",
};

const AssignTasks: FC = () => {
    const { data: allsprints } = useAppSelector((state) => state.allSprints)
    const { data: allusers } = useAppSelector((state) => state.allUser)
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast()
    const dispatch = useAppDispatch()
    // console.log(allsprints);
    // console.log(allusers);
    const handleTaskPost = useCallback(async (values: taskAssign, { resetForm }: FormikHelpers<taskAssign>): Promise<any> => {
        console.log(values);
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            console.log(values)
            let { data } = await axios.post("https://real-lime-cockroach-tutu.cyclic.app/task", { ...values }, config)
            toast({
                title: data.message,
                description: "You've created Task",
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
                title: 'Name Already Taken',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        dispatch(getAllUserProfile())
        dispatch(getAllSprint())
    }, [])


    const formik: FormikProps<taskAssign> = useFormik<taskAssign>({
        initialValues: initState,
        validationSchema: TaskvalidationSchema,
        onSubmit: handleTaskPost
    });
    return (
        <Flex flexDirection="column" w="80%" ml="auto"  >
            <Text as='em' textAlign={"center"} fontSize="25" mt="5" mb="2" >Assign Task</Text>
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
                        <Flex flexDirection="row" justifyContent={"space-between"} w="100%"  >
                            <Flex flexDirection="column" w="33%" >
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Sprint
                                </FormLabel>
                                <Select name="sprint" variant="outline" placeholder='Select Sprint' value={formik.values?.sprint.toString()} onBlur={formik.handleBlur} onChange={formik.handleChange} >

                                    {
                                        allsprints && allsprints.length > 0 && allsprints.map((el: sprintMapProps) => <option value={el._id}>{el.title}</option>)
                                    }
                                </Select>
                                {formik.touched.sprint && formik.errors.sprint && <Text color="red.400" fontSize={12} >sprint is required.</Text>}
                            </Flex>
                            <Flex flexDirection="column" w="33%">
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Assignee
                                </FormLabel>
                                <Select name="assignTo" variant="outline" placeholder='Select Assignee' value={formik.values?.assignTo.toString()} onBlur={formik.handleBlur} onChange={formik.handleChange} >
                                    {
                                        allusers && allusers.length > 0 && allusers.map((el: userMapProps) => <option value={el.email}>{el.email}</option>)
                                    }
                                </Select>
                                {formik.touched.assignTo && formik.errors.assignTo && <Text color="red.400" fontSize={12} >assignee is required.</Text>}
                            </Flex>
                            <Flex flexDirection="column" w="33%">
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Status
                                </FormLabel>
                                <Select name="status" variant="outline" placeholder='Select Status' value={formik.values?.status.toString()} onBlur={formik.handleBlur} onChange={formik.handleChange} >
                                    <option value='Pending'>Pending</option>
                                    <option value='Progress'>Progress</option>
                                    <option value='Completed'>Completed</option>
                                </Select>
                                {formik.touched.status && formik.errors.status && <Text color="red.400" fontSize={12} >status is required.</Text>}
                            </Flex>
                        </Flex>
                        <Flex flexDirection="column" w="100%">
                            <FormLabel fontWeight="700" mb="1" mt="5">
                                Task Title
                            </FormLabel>
                            <Input
                                name='title'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values?.title.toString()}
                                placeholder="Enter Task Title"
                                variant="outline"
                                isInvalid={formik.touched.title && Boolean(formik.errors.title)}
                                onBlur={formik.handleBlur}
                                pl="3"

                            />
                            {formik.touched.title && formik.errors.title && <Text color="red.400" fontSize={12} >title is required.</Text>}
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
                        <Button colorScheme="blue" mt="10" mb="2" w="20%" ml="auto" type="submit">
                            Assign
                        </Button>

                    </FormControl>
                </Container>
            </form>
        </Flex>
    )
}

export default AssignTasks