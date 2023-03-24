import { FC, useState } from 'react'
import { Flex, Input, Td, Tr, useToast } from '@chakra-ui/react'
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import axios from 'axios'
import { singlrTableUserProps, useAppDispatch } from '../types/user'
import { getAllUserProfile } from '../redux/allUser/allUsers.actions'
const SingleTableUser: FC<singlrTableUserProps> = ({ name, id, role, email }) => {
    const dispatch = useAppDispatch()
    const toast = useToast()
    const [showInput, setShowInput] = useState<boolean>(false)
    const [Role, setRole] = useState<string>(role)

    const handleDelete = async (): Promise<any> => {
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            const { data } = await axios.delete(`http://localhost:8001/user/${id}`, config);
            console.log(data)
            toast({
                title: data.message,
                description: "We've deleted user account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllUserProfile())
        } catch {

        }
    }

    const handleEditInput = (): void => setShowInput((prev) => !prev)

    const handleEdit = async (): Promise<any> => {
        const config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        try {
            const { data } = await axios.patch(`http://localhost:8001/user`, { userId: id, role: Role }, config);
            console.log(data)
            toast({
                title: data.message,
                description: "We've edit user account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(getAllUserProfile())
        } catch {

        }
    }

    return (
        (
            <>
                <Tr>
                    <Td>{name}</Td>
                    <Td>{email}</Td>
                    <Td>{showInput ? <Flex flexDir="row" alignItems={"center"} my="-5" >
                        <Input h="20px" w="100px" type="text" value={Role} onChange={({ target: { value } }) => setRole(value)} />
                        <TiTick color="gray" fontSize={"35"} cursor={"pointer"} onClick={handleEdit} />
                    </Flex> : role}</Td>
                    <Td>
                        <Flex flexDir="row" p="0" w="55px" justifyContent={"space-between"}>
                            <RiDeleteBin2Fill color="#a8323c" cursor={"pointer"} onClick={handleDelete} />
                            <FaRegEdit color="#383435" cursor={"pointer"} onClick={handleEditInput} />
                        </Flex>
                    </Td>

                </Tr>
            </>
        )
    )
}

export default SingleTableUser