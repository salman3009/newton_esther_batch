import {useState} from 'react';

function UseState(){

    const [getState,setState]=useState('suresh');
 
   const onchangeHandler=(event)=>{
     setState(event.target.value)
   }
 
   return (
     <>
     <div>{getState}</div>
     <div><input type="text" onChange={(event)=>setState(event.target.value)}/></div>
     </>
   )
 }
 export default UseState;