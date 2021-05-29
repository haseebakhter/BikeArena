import React, {useState,useEffect, useContext} from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
import {withRouter, useHistory} from "react-router-dom";
import './mycss.css'
function Saveads2({handleEdit,handleDelete,job, removead}) {
    const value12 = useContext(UserContext);
    let history = useHistory();
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    
    return (
        <div class="jumbotron jumbotron-fluid">
            <img style={{position:"absolute", left:'1%'}} width="100" height="100" src={'/content/'+job.adimg}  ></img>
                <div class="container">
                    {job.useremail===value12.email2?<button onClick={()=>{handleEdit(job._id)}} style={{float:'right'}} type="button" class="btn btn-success">Edit</button>:null}
                    {job.useremail===value12.email2?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad</button>:null}
                    {value12.isadmin==="true"?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad As Admin</button>:null}
                    <h3 id="ccc2" onClick={()=>{openad(job._id)}}>Ad Title: {job.adtitle}</h3>
                    <a style={{fontSize:"13px"}}>{job.date}</a>
                    
                    
                    <br></br>
                    <a><strong>Ad Description:</strong> {job.addescription}</a><br></br>
                    {job.Category==='Bike'?<a id="forpadding"><strong>Brand:</strong> {job.brand}</a>:<a id="forpadding"><strong>Bike Part:</strong> {job.BikePart}</a>}
                    {job.Category==='Bike'?<a id="forpadding"><strong>Mileage:</strong> {job.Mileage}</a>:null}
                    {job.Category==='Bike'?<a id="forpadding"><strong>Model Year:</strong> {job.Model}</a>:null}
                    <a id="forpadding"><strong>Condition:</strong> {job.condition}</a>
                    <a id="forpadding2"><strong>Price:</strong> RS. {job.price}</a><br></br>
                    <a style={{size:'12px'}} > Posted by <a href='#' onClick={()=>{history.push('/profile/'+job.userid);}}>{job.username}</a></a>
                    <button onClick={()=>{removead(job._id)}} style={{float:'right'}} type="button" class="btn btn-success">Remove From Saved Ads</button>
                    
                    
                </div>
            </div>
    )
}

export default Saveads2
