import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {ArrowUpRightSquareFill,SaveFill, Save } from 'react-bootstrap-icons';
function Showbrandads() {
    const value12 = useContext(UserContext);
    const [ads, setads]=useState([])
    const [update, setUpdate]=useState(0)
    let history = useHistory();
    let params = useParams();
    const openad=(id)=>{
        history.push('/ad/'+id);
    }
    const getData=()=>{
        axios.get('http://localhost:5000/getjobs')
            .then(response => {
                if(params.brand){
                    setads(response.data.filter(ad=>ad.brand == params.brand));
                    console.log("API got all reviews bro", response.data.filter(ad=>ad.brand == params.brand))

                }else{
                    setads(response.data.filter(ad=>ad.BikePart == params.part));
                    console.log("API got all reviews bro", response.data.filter(ad=>ad.BikePart == params.part))

                }
                
                
                console.log("Favs: ",value12.favs)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    useEffect(()=>{
        if(params.brand){
            console.log("its brand")
            console.log(params.brand)

        }else{
            console.log("its part")
            console.log(params.part)
        }
        
        getData()
    

    },[update,params])
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
        setads(ads.filter(ad=>ad._id !== id))

    }
    const savead=(id)=>{
        console.log("Ad ID: "+id+" User email:"+value12.email2)
        
        
        axios.post('/savead', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              console.log(response.data.message)
              var favs2=value12.favs.filter(fav=>fav !== id)
              value12.updatefavs(response.data.favs)
              setUpdate(update+1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          
    }
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
    }
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> {ads.length} {params.brand?params.brand:params.part} Results</h3>
            {ads.map(job=>(
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}} >
                    <img style={{/*position:"absolute", left:"1%", marginTop:"0%"*/display:'inline-block', marginTop:'-7%'}} width="100" height="100" src={'/content/'+job.adimg}  ></img>
                <div class="container" style={{display:'inline-block'}}>
                
                    {job.useremail===value12.email2?<button onClick={()=>{handleEdit(job._id)}} style={{float:'right', marginLeft: "1%"}} type="button" class="btn btn-success">Edit</button>:null}
                    {job.useremail===value12.email2?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad</button>:null}
                    {value12.isadmin==="true"?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad As Admin</button>:null}
                    <h3 id="ccc2" onClick={()=>{openad(job._id)}} >Ad Title: {job.adtitle}</h3>
                    <a style={{fontSize:"13px"}}>{job.date}</a>
                    
                    
                    <br></br>
                    <a><strong>Ad Description:</strong> {job.addescription}</a><br></br>
                    {job.Category==='Bike'?<a id="forpadding"><strong>Brand:</strong> {job.brand}</a>:<a id="forpadding"><strong>Bike Part:</strong> {job.BikePart}</a>}
                    {job.Category==='Bike'?<a id="forpadding"><strong>Mileage:</strong> {job.Mileage}</a>:null}
                    {job.Category==='Bike'?<a id="forpadding"><strong>Model Year:</strong> {job.Model}</a>:null}
                    <a id="forpadding"><strong>Condition:</strong> {job.condition}</a>
                    <a id="forpadding2"><strong>Price:</strong> RS. {job.price}</a><br></br>
                    <a style={{size:'12px'}} > Posted by <a href='#' onClick={()=>{history.push('/profile/'+job.userid);}}>{job.username}</a></a>
                    {value12.islogged==="true"&&isinsavead(job._id)?<button style={{marginLeft:'88%'}} type="button" class="btn btn-success"><SaveFill/> Saved</button>:
                    value12.islogged==="true"?<button onClick={()=>{savead(job._id)}} style={{marginLeft:'88%'}} type="button" class="btn btn-success"><Save/> Save Ad</button>:null}
                    
                    
                </div>
            </div>
            ))}
        </div>
    )
}

export default Showbrandads
