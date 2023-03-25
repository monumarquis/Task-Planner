import {
    Flex, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import SingleReport from '../components/SingleReport'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { sprintMapProps, useAppDispatch, useAppSelector } from '../types/user'

const Report: FC = () => {
    const { data: AllSprint, loading } = useAppSelector((state) => state.allSprints)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllSprint())
    }, [])
    if (loading) {
        return <Flex flexDirection="column" w="80%" ml="auto" px="10" mt="20" justifyContent={"center"} alignItems="center" >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    }
    return (
        <Flex flexDirection="column" w="80%" ml="auto"  >
            <TableContainer>
                <Table variant='striped' colorScheme='teal' w="95%" m="auto" >
                    <TableCaption>All Sprint Reports comes from backend </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Sprint</Th>
                            <Th isNumeric>Task</Th>
                            <Th isNumeric>Completed Task</Th>
                            <Th>Work Duration</Th>
                            <Th>Progress</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            AllSprint && AllSprint.length > 0 && AllSprint.map((el: sprintMapProps) => <SingleReport data={el} key={el._id} />)
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default Report