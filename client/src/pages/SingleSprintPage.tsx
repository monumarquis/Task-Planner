import { Flex, Spinner, Text } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SingleSprint from '../components/SingleSprint'
import SingleTask from '../components/SingleTask'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { getAllSprintTask } from '../redux/sprintTask/sprintTask.actions'
import { sprintMapProps, taskMapProps, useAppDispatch, useAppSelector } from '../types/user'

const SingleSprintPage: FC = () => {
    let { id } = useParams()
    const { data, loading } = useAppSelector((state) => state.allSprintTask)
    const { data: AllSprint } = useAppSelector((state) => state.allSprints)
    const dispatch = useAppDispatch()
    const x = AllSprint && AllSprint.length > 0 && AllSprint.filter((el: sprintMapProps) => el._id === id)
    console.log(x);
    useEffect(() => {
        dispatch(getAllSprintTask(id))
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
        <Flex flexDirection="column" w="80%" ml="auto">
            {/* <SingleSprint data={x} /> */}
            {data && data.length === 0 ? <Text>Task Not Found</Text> : <Flex flexDir={"column"} justifyContent="space-between" w="100%" >
                <Text fontWeight={"500"} fontSize="20" textAlign={"center"} my="5" >All Tasks</Text>
                {data.map((el: taskMapProps) => <SingleTask data={el} key={el._id} />)}
            </Flex>}

        </Flex>
    )
}

export default SingleSprintPage