import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
function Adminlogin({setIsadmin}) {
  const [id, setID] = useState()
  const [pass, setPass] = useState("")
  const [error, setError] = useState(null);
  let history = useHistory();
  const handleChange= async (e)=>{
    //i will authenticate user
    e.preventDefault()
    
    
    const URL = "http://localhost:5000/adminsign-in";
    var data2 ={
      id: id,
      pass: pass,
        
    }
    const options = {
        method: 'post',
        url: URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        data: data2,

        validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          
      }}
    
    axios(options).then(response => {
      console.log("Response is ",response.data)
      if(response.data.success){
        setIsadmin("true")
        localStorage.setItem('data', JSON.stringify(response.data))
        history.push('/');

      }else{
          setError(response.data.message)
      }
    })
    
    
    .catch(error => {
        
        console.log("Error is: ",error.response)
    });
    
    
    
    
    
    

    
    
    
    
}
  return (
    <div>
      <div>
            <form >
                <h3>Admin Secure Login</h3>

                <div className="form-group">
                    <label>Admin ID</label>
                    <input type="text" onChange={(e)=>{setID(e.target.value)}} className="form-control" placeholder="Enter ID" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>

                

                <button type="submit" onClick={handleChange} className="btn btn-primary btn-block">Submit</button>
                

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            
            
            
            </div>
    </div>
  )
}

export default Adminlogin
