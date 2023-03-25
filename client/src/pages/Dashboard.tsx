import { Divider, Flex, Text, Spinner } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai'
import SingleSprint from '../components/SingleSprint'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { useAppDispatch, useAppSelector, sprintMapProps } from '../types/user'

const Dashboard: FC = () => {
    const { data, loading } = useAppSelector((state) => state.allSprints)
    console.log(data);
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
            <Text as='em' textAlign={"center"} fontSize="25" mt="5" mb="2" >Veiw Sprint</Text>
            <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" mb="5" />
            <Flex flexDirection="row" alignItems={"center"} p="2" bg="#c4e6f5" border="1px solid #c4e6f5 " w="90%" m="auto" >
                <AiFillExclamationCircle color='#30a8db' fontSize={"25"} />
                <Text fontSize="18" ml="5" >Click on Eye Icons to see all tasks of that sprint</Text>
            </Flex>
            <Flex flexDirection="column" w="95%" m="auto" mt="10" >
                {data && data.length > 0 && data.map((el: sprintMapProps) => <SingleSprint data={el} key={el._id} />)}
            </Flex>
        </Flex>
    )
}

export default Dashboard