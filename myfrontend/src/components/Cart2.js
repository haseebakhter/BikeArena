import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {ArrowUpRightSquareFill,SaveFill, Save, EyeFill, Calendar2MinusFill, Bezier, GeoAltFill } from 'react-bootstrap-icons';

import { pk } from "./pk.js";
import {UserContext} from './UserContext'
import './mycss.css'
function Cart2() {
    const [cart, setCart] = useState(null)
    let params = useParams();
    const value12 = useContext(UserContext);
    let history = useHistory();
    
    const getJob=(id)=>{
        axios.get('http://localhost:5000/ad/'+id)
            .then(response => {
                console.log(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    
    
    
    useEffect(() => {
        console.log("welcome to cart")
        getJob()
    }, [])
    
      return (
        <div>
            <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'40%', height:'40%',display:'inline-block', marginLeft:'5%'}} >
                    <img style={{/*position:"absolute", left:"1%", marginTop:"0%"*/display:'inline-block', marginTop:'-7%'}} width="100%" height="300px" src={'/content/'+cart.adimg}  ></img>
                    
                <div class="container" >
                
                    
                    
                    <h3 id="ccc2"  >{cart.adtitle}</h3>
                    <a style={{marginLeft:'43%'}}><GeoAltFill /> {cart.city}</a>
                    
                    
                    <br></br>
                    {/*<a><strong>Ad Description:</strong> {cart.addescription}</a><br></br>*/}
                    
                    <a id="forpadding"><strong>Bike Part:</strong> {cart.BikePart}</a>
                    <a id="forpadding"><strong>Condition:</strong> {cart.condition}</a>
                    
                    
                    
                    <br></br>
                    <a style={{size:'12px'}} ><a href={'/profile/'+cart.userid}>{cart.username}</a></a><a style={{fontSize:"13px", marginLeft:'2%'}}>{cart.date}</a>
                    <div style={{backgroundColor:'#fff591', width:'25%', textAlign:'center', float:'right'}}><a id="forpadding2"><strong></strong> RS. {cart.price}</a><br></br></div>
                    
                    <button onClick={()=>{openad(cart._id)}}style={{ marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><EyeFill/> View Ad</button>
                    
                    <button style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><SaveFill/> Remove From Cart</button>
                </div>
                
            </div>
        </div>
    )
}

export default withRouter(Cart2)
