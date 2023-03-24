import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

const Tasks: FC = () => {
    return (
        <Flex flexDirection="column" border={"1px solid black"} w="80%" ml="auto" bg="red" >
            Task
        </Flex>
    )
}

export default Tasks