import AllRoutes from './AllRoutes/Allroutes';
import './App.css';
import Sidebar from './pages/Sidebar';
const App = () => {
  return (
    <div className="App" >
      <Sidebar />
      <AllRoutes />
    </div>
  );
}

export default App;
