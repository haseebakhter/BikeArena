import React, {useState,useEffect, useContext}  from 'react'
import axios from 'axios'
import {ArrowUpRightSquareFill,SaveFill, Save, EyeFill, Calendar2MinusFill, Bezier, GeoAltFill } from 'react-bootstrap-icons';
import {useParams,withRouter, useHistory} from "react-router-dom";
import {UserContext} from './UserContext'
import StripeCheckout from 'react-stripe-checkout'
function Cart() {
    const [cart, setCart] = useState(null)
    const [show, setShow] = useState(false)
    let history = useHistory();
    const value12 = useContext(UserContext);
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    const removefromCart=(id)=>{
        axios.post('/removefromcart', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              console.log(response.data)
              value12.updatecart(null)
              setCart(null)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        
    }
    const getCart=()=>{
        axios.get('http://localhost:5000/mycart/'+value12.email2)
            .then(response => {
                console.log(response.data)
                setCart(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const handleToken=(token, addresses)=>{
        console.log(token)
        console.log("Product ID: ",cart._id)
        axios.post('/payment', {
            cardToken:token,
            amount:cart.price,
            adid:cart._id,
            userid:value12.userid,
            adholderid:cart.userid
          })
          .then(function (response) {
              console.log(response.data)
              if(response.data.success){
                axios.post('/removefromcart', {
                    useremail:value12.email2,
                    id:cart._id
                  })
                  .then(function (response) {
                      console.log(response.data)
                      value12.updatecart(null)
                      setCart(null)
                      history.push('/');
                  })
                  .catch(function (error) {
                    console.log('Error is ',error);
                  });
              }
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        
    }
    useEffect(() => {
        console.log("welcome to cart component ")
        getCart()
    }, [])
    if(cart){
        return (
            <div>
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'40%', height:'40%',display:'inline-block', marginLeft:'32%'}} >
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
                        
                        <button onClick={()=>{openad(cart._id)}} style={{ marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><EyeFill/> View Ad</button>
                        
                        <button onClick={()=>{removefromCart(cart._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><SaveFill/> Remove From Cart</button>
                        <button onClick={()=>setShow(true)} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><SaveFill/> Checkout</button>
                        {show?<StripeCheckout 
                        token={handleToken}
                        currency="INR"
                        amount = {cart.price*100}
                        stripeKey="pk_test_51JI9qWSIjYjIFUxN2rpYq0WGO9rWFFevTXR0dd3vV7yxsYlEkHjNsTEVTJzBg5dgosoMQKi6WqpDkjSJ3MEYfBhr00eOqk5cn8"
                        />:null}
                    </div>
                    
                </div>
            </div>
        )

    }else{
        return(
            <div>
                <h1>Cart loading...</h1>
            </div>
        )
    }
    
}

export default Cart
