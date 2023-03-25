import { Avatar, Flex, Text, useToast } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { TbReport } from 'react-icons/tb'
import { MdAddTask } from 'react-icons/md'
import { VscTasklist } from 'react-icons/vsc'
import { CgExtensionAdd } from 'react-icons/cg'
import { GiSprint } from 'react-icons/gi'
import { FaUsers } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../types/user'
import { LogOut } from '../redux/auth/auth.actions'
import { getUserProfile } from '../redux/userProfile/userProfile.actions'

const Sidebar: FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.auth)
  const { data, loading } = useAppSelector((state) => state.userProfile)
  console.log(data, "user")
  const dispatch = useAppDispatch()
  const toast = useToast()
  useEffect(() => {
    if (isAuth  && localStorage.getItem("token")) {
      dispatch(getUserProfile())
    }
  }, [isAuth])

  const handlelogout = (): void => {
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
    <Flex display={isAuth ? "flex" : "none"} pl="10px" flexDirection="column" bg="#545154" w="20%" h="100vh" pos={"fixed"} top="0" left="0" >

      <Flex id="tab" flexDirection="row" alignItems="center" my="10" >
        <Avatar name={data && !loading ? data.name : "Monu Yadav"} src='https://bit.ly/broken-link' />
        <Text ml="5" color={"#fff"} fontSize="20" >{data && !loading ? data.name : ""}</Text>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <GiSprint color='#fff' fontSize={"25px"} />
        <NavLink to="/dashboard" style={{ marginLeft: "25px", color: "#fff" }}>Sprints</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <CgExtensionAdd color='#fff' fontSize={"25px"} />
        <NavLink to="/add-sprint" style={{ marginLeft: "25px", color: "#fff" }}>Add Sprint</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <VscTasklist color='#fff' fontSize={"25px"} />
        <NavLink to="/tasks" style={{ marginLeft: "25px", color: "#fff" }}>Tasks</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10" >
        <MdAddTask color='#fff' fontSize={"25px"} />
        <NavLink to="/assign-tasks" style={{ marginLeft: "25px", color: "#fff" }}>Assign Task</NavLink>
      </Flex>
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10">
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/report" style={{ marginLeft: "25px", color: "#fff" }}>Report</NavLink>
      </Flex>
      {role === 'admin' && <Flex w="50%" id="tab" flexDirection="row" alignItems="center" mb="10" >
        <FaUsers color='#fff' fontSize={"25px"} />
        <NavLink to="/all-users" style={{ marginLeft: "25px", color: "#fff" }}>Users</NavLink>
      </Flex>}
      {/* {role === 'admin' && <Flex w="50%" id="tab" flexDirection="row" alignItems="center" mb="10" >
        <TbReport color='#fff' fontSize={"25px"} />
        <NavLink to="/report" style={{ marginLeft: "25px", color: "#fff" }}>Add User</NavLink>
      </Flex>} */}
      <Flex id="tab" flexDirection="row" alignItems="center" mb="10">
        <Avatar name={data && !loading ? data.name : "Monu Yadav"} src='https://bit.ly/broken-link' size={"sm"} />
        <Text ml="5" color={"#fff"} fontSize="16" cursor={"pointer"} onClick={handlelogout} >Logout</Text>
      </Flex>
    </Flex>
  )
}

export default Sidebar