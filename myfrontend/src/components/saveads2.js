import React, {useState,useEffect, useContext} from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
import {withRouter, useHistory} from "react-router-dom";
import './mycss.css'
import {ArrowUpRightSquareFill,SaveFill, Save, EyeFill, Calendar2MinusFill, Bezier } from 'react-bootstrap-icons';

function Saveads2({handleEdit,handleDelete,job, removead}) {
    const value12 = useContext(UserContext);
    let history = useHistory();
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    
    return (
        <div class="jumbotron jumbotron-fluid">
            
                <div class="container">
                {value12.isadmin==="true"?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad As Admin</button>:null}
                    <h3 id="ccc2"  >{job.adtitle}</h3>
                    
                    
                    
                    <br></br>
                    {/*<a><strong>Ad Description:</strong> {job.addescription}</a><br></br>*/}
                    {job.Category==='Bike'?<a id="forpadding" style={{marginLeft:'18%'}}><strong></strong><Bezier /> {job.brand}</a>:<a id="forpadding"><strong>Bike Part:</strong> {job.BikePart}</a>}
                    {job.Category==='Bike'?<a id="forpadding"><strong><Calendar2MinusFill /> </strong> {job.Model}</a>:null}
                    <a id="forpadding"><strong>Condition:</strong> {job.condition}</a>
                    
                    
                    
                    <br></br>
                    <a style={{size:'12px'}} ><a href={'/profile/'+job.userid}>{job.username}</a></a><a style={{fontSize:"13px", marginLeft:'2%'}}>{job.date}</a>
                    <div style={{backgroundColor:'#fff591', width:'25%', textAlign:'center', float:'right'}}><a id="forpadding2"><strong></strong> RS. {job.price}</a><br></br></div>
                    
                    <button onClick={()=>{openad(job._id)}}style={{ marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><EyeFill/> View Ad</button>
                    {job.useremail===value12.email2?<button onClick={()=>{handleEdit(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success">Edit</button>:null}
                    {job.useremail===value12.email2?<button onClick={()=>{handleDelete(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger">Delete Ad</button>:null}
                    
                    <button onClick={()=>{removead(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success">Remove From Saved Ads</button>
                    
                    
                </div>
            </div>
    )
}

export default Saveads2
