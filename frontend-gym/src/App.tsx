import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardA from './Components/DashboardA';
import DashboardS from './Components/DashboardS';
import Login from './Components/Login';


function App() {
  return (
  <DashboardA/>
  // <DashboardS/>
 
  //   <Router>
  //   <Routes>
  //     <Route path = '/' element = {<Login />} />
  //     <Route path = '/dashboard' element = {<DashboardS />} />
  //   </Routes>
  // </Router>
      );


}

export default App; 
