import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();
    const [getData,setData] = useState({
        email:'',
        password:''
    })
    const[getError,setError]=useState('');

    const onChangeHandler=(event)=>{
         setData({...getData,[event.target.name]:event.target.value});
    }

    const onSubmitHandler=(event)=>{
            event.preventDefault();
         if(!getData.email || !getData.password){
              alert("please provide the details");
              return;
         }
         axios.post('http://localhost:8080/api/user/login',getData).then((result)=>{
            console.log("successful");
            sessionStorage.setItem('email',result.data.email);
            sessionStorage.setItem('token',result.data.token);
            navigate('/dashboard');
         }).catch((err)=>{
            console.log(err);
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError('please try after sometime');
            }
         })
          

    }

    return (<div className="container">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <form>
                {getError && <h1 style={{color:'red'}}>{getError}</h1>}
                <div class="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChangeHandler} id="email" name="email" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChangeHandler} id="password" name="password" placeholder="Password" />
                </div>
                <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="col-md-4"></div>
    </div>)
}
export default Login;