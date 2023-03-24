import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import SingleTask from '../components/SingleTask'
import { getAllMyTask } from '../redux/myTask/myTask.actions'
import { singletaskProps, taskMapProps, useAppDispatch, useAppSelector } from '../types/user'

const Tasks: FC = () => {
    const dispatch = useAppDispatch()
    const { myTaskData, assignedData } = useAppSelector((state) => state.allMyTasks)
    console.log({ myTaskData, assignedData });

    useEffect(() => {
        dispatch(getAllMyTask())
    }, [])

    return (
        <Flex flexDirection="column" w="80%" ml="auto" >
            <Tabs isFitted variant='enclosed' w="95%" m="auto" mt="10" >
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500', fontsize: "30", fontWeight: "500" }}>My Task</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.400', fontsize: "30", fontWeight: "500" }}>Assigned Task</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex flexDir={"column"} justifyContent="space-between" w="100%" >
                            {myTaskData && myTaskData.length > 0 && myTaskData.map((el: taskMapProps) => <SingleTask data={el} key={el._id} />)}
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex flexDir={"column"} justifyContent="space-between" w="100%" >
                            {assignedData && assignedData.length > 0 && assignedData.map((el: taskMapProps) => <SingleTask data={el} key={el._id} />)}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default Tasks