import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { TbReport } from 'react-icons/tb'
import { FaProjectDiagram } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../types/user'
import { color } from 'framer-motion'
import { LogOut } from '../redux/auth/auth.actions'

const Sidebar: FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const toast = useToast()
  const handlelogout = ():void => {
    dispatch(LogOut())
    toast({
      title: "logged Out",
      description: "You've logged out successfully",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }
  return (
    <Flex display={isAuth ? "flex" : "none"} pl="10px" flexDirection="column" bg="#545154" w="20%" border={"1px solid red"} h="100vh" pos={"absolute"} top="0" left="0" >

      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <Avatar name='Monu Yadav' src='https://bit.ly/broken-link' />
        <Text ml="5" color={"#fff"} fontSize="20" >Monu Yadav</Text>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <FaProjectDiagram color='#fff' fontSize={"25px"} />
        <NavLink to="/dashboard" style={{ marginLeft: "25px", color: "#fff" }}>Sprints</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <FaProjectDiagram color='#fff' fontSize={"25px"} />
        <NavLink to="/add-sprint" style={{ marginLeft: "25px", color: "#fff" }}>Add Sprints</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/tasks" style={{ marginLeft: "25px", color: "#fff" }}>Tasks</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/assign-tasks" style={{ marginLeft: "25px", color: "#fff" }}>Assign Tasks</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10">
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/report" style={{ marginLeft: "25px", color: "#fff" }}>Report</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10">
        <TbReport color='#fff' fontSize={"25px"} />
        <Text ml="5" color={"#fff"} fontSize="20" cursor={"pointer"} onClick={handlelogout} >Logout</Text>
      </Flex>
      {role === 'admin' && <Flex w="50%" id="tab" flexDirection="row" alignItems="center" mb="10" >
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/report">Users</NavLink>
      </Flex>}
      {role === 'admin' && <Flex w="50%" id="tab" flexDirection="row" alignItems="center" mb="10" >
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/report">Add User</NavLink>
      </Flex>}

    </Flex>
  )
}

export default Sidebar