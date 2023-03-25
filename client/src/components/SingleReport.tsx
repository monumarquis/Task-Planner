import { Flex, Progress, Td, Text, Tr } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { getAllTask } from '../redux/allTask/allTask.actions'
import { singlesprintProps, taskMapProps, useAppDispatch, useAppSelector } from '../types/user'

const SingleReport: FC<singlesprintProps> = ({ data }) => {
    const { data: alltask } = useAppSelector((state) => state.allTask)
    const dispatch = useAppDispatch()
    // console.log(alltask);
    const x = alltask && alltask.length > 0 && alltask.filter((el: taskMapProps) => el.sprint === data._id)
    // console.log(x);
    const completeTask = alltask && alltask.length > 0 && x.filter((el: taskMapProps) => el.status === "Completed")
    // console.log(sprintTask);

    let progress = alltask && alltask.length > 0 && completeTask.length > 0 && ((completeTask.length / x.length) * 100).toFixed(2)
    console.log(progress);

    useEffect(() => {
        dispatch(getAllTask())
    }, [])
    return (
        <>
            <Tr>
                <Td>
                    <Flex flexDir={"column"} >
                        <Text fontSize={"20"} mb="2" >{data.title}</Text>
                        <Text fontSize={"16"} >{data.startDate.split("T")[0]}</Text>
                    </Flex>
                </Td>
                <Td>{x.length}</Td>
                <Td>{completeTask.length}</Td>
                <Td>6hr/s</Td>
                <Td >
                    <Flex flexDir={"column"}>
                        <Progress hasStripe value={progress} />
                    </Flex>
                </Td>
            </Tr>
        </>
    )
}

export default SingleReport