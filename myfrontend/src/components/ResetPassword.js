import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
function ResetPassword(props) {
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const token = props.match.params.token;
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/nextforgetpassword";
        var data2 ={
            passwordToken: token,
            password: pass,
            
        }
        console.log("my data in front bs",data2)
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
          setMessage(response.data.message)
          
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("Reset Password: ", token)
        
      },[]);
    
    return (
        
             
            
                <div>
            <form >
                <h3>Reset Password</h3>

                

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>

                

                <button type="submit" onClick={handleChange} className="btn btn-primary btn-block">Submit</button>
                

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            {message? <div class="alert alert-success" role="alert">{message}</div> : null}
            
            
            
            </div>
            
            
            
        
        
    )
    
}
 
export default withRouter(ResetPassword)
