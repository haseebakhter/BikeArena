import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {
    Avatar
  } from "@chatscope/chat-ui-kit-react";
function Purchases() {
    const [purchases, setPurchases]=useState([])
    let params = useParams();
    const getData=()=>{
        axios.get('http://localhost:5000/getuserpurchases/'+params.id)
            .then(response => {
                console.log(response.data)
                setPurchases(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    useEffect(()=>{
        console.log("User purchases: ",params.id)
        getData()

    },[])
    return (
        <div>
            <h1>All Purchases</h1>
            <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}}>
            <div class="container">
            <div style={{backgroundColor:'#E52D27'}}>
                    <a style={{fontSize:'30px', display:'inline-block', color:'white'}}  >Buyer Name</a>
                    <a style={{fontSize:'30px', display:'inline-block', marginLeft:'16%', color:'white'}}  >Seller Name</a>
                    <a style={{fontSize:'30px', display:'inline-block', marginLeft:'18%', color:'white'}}   >Ad Name</a>
                    <a style={{fontSize:'30px', display:'inline-block', marginLeft:'10%', color:'white'}}  >Amount Paid</a>
            </div> 
            {purchases.map(purchase=>(
                
                <div>
                    <Avatar style={{display:'inline-block'}} src={'/content/'+purchase.PurchasedBy.propic} name={purchase.PurchasedBy.firstname} />
                    <a style={{fontSize:'30px', display:'inline-block'}} href={'/profile/'+purchase.PurchasedBy._id}  >{purchase.PurchasedBy.firstname} {purchase.PurchasedBy.lastname}</a>
                    <Avatar style={{display:'inline-block', marginLeft:'10%'}} src={'/content/'+purchase.PurchasedFrom.propic} name={purchase.PurchasedFrom.firstname} />
                    <a style={{fontSize:'30px', display:'inline-block'}} href={'/profile/'+purchase.PurchasedFrom._id}  >{purchase.PurchasedFrom.firstname} {purchase.PurchasedFrom.lastname}</a>
                    <a style={{fontSize:'30px', display:'inline-block', marginLeft:'10%', maxWidth:'20%', overflow:'hidden'}} href={'/ad/'+purchase.PurchasedAd._id}  >{purchase.PurchasedAd.adtitle}</a>
                    <a style={{fontSize:'30px', display:'inline-block', marginLeft:'10%'}}  >{purchase.PurchasedAd.price}</a>
                </div> 
               
            ))}
             </div>
            </div> 
        </div>
    )
}

export default Purchases
