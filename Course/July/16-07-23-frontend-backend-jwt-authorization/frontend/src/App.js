import './App.css';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import axios from 'axios';

function App() {
  
  axios.interceptors.request.use(async(request)=>{
    request.headers['auth-token'] = sessionStorage.getItem('token');
    return request;
  })

  return (
    <div className="App">
      <BrowserRouter>
       <Header/>
       <Routes>
       <Route path='/' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
