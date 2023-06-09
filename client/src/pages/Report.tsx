import {
    Flex, Table,
    Thead,
    Tbody,
    Divider,
    Text,
    Tr,
    Th,
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
            <Text as='em' textAlign={"center"} fontSize="25" mt="5" mb="2" >Veiw Report</Text>
            <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" mb="5" />
            <TableContainer>
                <Table variant='striped' colorScheme='teal' w="95%" m="auto" >
                    <TableCaption>All Sprint Reports comes from backend </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Sprint</Th>
                            <Th>Task</Th>
                            <Th>Completed Task</Th>
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