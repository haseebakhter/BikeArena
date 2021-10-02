import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
import {SaveFill, Save, EyeFill, Calendar2MinusFill, Bezier } from 'react-bootstrap-icons';
import Font, { Text } from 'react-font'
import { withRouter, useHistory } from 'react-router-dom'; 
function Showprofileads({email, name}) {
    const [ads2, setads2]=useState([])
    const [update, setUpdate]=useState(0)
    let history = useHistory();
    const value12 = useContext(UserContext);
    const getData=()=>{
        console.log("profile: ", email)
        axios.get('http://localhost:5000/getjobs/'+email)
            .then(response => {
                setads2(response.data)
                console.log("API got all profile ads bro", response.data)
                console.log("ads are",ads2)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
        

    }
    const savead=(id)=>{
        console.log("Ad ID: "+id+" User email:"+value12.email2)
        
        
        axios.post('/savead', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
            value12.updatefavs(response.data.favs)
            setUpdate(update+1)
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          
    }
    const isinsavead=(id)=>{
        console.log("Ad ID: "+id+" Favs:"+value12.favs)
        var array1=value12.favs
        console.log(array1.includes(id))
        return array1.includes(id)

        
        
    }
    const handleDelete=(id)=>{
        console.log("fuckkk",id)
        axios.post('/deletead', {
            id: id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        console.log("Did it get")
        setads2(ads2.filter(ad=>ad._id !== id))

    }
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    useEffect(()=>{
        getData()
       
    

    },[update])
    return (
        <div>
            <Font family='Karantina'>
            <h1 style={{marginLeft:"40.0%", marginTop:"2%"}}>{name} Ads</h1>
            <h1 style={{borderTop:"1px solid", width:"178px", marginLeft:"41%", marginTop:"-9px"}}></h1>
            <h1 style={{borderTop:"1px solid", width:"120px", marginLeft:"43%"}}></h1>
            </Font>
            {ads2.map(job=>(
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'40%', height:'40%',display:'inline-block', marginLeft:'5%'}} >
                <img style={{/*position:"absolute", left:"1%", marginTop:"0%"*/display:'inline-block', marginTop:'-7%'}} width="100%" height="300px" src={'/content/'+job.adimg}  ></img>
                
            <div class="container" >
            
                
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
                {value12.islogged==="true"&&isinsavead(job._id)?<button style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><SaveFill/> Saved</button>:
                value12.islogged==="true"?<button onClick={()=>{savead(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><Save/> Save Ad</button>:null}
            </div>
        </div>
            ))}
        </div>
    )
}

export default Showprofileads
