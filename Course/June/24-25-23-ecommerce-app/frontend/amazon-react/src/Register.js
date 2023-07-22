import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
const Register = () => {

    const navigate = useNavigate();
    const [getData,setData] = useState({
        userName:'',
        email:'',
        password:''
    })

    const onChangeHandler=(event)=>{
         setData({...getData,[event.target.name]:event.target.value});
    }

    const onSubmitHandler=(event)=>{
            event.preventDefault();
         if(!getData.userName || !getData.email || !getData.password){
              alert("please provide the details");
              return;
         }
         axios.post('http://localhost:8080/api/user/register',getData).then(()=>{
            console.log("successful");
            navigate('login');
         }).catch((err)=>{
            console.log(err);
         })
           console.log(getData);

    }

    return (<div className="container">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <form>
                <div class="form-group">
                    <label htmlFor="userName">UserName</label>
                    <input type="text" className="form-control" onChange={onChangeHandler} id="userName" name="userName" placeholder="Enter userName" />
                </div>
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
export default Register;