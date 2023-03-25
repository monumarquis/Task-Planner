import {
    Flex, Icon, Text, Avatar, Button
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FiSquare } from 'react-icons/fi'
import { AiFillCheckSquare } from 'react-icons/ai'
import { singletaskProps } from '../types/user'

const SingleTask: FC<singletaskProps> = ({ data }) => {
    const [isShow, setShow] = useState<boolean>(false)

    const handleShow = (): void => setShow(!isShow)
    return (
        <Flex flexDir={"column"} w="100%" _hover={{ bg: "#dbdad7" }} borderBottom="0.5px solid grey"  pt="2" >
            <Flex flexDir={"row"} justifyContent="space-between" alignItems="center"  mb="2" >
                <Flex flexDir={"row"} alignItems="center" ml="2" >
                    <Icon onClick={handleShow} color={isShow ? 'red.500' : "#000"} fontSize="20" as={isShow ? AiFillCheckSquare : FiSquare} />
                    <Text ml="5" fontSize={"20"} fontWeight={"500"} >{data.title}</Text>
                </Flex>
                <Flex flexDir={"row"} alignItems="center" mr="2" >
                    <Text fontSize={"12"} fontWeight={"400"} >{data.createdAt.split("T")[0]}</Text>
                    <Avatar ml="4" size='sm' name={data.assignBy} src='https://bit.ly/broken-link' />
                </Flex>
            </Flex>
            <Flex flexDir={"column"} display={isShow ? "flex" : "none"} bg="#f2f0f0" justifyContent="space-between" w="100%" py="2" px="3">
                <Flex flexDir={"row"} justifyContent="space-between" alignItems="center"  >
                    <Text fontSize={"16"} color={"#000"} fontWeight={"400"}  >Assign by {" "}{data.assignBy}</Text>
                    {data.status === "Completed" ? <Text color={"#000"} fontWeight="400" >Status : Finished</Text> : <Button>Mark Done</Button>}
                </Flex>
                <Text fontSize={"13"} mt="4" ml="2" color={"#6b6969"} fontWeight={"400"}  >{data.desc}</Text>
            </Flex>
        </Flex>
    )
}

export default SingleTask