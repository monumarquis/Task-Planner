import { Divider, Flex, Heading } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import SingleSprint from '../components/SingleSprint'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { useAppDispatch, useAppSelector, sprintMapProps } from '../types/user'

const Dashboard: FC = () => {
    const { data } = useAppSelector((state) => state.allSprints)
    console.log(data);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllSprint())
    }, [])
    return (
        <Flex flexDirection="column" w="80%" ml="auto"  >
            <Heading as="h2" textAlign={"left"} ml="6"  >Veiw Sprints</Heading>
            <Divider orientation='horizontal' borderColor={'#000'} borderWidth="1px" w="95%" m="auto" my="2" />
            <Flex flexDirection="column" w="95%" m="auto" mt="10" >
                {data && data.length > 0 && data.map((el: sprintMapProps) => <SingleSprint data={el} key={el._id} />)}
            </Flex>
        </Flex>
    )
}

export default Dashboard