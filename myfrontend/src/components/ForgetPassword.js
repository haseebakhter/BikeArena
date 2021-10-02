import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
function ForgetPassword({}) {
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/forgetpassword";
        var data2 ={
            email: email
            
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
          
            console.log(response.data)
            setMessage(response.data)
            

          
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("We know evertything now", email)
        
      },[]);
    
    return (
        
             
            
                <div>
            <form >
                <h3>Retrieve Password Using Email</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>
                <button type="submit" onClick={handleChange} className="btn btn-primary btn-block">Submit</button>
                

            </form>
            {message? <div class="alert alert-success" role="alert">{message}</div> : null}
            
            
            
            </div>
            
            
            
        
        
    )
    
}
 
export default withRouter(ForgetPassword)
