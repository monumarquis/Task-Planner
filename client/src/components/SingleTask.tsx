import {
    Flex, Icon, Text, Avatar, Button, useToast, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Input,
    FormControl,
    Select,

} from '@chakra-ui/react'
import { FC, useState, useRef, useEffect, ChangeEvent } from 'react'
import { FiSquare } from 'react-icons/fi'
import { AiFillCheckSquare } from 'react-icons/ai'
import { singletaskProps, useAppDispatch, useAppSelector, userMapProps } from '../types/user'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { getAllMyTask } from '../redux/myTask/myTask.actions'
import { getAllUserProfile } from '../redux/allUser/allUsers.actions'

const SingleTask: FC<singletaskProps> = ({ data }) => {
    const { data: allusers } = useAppSelector((state) => state.allUser)
    const [isShow, setShow] = useState<boolean>(false)
    const [assignTo, setAssignTo] = useState<string>("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useAppDispatch()
    const location = useLocation();
    console.log(location.pathname);
    const handleShow = (): void => setShow(!isShow)
    const toast = useToast()
    const handleStatus = async (): Promise<any> => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            let res = await axios.patch(`http://localhost:8001/task/update-status`, { taskId: data._id }, config)
            toast({
                title: 'Congratulation task is done !',
                description: "You've marked this task as done",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllMyTask())
        } catch {
            toast({
                title: 'Something went wrong',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }
    const handleAssignee = async (): Promise<any> => {
        console.log(assignTo);

        try {
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            let res = await axios.patch(`http://localhost:8001/task/update-assignee`, { taskId: data._id, assignTo }, config)
            toast({
                title: 'Changed Assignee',
                description: "You've changed assignee for this task ",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllMyTask())
        } catch {
            toast({
                title: 'Something went wrong',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const handlechange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(e.target.value)
    }
    useEffect(() => {
        dispatch(getAllUserProfile())
    }, [])

    return (
        <Flex flexDir={"column"} w="100%" _hover={{ bg: "#dbdad7" }} borderBottom="0.5px solid grey" pt="2" >
            <Flex flexDir={"row"} justifyContent="space-between" alignItems="center" mb="2" >
                <Flex flexDir={"row"} alignItems="center" ml="2" >
                    <Icon onClick={handleShow} color={isShow ? 'red.500' : "#000"} fontSize="20" as={isShow ? AiFillCheckSquare : FiSquare} />
                    <Text ml="5" fontSize={"20"} fontWeight={"500"} >{data.title}</Text>
                </Flex>
                <Flex flexDir={"row"} alignItems="center" mr="2" >
                    <Text fontSize={"12"} fontWeight={"400"} >{data.createdAt.split("T")[0]}</Text>
                    <Avatar ml="4" size='sm' name={data.assignBy} src='https://bit.ly/broken-link' />
                </Flex>
            </Flex>
            <Flex flexDir={"column"} display={isShow ? "flex" : "none"} bg="#f2f0f0" justifyContent="space-between" w="100%" py="2" px="3">
                <Flex flexDir={"row"} justifyContent="space-between" alignItems="center"  >
                    <Flex flexDir={"column"}  >
                        <Text fontSize={"14"} color={"#000"} fontWeight={"400"}  >Assign by {" "}{data.assignBy}</Text>
                        <Text fontSize={"14"} color={"#000"} fontWeight={"400"}  >Assign to {" "}{data.assignTo}</Text>
                    </Flex>
                    {location.pathname === "/tasks" ? <Flex flexDir={"row"}  >
                        {data.status !== "Completed" ? <Button colorScheme={"blue"} onClick={handleStatus} >Mark Done</Button> : <Text color={"#000"} fontWeight="400" >Status : {data.status}</Text>}
                        <Button ml="5" disabled={data.status !== "Completed"} colorScheme={"green"} onClick={onOpen} >Change Assignee</Button>
                    </Flex> : <Text color={"#000"} fontWeight="400" >Status : {data.status}</Text>}
                </Flex>
                <Text fontSize={"13"} mt="4" ml="2" color={"#6b6969"} fontWeight={"400"}  >{data.desc}</Text>
            </Flex>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Select name="assignTo" variant="outline" placeholder='Select Assignee' value={assignTo} onChange={handlechange} >

                                {
                                    allusers && allusers.length > 0 && allusers.map((el: userMapProps) => <option value={el.email}>{el.email}</option>)
                                }
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAssignee} >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default SingleTask