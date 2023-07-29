import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

    const navigate = useNavigate();
    const [getData, setData] = useState({
        name: '',
        amount: '',
        location: ''
    })

    const [getList,setList] = useState([]);
    const [getAdmin,setAdmin]= useState(false);

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            getListDetails();
        }else{
             navigate('/');
        }
    },[])

    const getListDetails=()=>{
        axios.get('http://localhost:8080/api/transaction/list').then((result) => {
            setList(result.data.list?result.data.list:[]);
            console.log("salman",(sessionStorage.getItem('admin')));
            setAdmin(sessionStorage.getItem('admin'))
        }).catch(() => {    
            alert("internal server error");
        })
    }

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!getData.name || !getData.amount || !getData.location) {
            alert('please provide the details');
            return;
        }
        axios.post('http://localhost:8080/api/transaction/create', getData).then(() => {
            alert("successful");
            getListDetails();
        }).catch(() => {
            alert("internal server error");
        })
    }

    const onLogoutHandler=()=>{
        sessionStorage.removeItem('token');
        navigate('/');
    }

    const onDeleteHandler=(id)=>{
        axios.delete('http://localhost:8080/api/transaction/delete/'+id).then((result) => {
            getListDetails();
        }).catch(() => {
            alert("internal server error");
        })
    }

    return (<div className="container">
        <div class="col-12">
        <button type="submit"  style={{float:'right'}} onClick={onLogoutHandler} className="btn btn-primary">Logout</button>
        </div>
        <div className="col-4"></div>
        <div className="col-4">
            <form>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChangeHandler} name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" onChange={onChangeHandler} name="amount" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" onChange={onChangeHandler} name="location" />
                </div>

                <button type="submit" onClick={onSubmitHandler} className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="col-4"></div>
        <div class="row">
            <div class="col-2">

            </div>
            <div class="col-8">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Location</th>
                            {getAdmin == 'true' && <th scope="col">Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {getList.map((data,index)=>{
                            return ( <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{data.name}</td>
                                <td>{data.amount}</td>
                                <td>{data.location}</td>
                               {getAdmin == 'true' && <td><button onClick={()=>onDeleteHandler(data._id)}>Delete</button></td>} 
                            </tr>)
                        })}   
                    </tbody>
                </table>
            </div>
            <div class="col-2">
                
            </div>
        </div>

    </div>)
}

export default Dashboard;