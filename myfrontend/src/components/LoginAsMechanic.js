import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
function LoginForm({props,setType, setEmail2,setUserid, setUser2, user2, setIslogged }) {
    const [email, setEmail] = useState("Profile")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);

    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/mechanicsign-in";
        var data2 ={
            email: email,
            pass: pass,
            
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
          if(response.data.success){
            setUser2(response.data.fname +" "+ response.data.lname)
            setEmail2(email)
            setUserid(response.data.id)
            setIslogged("true")
            setType(response.data.type)
            console.log("Type ",response.data.type)
            localStorage.setItem('data', JSON.stringify(response.data))
            console.log("We know evertything now after submission", email)
            history.push('/');

          }else{
              setError(response.data.message)
          }
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    const responseFacebook = (response) => {
        console.log(response);
        
      }
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("We know evertything now", email)
        
      });
    
    return (
        
             
            
                <div>
            <form >
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={handleChange} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            
            
            
            
            </div>
            
            
            
        
        
    )
    
}
 
export default withRouter(LoginForm)
