import { Avatar, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { singlesprintProps } from '../types/user'

const SingleSprint: FC<singlesprintProps> = ({ data }) => {
    const navigate = useNavigate()
    const handleClick = (): void => {
        navigate(`/dashboard/${data._id}`)
    }
    return (
        <Flex flexDirection={"row"} justifyContent="space-between" w="95%" onClick={handleClick} m="auto" borderLeft={"5px solid #1b6df2"} borderRadius="10px" mb="10" className='box' p="5" >
            <Flex flexDirection={"column"} w="48%" >
                <Text as='u' fontWeight={"500"} >Sprint Name</Text>
                <Text color={"#575757"} mb="5">{data.title}</Text>
                <Text as='u' fontWeight={"500"} >Description</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.desc}</Text>
            </Flex>
            <Flex flexDirection={"column"} w="48%" >
                <Text as='u' fontWeight={"500"} >Start Date</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.startDate.split("T")[0]}</Text>
                <Text as='u' fontWeight={"500"} >End Date</Text>
                <Text color={"#575757"} mb="5" textAlign={"left"} >{data.endDate.split("T")[0]}</Text>
                <Text as='u' fontWeight={"500"} >Sprint Creator</Text>
                <Flex flexDirection={"row"} alignItems="center" >
                    <Text color={"#575757"} textAlign={"left"} >{data.creatorName}</Text>
                    <Avatar name={data.creatorName} size="sm" ml="2" src='https://bit.ly/broken-link' />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SingleSprint