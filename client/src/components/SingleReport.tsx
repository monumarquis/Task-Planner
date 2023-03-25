import { Flex, Td, Text, Tr } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { getAllSprintTask } from '../redux/sprintTask/sprintTask.actions'
import { singlesprintProps, sprintMapProps, taskAssign, taskMapProps, useAppDispatch, useAppSelector } from '../types/user'

const SingleReport: FC<singlesprintProps> = ({ data }) => {
    const { data: alltask } = useAppSelector((state) => state.allSprintTask)
    const dispatch = useAppDispatch()
    console.log(alltask);
    const x = alltask && alltask.length > 0 && alltask.filter((el: taskMapProps) => el.status === "Completd")
    console.log(x);
    useEffect(() => {
        dispatch(getAllSprintTask(data._id))
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
                <Td isNumeric>{alltask.length}</Td>
                <Td isNumeric>{x.length}</Td>
                <Td isNumeric>6hr/s</Td>
                <Td >25.4</Td>
            </Tr>
        </>
    )
}

export default SingleReport