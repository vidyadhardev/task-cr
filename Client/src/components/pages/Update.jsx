import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

export default  function Update(){
    const[name,setName] = useState("");
    const[remail,setRemail] = useState("");
    const[rpassword,setRpassword] = useState("");
    const navigate = useNavigate("");
    const params = useParams(); 

    useEffect(()=>{
       //console.log(params);
        getProductDetails();
    },[]);
    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setRemail(result.remail);
        setRpassword(result.rpassword);
        
    }
    const updateProduct = async () =>{
        console.log({name,remail,rpassword})
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,remail,rpassword}),
            headers:{"Content-Type":"application/json"}
        });
        result = await result.json()
        console.log(result);
        navigate('/')
    }

    return(
        <div className="resister">
            <h3>Update <b style={{color:"skyblue"}}>Product</b> </h3><hr/>
            <input type="text" className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Your Name" />
            <input type="text" className="inputBox" value={remail} onChange={(e)=>{setRemail(e.target.value)}} placeholder="Enter Your Email " />
            <input type="text" className="inputBox" value={rpassword} onChange={(e)=>{setRpassword(e.target.value)}} placeholder="Enter Your Pasword" />
            
            <button type="button" onClick={updateProduct}  className="add">Update</button>
        </div>
    )
}