import React, {useState,useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { withRouter, useHistory} from 'react-router-dom'; 
function ShowFriends({fremail}) {
    const [ishide, setIshide] = useState("false")
    const [cart, setCart] = useState([])
    
    let history = useHistory();
    const getuserIDName=()=>{
        const URL = "http://localhost:5000/getuserIDName";
      var data2 ={
        email: fremail
    }
    console.log(data2);
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
      console.log("cart:",response.data)
      setCart(response.data)
  })
  .catch(error => {
      console.log(error.response)
  });
    }
    useEffect(() => {
        if(fremail===""){
            setIshide("true")
            
        }else{
            console.log(fremail)
            getuserIDName()
        }
     
      },[fremail]);

    return (
        
        <div>
            {ishide==="true"||cart==null
                    ? null
                    : <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}}>
                    <div class="container">
                    
                    <img width="100" height="100" src={'/content/'+cart.propic} ></img>
                    <a style={{fontSize:'42px'}} href='#' onClick={()=>{history.push('/profile/'+cart._id);}} >{cart.firstname} {cart.lastname}</a><br></br>
                            <a style={{paddingLeft:'105px', paddingTop:'−80px'}}>Email: {cart.email}</a><br></br>
                            
                        
                        
                    </div>
                </div>}
            
            
        </div>
    )
}

export default withRouter(ShowFriends)
