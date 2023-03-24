import { Route, Routes } from 'react-router-dom'
import Privateroutes from '../components/PrivateRoutes'
import AssignSprints from '../pages/AssignSprints'
import AssignTasks from '../pages/AssignTasks'
import Auth from '../pages/Auth'
import Dashboard from '../pages/Dashboard'
import Report from '../pages/Report'
import Tasks from '../pages/Tasks'


const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Auth />}></Route>
            <Route path='/dashboard' element={<Privateroutes><Dashboard /></Privateroutes>}></Route>
            <Route path='/report' element={<Privateroutes><Report /></Privateroutes>}></Route>
            <Route path='/add-sprint' element={<Privateroutes><AssignSprints /></Privateroutes>}></Route>
            <Route path='/tasks' element={<Privateroutes><Tasks /></Privateroutes>}></Route>
            <Route path='/assign-tasks' element={<Privateroutes><AssignTasks /></Privateroutes>}></Route>
            <Route path='/report' element={<Privateroutes><Report /></Privateroutes>}></Route>
            <Route path='/report' element={<Privateroutes><Report /></Privateroutes>}></Route>
        </Routes>
    )
}

export default AllRoutes