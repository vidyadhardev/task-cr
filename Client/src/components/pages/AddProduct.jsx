import Password from "antd/es/input/Password";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

export default  function AddProduct(){
    const[name,setName] = useState("");
    const[remail,setRemail] = useState("");
    const[rpassword,setRpassword] = useState("");
    // const[company,setCompany] = useState("");
    const[error,setError] = useState(false);
    const nav = useNavigate();

    const addProduct= async ()=>{
        console.log(!name)
        if(!name || !remail || !rpassword ){
            setError(true)
        return false;
        }
        console.log({name,remail,rpassword})
        
       const result =await fetch('http://localhost:5000/add-product',{
        method:"POST",
        body:JSON.stringify({name,remail,rpassword}),
        headers:{
            "Content-Type":"application/json"
        }
       });
       result = await result.json();
     
      
      
       setName('');
       setRemail('');
       setRpassword('');
       

    }
    return(
        <div className="resister">
            <h3>Add <b style={{color:"skyblue"}}>Products</b> </h3><hr/>
            <input type="text" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Your  Name" />
            {error && !name && alert("Enter valid name")}
            <input type="text" className="inputBox" value={remail} onChange={(e)=>{setRemail(e.target.value)}} placeholder="Enter Your email" />
            {error && !remail && alert("Enter valid price")}
            <input type="text" className="inputBox" value={rpassword} onChange={(e)=>{setRpassword(e.target.value)}} placeholder="Enter Your password" />
            {error && !rpassword && alert("Enter valid category")}
            {/* <input type="text" className="inputBox" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Your Product Company" />
            {error && !company && alert("Enter valid company")} */}
           <Link to={"/"}><button type="button" onClick={addProduct} className="add">Add Products</button></Link> 
        </div>
    )
}