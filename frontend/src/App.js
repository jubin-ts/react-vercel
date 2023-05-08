import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';



function App() {

  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
       <div>
        <Routes>
          <Route 
            path='/'
            element={!user ?<Login /> : <Navigate to="/home"/> } 
           />
          <Route 
            path='/signup'
            element={!user ? <Signup /> : <Navigate to="/home" />}
          /> 
           
          <Route 
            path='/home'
            element={user ? <Home /> :<Navigate to="/" />}
          />
          
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
