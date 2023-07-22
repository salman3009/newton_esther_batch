import './App.css';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header/>
       <Routes>
       <Route path='/' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
