import { FC, ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    Flex,
    Input,
} from '@chakra-ui/react'
import SingleTableUser from '../components/SingleTableUser'
import { mapUserProps, useAppDispatch, useAppSelector } from '../types/user'
import { getAllUserProfile, getAllUserProfileBySearch } from '../redux/allUser/allUsers.actions'

const AllUser: FC = () => {
    const dispatch = useAppDispatch()
    const { data, loading } = useAppSelector((state) => state.allUser)
    const [name, setUser] = useState<string>("")
    console.log(data);

    useEffect(() => {
        dispatch(getAllUserProfile())
    }, [])

    useEffect(() => {
        dispatch(getAllUserProfileBySearch(name))
    }, [name])
    const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }
    return (
        <Flex flexDirection="column"  w="80%" ml="auto" px="10" >
            <Input type="text" w="30%" ml="10" placeholder='Search by name' value={name} onChange={handlesearch} my="10" />
            <TableContainer  >
                <Table variant='striped' colorScheme='grey'>
                    <TableCaption>All User details</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.length > 0 && data.map((el:mapUserProps): any => <SingleTableUser key={el._id} id={el._id} name={el.name}
                            role={el.role} email={el.email}
                        />)}

                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default AllUser