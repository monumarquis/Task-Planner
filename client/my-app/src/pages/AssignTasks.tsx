import {
    Button, Flex, Input,
    FormControl,
    FormLabel,
    Container,
    Text,
    Select,
    Textarea,
} from '@chakra-ui/react'

import { useFormik } from 'formik';
import { FormikHelpers, FormikProps } from 'formik/dist/types';
import { FC, useCallback } from 'react'
import { TaskvalidationSchema } from '../controller/FormValidation';
import { taskAssign } from '../types/user';

const initState: taskAssign = {
    title: "",
    sprint: "",
    desc: "",
    assignTo: ""
};

const AssignTasks: FC = () => {

    const handleTaskPost = useCallback((values: taskAssign, { resetForm }: FormikHelpers<taskAssign>): void => {
        console.log(values);
        formik.setValues(initState);
        resetForm();
    }, [])

    const formik: FormikProps<taskAssign> = useFormik<taskAssign>({
        initialValues: initState,
        validationSchema: TaskvalidationSchema,
        onSubmit: handleTaskPost
    });
    return (
        <Flex flexDirection="column" border={"1px solid black"} w="80%" ml="auto"  >
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
                            <Flex flexDirection="column" w="49%" >
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Sprint
                                </FormLabel>
                                <Select name="sprint" variant="outline" placeholder='Select Sprint' value={formik.values?.sprint.toString()} onBlur={formik.handleBlur} onChange={formik.handleChange} >
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                </Select>
                                {formik.touched.sprint && formik.errors.sprint && <Text color="red.400" fontSize={12} >sprint is required.</Text>}
                            </Flex>
                            <Flex flexDirection="column" w="49%">
                                <FormLabel fontWeight="700" mb="1" mt="5">
                                    Assignee
                                </FormLabel>
                                <Select name="assignTo" variant="outline" placeholder='Select Assignee' value={formik.values?.assignTo.toString()}  onBlur={formik.handleBlur} onChange={formik.handleChange} >
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                </Select>
                                {formik.touched.assignTo && formik.errors.assignTo && <Text color="red.400" fontSize={12} >assignee is required.</Text>}
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