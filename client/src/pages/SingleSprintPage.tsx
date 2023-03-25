import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import SingleSprint from '../components/SingleSprint'
import SingleTask from '../components/SingleTask'
import { getSingleSprint } from '../redux/singleSprint/signleSprint.actions'
import { getAllSprint } from '../redux/sprint/sprint.actions'
import { getAllSprintTask } from '../redux/sprintTask/sprintTask.actions'
import { sprintMapProps, taskMapProps, useAppDispatch, useAppSelector } from '../types/user'

const SingleSprintPage: FC = () => {
    let { id } = useParams()
    const { data, loading } = useAppSelector((state) => state.allSprintTask)
    const { data: singleSprint, loading: Loading } = useAppSelector((state) => state.singleSprint)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllSprintTask(id))
        dispatch(getSingleSprint(id))
    }, [])
    if (loading || Loading) {
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
        <Flex flexDirection="column" w="80%" ml="auto" px="10">

            <Flex flexDirection={"row"} justifyContent="space-between" w="95%" m="auto" className='box2' borderLeft={"5px solid #1b6df2"} borderRadius="10px" my="10" p="5"  >
                <Flex flexDirection={"column"} w="48%" >
                    <Text as='u' fontWeight={"500"} >Sprint Name</Text>
                    <Text color={"#575757"} mb="5">{singleSprint && singleSprint.length>0 && singleSprint[0].title}</Text>
                    <Text as='u' fontWeight={"500"} >Description</Text>
                    <Text color={"#575757"} mb="5" textAlign={"left"} >{singleSprint && singleSprint.length>0 && singleSprint[0].desc}</Text>
                </Flex>
                <Flex flexDirection={"column"} w="48%" >
                    <Text as='u' fontWeight={"500"} >Start Date</Text>
                    <Text color={"#575757"} mb="5" textAlign={"left"} >{singleSprint && singleSprint.length>0 && singleSprint[0].startDate.split("T")[0]}</Text>
                    <Text as='u' fontWeight={"500"} >End Date</Text>
                    <Text color={"#575757"} mb="5" textAlign={"left"} >{singleSprint && singleSprint.length>0 && singleSprint[0].endDate.split("T")[0]}</Text>
                    <Text as='u' fontWeight={"500"} >Sprint Creator</Text>
                    <Flex flexDirection={"row"} alignItems="center" >
                        <Text color={"#575757"} textAlign={"left"} >{singleSprint && singleSprint.length>0 && singleSprint[0].creatorName}</Text>
                        <Avatar name={singleSprint && singleSprint.length>0 && singleSprint[0].creatorName} size="sm" ml="2" src='https://bit.ly/broken-link' />
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems={"center"} p="2" my="10" bg="#c4e6f5" border="1px solid #c4e6f5 " w="90%" m="auto" >
                <AiFillExclamationCircle color='#30a8db' fontSize={"25"} />
                <Text fontSize="18" ml="5" >Click on square to see details of tasks</Text>
            </Flex>
            {data && data.length === 0 ? <Text>Task Not Found</Text> : <Flex flexDir={"column"} justifyContent="space-between" w="100%" >
                <Text fontWeight={"500"} fontSize="20" textAlign={"center"} my="5" >All Tasks</Text>
                {data.map((el: taskMapProps) => <SingleTask data={el} key={el._id} />)}
            </Flex>}
        </Flex>
    )
}

export default SingleSprintPage