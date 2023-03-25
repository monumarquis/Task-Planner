import { Flex } from '@chakra-ui/react';
import AllRoutes from './allRoutes/Allroutes';
import './App.css';
import Sidebar from './pages/Sidebar';
import { useAppSelector } from './types/user';
const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  return (
    <div className="App" >
      <Sidebar />
      <Flex flexDirection="column" display={isAuth ? "flex" : "none"} w="80%" ml="auto" h="50px" bg="#4287f5" >
      </Flex>
      <AllRoutes />
    </div>
  );
}

export default App;
