import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashboard = () => {

  const navigate = useNavigate();
  const [getState, setState] = useState({
    productName: '',
    price: ''
  })
  const [getError, setError] = useState('');
  const [getList,setList]=useState([]);

  const onChangeHandler = (event) => {
    setState({ ...getState, [event.target.name]: event.target.value })
  }

  const onSubmitDetails = (event) => {
    event.preventDefault();
    if (!getState.productName || !getState.price) {
      alert("Details are mandatory");
    }
    getState.price = Number(getState.price);
    axios.post('http://localhost:8080/api/product/create', getState).then(() => {
      setError('');
      alert("successfully data added");
      getListDetails();
      setState({productName:'',price:''});
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        setError("internal server error, try after sometime")
      }
    })

  }

  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      alert("user data is not found");
      navigate('/login');
    }else{
      getListDetails();
    }

  },[])

  const getListDetails=()=>{
    axios.get('http://localhost:8080/api/product/list').then((result)=>{
           console.log(result.data);
           if(result.data && result.data.post){
             setList(result.data.post);
           }
      }).catch((err)=>{
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        }
        else {
          setError("internal server error, try after sometime")
        }
      })
  }

  return (<div>
    <h1 style={{ textAlign: 'center' }}>Welcome to Dashboard</h1>
    {getError && <h1 style={{color:'red',textAlign:'center'}}>{getError}</h1>}
    <div className="container">
      <div className="col-4">

      </div>
      <div className="col-4">
        <form>
          <div class="form-group">
            <label htmlFor="productName">Product Name</label>
            <input type="text" className="form-control" value={getState.productName} onChange={onChangeHandler} id="productName" name="productName" />
          </div>
          <div class="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" className="form-control" value={getState.price} onChange={onChangeHandler} id="price" name="price" />
          </div>
          <button onClick={onSubmitDetails} type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>
      <div className="col-4">

      </div>
    </div>
    <br/>
    <br/>
    <div className="container">
      <div className="col-1">

      </div>
      <div className="col-10">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">product Name</th>
              <th scope="col">Discount Price</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {getList && getList.length>0 && getList.map((obj,index)=>{
                 return (<tr key={index}> 
                  <th scope="row">{index+1}</th>
                  <td>{obj.productName}</td>
                  <td>{obj.price}</td>
                  <td>{obj.stock}</td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
      <div className="col-1">

      </div>
    </div>
  </div>)
}
export default Dashboard;