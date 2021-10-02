import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
import {ProgressBar } from "react-bootstrap"
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
function LoginForm({props,setType,setCredits, setFavs,setCart,setFollowing, setEmail2,setUserid, setUser2, user2, setIslogged }) {
    const [email, setEmail] = useState("Profile")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState()
    const [address, setAddress] = useState("")
    const [adfname, setAdFname] = useState("")
    const [adlname, setAdLname] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [getAD, setGetAD] = useState(false);
    
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async ()=>{
        //i will authenticate user
        
        
        const URL = "http://localhost:5000/sign-in";
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
            setFavs(response.data.favs)
            setFollowing(response.data.following)
            setType(response.data.type)
            setCart(response.data.cart)
            setCredits(response.data.credits)
            console.log("Favs are: ",response.data.favs)
            setIslogged("true")
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
        setEmail(response.email)
        const myArr = response.name.split(" ");
        console.log("First arr", myArr[0], "second arr", myArr[1])
        setAdFname(myArr[0])
        setAdLname(myArr[1])
        const URL = "http://localhost:5000/facebooksign-in";
        var data2 ={
            email: response.email
            
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
            if(response){
                console.log("Response is ",response.data)
            
                setUser2(response.data.fname +" "+ response.data.lname)
                setEmail2(response.data.email)
                setUserid(response.data.id)
                setFavs(response.data.favs)
                setFollowing(response.data.following)
                setType(response.data.type)
                setCart(response.data.cart)
                setCredits(response.data.credits)
                console.log("Favs are: ",response.data.favs)
                setIslogged("true")
                localStorage.setItem('data', JSON.stringify(response.data))
                console.log("We know evertything now after submission", email)
                history.push('/');
            }else{
                console.log("User don't exist by that facebook email")
                setGetAD(true)
            }
            
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
      }
      const responseGoogle = (response) => {
        console.log(response.profileObj);
        setEmail(response.profileObj.email)
        setAdFname(response.profileObj.givenName)
        setAdLname(response.profileObj.familyName)
        const URL = "http://localhost:5000/facebooksign-in";
        var data2 ={
            email: response.profileObj.email
            
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
        
        axios(options).then(response2 => {
            console.log("Response is ",response2.data)
            
            if(response2.data){
                
                setUser2(response2.data.fname +" "+ response2.data.lname)
                setEmail2(response2.data.email)
                setUserid(response2.data.id)
                setFavs(response2.data.favs)
                setFollowing(response2.data.following)
                setType(response2.data.type)
                setCart(response2.data.cart)
                setCredits(response2.data.credits)
                console.log("Favs are: ",response2.data.favs)
                setIslogged("true")
                localStorage.setItem('data', JSON.stringify(response2.data))
                console.log("We know evertything now after submission", email)
                history.push('/');
            
            }else{
                console.log("User don't exist by that gmail email")
                
                setGetAD(true)
            }
        
            
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
      }
      const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
      const handleChange2=()=>{
        console.log("EMail in additional info form",email, adfname, adlname)
        const data = new FormData() 
        data.append('file', selectedfile)
        data.set("email", email);
        data.set("pass", pass);
        data.set("fname", adfname);
        data.set("lname", adlname);
        data.set("address", address);
         
                console.log(email+ ": Email true")
                const URL = "http://localhost:5000/additionalsign-up";
                axios.post(URL,data,{
                    onUploadProgress: progressEvent  => {
                        //Set the progress value to show the progress bar
                        setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total))
                      }})
                .then((response2) => {
                    console.log("Response is ",response2.data)
                    setUser2(response2.data.fname +" "+ response2.data.lname)
                    setEmail2(response2.data.email)
                    setUserid(response2.data.id)
                    setFavs(response2.data.favs)
                    setFollowing(response2.data.following)
                    setType(response2.data.type)
                    setCart(response2.data.cart)
                    setCredits(response2.data.credits)
                    console.log("Favs are: ",response2.data.favs)
                    setIslogged("true")
                    localStorage.setItem('data', JSON.stringify(response2.data))
                    console.log("We know evertything now after submission", email)
                    history.push('/');
                }).catch((error) => {
    
                });
            
            
            
            
            //i will authenticate user
            
            
            
            
            
            
            
         
         }
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("We know evertything now", email)
        
      },[]);
    if(getAD){
        return(
            
            <div>
            <form >
                <h3>As You Are Not Registered Member, We Need Some Additional Info</h3>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" onChange={(e)=>{setAddress(e.target.value)}} className="form-control" placeholder="Enter Address" />
                </div>
                <div className="form-group">
                    <label>Upload Profile Pic</label>
                    <input type="file" name="file" onChange={onIMGChangeHandler}/>
                </div>
                <button type="submit" onClick={e => {e.preventDefault();handleChange2()}}  className="btn btn-primary btn-block">Submit</button>

            </form>
            {progress && <ProgressBar now={progress} label={`${progress}%`} />}
            </div>

        )

    }else{

    
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

                <button type="submit" onClick={e => {e.preventDefault();handleChange()}} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                <a href="/forgetpassword">Forgot password?</a>
                </p>

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            <h3>Or Sign In With</h3>
            <FacebookLogin
            appId="1004619966992687"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook} />,
            <GoogleLogin
            clientId="531177032810-5ectpdh8s33qmqkd0adct3gpjl0g9sju.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
  />,
            
            </div>
            
            
            
        
        
    )
}
    
}
 
export default withRouter(LoginForm)
