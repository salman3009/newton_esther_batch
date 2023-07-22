import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();
    const [getData,setData] = useState({
         email:'',
         password:''
    })

    const [getError,setError] = useState('')

    const onChangeHandler=(event)=>{
        setData({...getData,[event.target.name]:event.target.value})
    }

    const onSubmitHandler=(event)=>{
         event.preventDefault();
         if(!getData.email || !getData.password){
             alert('please provide the details');
             return ;
         }
         axios.post('http://localhost:8080/api/user/login',getData).then((result)=>{
            alert("successful");
            setError('');
            console.log(result.data.token);
            sessionStorage.setItem('token',result.data.token);
            sessionStorage.setItem('admin',result.data.admin);
            navigate('/dashboard');
         }).catch((error)=>{
            if(error && error.response && error.response.data){
                setError(error.response.data.message)
            }
            
         })
    }

    return (<div className="container">
        <div className="col-4"></div>
        <div className="col-4">
           {getError && <h1 style={{color:'red'}}>{getError}</h1>} 
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChangeHandler} name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChangeHandler} name="password" />
                </div>

                <button type="submit" onClick={onSubmitHandler} className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="col-4"></div>

    </div>)
}

export default Login;