import React, {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import {withRouter, useHistory} from "react-router-dom";
import {UserContext} from './UserContext'
import Saveads2 from './saveads2' 

function Savedads() {
    const [jobs, setJobs]=useState([])
    const value12 = useContext(UserContext);
    let history = useHistory();
    
    
    const getData=()=>{
        axios.get('http://localhost:5000/getjobs')
            .then(response => {
                setJobs(response.data);
                
                console.log("API got all reviews bro", response.data)
                var extracts=jobs;
                value12.favs.forEach(function(item, index, array) {
                    response.data.forEach(function(item2, index2, array) {
                        console.log(item," ",item2._id)
                        if(item===item2._id){
                            extracts.push(item2)
                        }
                    })
                })
                setJobs(extracts)
                console.log("Favorite Jobs To Be Displayed: ", extracts)
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
        
    }
    
    const handleDelete=(id)=>{
        console.log("fuckkk",id)
        axios.post('/deleteJob', {
            id: id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        console.log("Did it get")
        setJobs(jobs.filter(ad=>ad._id !== id))

    }
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
        

    }
    
    const removead=(id)=>{
        console.log("Ad ID: "+id+" User email:"+value12.email2)
        
        
        axios.post('/removesavead', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              console.log("Response after deletion of saved ad",response.data)
              setJobs(jobs.filter(job => job._id !== id))
              value12.updatefavs(response.data.favs1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          
    }
    useEffect(() => {
        if(value12.islogged==="true"){
            getData()

        }else{
            history.push('/')
        }
        
        
        
    }, [value12.email2])
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> {jobs.length}   Saved Ads</h3>
            {jobs.map(job=>(
                
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'40%', height:'40%',display:'inline-block', marginLeft:'5%'}}>
                <img style={{/*position:"absolute", left:"1%", marginTop:"0%"*/display:'inline-block', marginTop:'-7%'}} width="100%" height="300px" src={'/content/'+job.adimg}  ></img>
                <div class="container">
                <Saveads2 removead={removead} handleEdit={handleEdit} handleDelete={handleDelete} job={job}/>
                    
                </div>
            </div>
            
            ))}
        </div>
    )
}

export default withRouter(Savedads)
