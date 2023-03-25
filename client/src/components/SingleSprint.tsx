import {
    Avatar, Flex, Text, useDisclosure, Popover,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { FC, useRef, LegacyRef } from 'react'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { GoEye } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { singlesprintProps, useAppDispatch, useAppSelector } from '../types/user'

const SingleSprint: FC<singlesprintProps> = ({ data }) => {
    const navigate = useNavigate()
    const { role } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const toast = useToast()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleClick = (): void => {
        navigate(`/dashboard/${data._id}`)
    }

    const handleDeleteSprint = async (): Promise<any> => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            let res = await axios.delete(`https://real-lime-cockroach-tutu.cyclic.app/sprint/${data._id}`, config)
            toast({
                title: 'Sprint Deleted',
                description: "You've Deleted Sprint Successfully",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllSprint())
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
    return (
        <Flex flexDirection={"row"} justifyContent="space-between" w="95%" m="auto" borderLeft={"5px solid #1b6df2"} borderRadius="10px" mb="10" className='box' p="5" pos="relative" >
            <Flex flexDirection={"row"} justifyContent="space-between" display={role !== "admin" ? 'none' : "flex"} pos={"absolute"} top="3" right="2" onClick={onOpen} >
                < RiDeleteBin2Fill color="#a8323c" cursor={"pointer"} fontSize="25" />
            </Flex>
            <Flex flexDirection={"row"} justifyContent="space-between" pos={"absolute"} onClick={handleClick} top="3.5" right={role === "admin" ? "12" : "2"}>
                < GoEye color="#55595c" cursor={"pointer"} fontSize="25" />
            </Flex>
            <Flex flexDirection={"column"} w="48%" >
                <Text as='u' fontWeight={"500"} >Sprint Name</Text>
                <Text color={"#575757"} mb="5">{data.title}</Text>
                <Text as='u' fontWeight={"500"} >Description</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.desc}</Text>
            </Flex>
            <Flex flexDirection={"column"} w="48%" >
                <Text as='u' fontWeight={"500"} >Start Date</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.startDate.split("T")[0]}</Text>
                <Text as='u' fontWeight={"500"} >End Date</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.endDate.split("T")[0]}</Text>
                <Text as='u' fontWeight={"500"} >Sprint Creator</Text>
                <Flex flexDirection={"row"} alignItems="center" >
                    <Text color={"#575757"} textAlign={"left"} >{data.creatorName}</Text>
                    <Avatar name={data.creatorName} size="sm" ml="2" src='https://bit.ly/broken-link' />
                </Flex>
            </Flex>
            <AlertDialog
                motionPreset='slideInRight'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Sprint
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}
                                ref={cancelRef as LegacyRef<HTMLButtonElement> | undefined}
                            >
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteSprint} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    )
}

export default SingleSprint