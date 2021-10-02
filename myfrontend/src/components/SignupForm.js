import React, {useState,useEffect, useMemo} from 'react'
import axios from 'axios'
import {ProgressBar } from "react-bootstrap"
function SignupForm() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [address, setAddress] = useState("")
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState()
    const [selectedfile, setSelectedfile] = useState("")
    const [success, setSuccess] = useState(null);
    function validateEmail(email) 
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const handleChange=()=>{
        console.log("EMail in signup form",email)
        const data = new FormData() 
        data.append('file', selectedfile)
        data.set("email", email);
        data.set("pass", pass);
        data.set("fname", fname);
        data.set("lname", lname);
        data.set("address", address);
         if (fname=="" || lname==""|| email=="" || address=="" ){
                if(fname==""){
                    setError("First name is empty")
                }
                if(lname==""){
                    setError("Last name is empty")
                }
                if(email==""){
                    setError("Email is empty")
                }
                if(address==""){
                    setError("Address is empty")
                }
         }else{
            if(validateEmail(email)){
                console.log(email+ ": Email true")
                const URL = "http://localhost:5000/sign-up";
                axios.post(URL,data,{
                    onUploadProgress: progressEvent  => {
                        //Set the progress value to show the progress bar
                        setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total))
                      }})
                .then((response) => {
                    console.log("Response is ",response.data.message)
                    if(response.data.auth){
                        setError(null)
                        setSuccess(response.data.message)
                    }else{
                        setError(response.data.message)
                    }
                }).catch((error) => {
    
                });
            
            
            
            }else{
                console.log(email+ ": Email false")
                setError("Wrong Email Format")
            }
            //i will authenticate user
            
            
            
            
            
            
            
        } 
         }
       
    const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    useEffect(()=>{
        
    },[])
    return (
        <div>
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={(e)=>{setFname(e.target.value)}} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={(e)=>{setLname(e.target.value)}} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" onChange={(e)=>{setAddress(e.target.value)}} className="form-control" placeholder="Enter Address" />
                </div>
                <div className="form-group">
                    <label>Upload Profile Pic</label>
                    <input type="file" name="file" onChange={onIMGChangeHandler}/>
                </div>
                

                <button type="submit" onClick={e => {e.preventDefault();handleChange()}} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            {success? <div class="alert alert-success" role="alert">{success}</div> : null}
            {progress && <ProgressBar now={progress} label={`${progress}%`} />}
        </div>
    )
}

export default SignupForm
