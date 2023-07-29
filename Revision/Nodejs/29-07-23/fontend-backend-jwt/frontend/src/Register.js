import {useState} from 'react';
import axios from 'axios';
const Register = () => {

    const [getData,setData] = useState({
         userName:'',
         email:'',
         password:''
    })

    const onChangeHandler=(event)=>{
        setData({...getData,[event.target.name]:event.target.value})
    }

    const onSubmitHandler=(event)=>{
         event.preventDefault();
         if(!getData.userName || !getData.email || !getData.password){
             alert('please provide the details');
             return ;
         }
         axios.post('http://localhost:8080/api/user/register',getData).then(()=>{
            alert("successful");
         }).catch(()=>{
            alert("internal server error");
         })
    }

    return (<div className="container">
        <div className="col-4"></div>
        <div className="col-4">
            <form>

                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" className="form-control" onChange={onChangeHandler} name="userName" />
                </div>
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

export default Register;