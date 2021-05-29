import React, { useState, useEffect, useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import {UserContext} from './UserContext'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Slideshow from './Slideshow'
import { brands } from "./brands.js";
import { years } from "./years.js";
import {ArrowUpRightSquareFill,SaveFill, Save } from 'react-bootstrap-icons';
import './mycss.css'
import "bootstrap/dist/css/bootstrap.min.css";
function ShowJobs() {
    const [ads, setads]=useState([])
    const [ads2, setads2]=useState([])
    const [ads3, setads3]=useState([])
    const [update, setUpdate]=useState(0)
    const [option, setOption]=useState('All')
    const [option2, setOption2]=useState('')
    const [pricerange, setPricerange]=useState(10000000)
    const adfilter =['All','Bike','Part']
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const value12 = useContext(UserContext);
    
    const getData=()=>{
        axios.get('http://localhost:5000/getjobs')
            .then(response => {
                setads(response.data);
                setads2(response.data)
                setads3(response.data)
                console.log("API got all reviews bro", response.data)
                console.log("Favs: ",value12.favs)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
        console.log("our useremail/islogged in showjobs", value12.email2,value12.islogged, value12.test)

    }
    useEffect(()=>{
        getData()
    

    },[update])
    const handleChange=(adfilte) =>{
        setOption(adfilte)
        setOption2('')
        if(!pricerange){
            if(adfilte=='All'){
                setads2(ads)
            }else{
                setads2(ads.filter(ad=>ad.Category == adfilte))
            }
            

        }else{
            if(adfilte=='All'){
                setads2(ads.filter(ad=>ad.price <= pricerange))
            }else{
                setads2(ads.filter(ad=>ad.Category == adfilte&&ad.price <= pricerange))
            }

        }
        
        
    }
    const handleChange2=(brandfilte) =>{
        setOption2(brandfilte)
        
        if(!pricerange){
            if(option2==brandfilte){
                setOption2('')
                setads2(ads3.filter(ad=>ad.Category == 'Bike'))
                return
            }
                setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.Category == 'Bike'))
            
            

        }else{
            if(option2==brandfilte){
                setOption2('')
                setads2(ads3.filter(ad=>ad.Category == 'Bike'&&ad.price <= pricerange))
                return
            }
                setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.price <= pricerange&&ad.Category == 'Bike'))
            

        }
        
        
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
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
        

    }
    const openad=(id)=>{
        history.push('/ad/'+id);
        

    }
    const openPostad=()=>{
        history.push('/addbikead');
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
    const onChangeValue=(event)=> {
        console.log(event.target.value)
        setPricerange(event.target.value)
        if(option=='All'){
            if(!event.target.value){
                console.log("empty value")
                setads2(ads)

            }else{
                setads2(ads.filter(ad=>ad.price <= event.target.value))

            }
            
        }else{
            if(option=='Bike'&&option2!=''){
                
                if(!event.target.value){
                    
                    console.log("Category: ",option," Brand: ",option2)
                    setads2(ads3.filter(ad=>ad.Category == option&&ad.brand == option2))
    
                }else{
                    console.log("Category2: ",option," Brand2: ",option2)
                    
                    setads2(ads3.filter(ad=>ad.Category == option&&ad.price <= event.target.value&&ad.brand == option2))
    
                }

            }
            /*if(!event.target.value){
                setads2(ads.filter(ad=>ad.Category == option))

            }else{
                setads2(ads.filter(ad=>ad.Category == option&&ad.price <= event.target.value))

            }*/
            
        }
        
      }
    const isinsavead=(id)=>{
        console.log("Ad ID: "+id+" Favs:"+value12.favs)
        var array1=value12.favs
        console.log(array1.includes(id))
        return array1.includes(id)

        
        
    }
    return (
        <div>
            {value12.islogged==="true"?<Button onClick={openPostad} style={{marginLeft: '42.5%',  backgroundColor: '#E52D27'}} ><ArrowUpRightSquareFill/> Post bike ad</Button>:value12.isadmin==="true"?null:<Button href="/sign-in" style={{marginLeft: '36%',  backgroundColor: '#E52D27'}} ><ArrowUpRightSquareFill/> Click Here To Login So You Can Post Ads</Button>}
            <div>
            <Slideshow />
            </div>
            
            <div style={{marginTop:'2%'}}>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}>   Fresh Ads <i class="bi bi-person-circle"></i></h3>
            {adfilter.map(adfilte=>(
                <button
                type="button"
                className="btn toggle-btn"
                
                style={{backgroundColor: adfilte===option?'#4CAF50':null , border:'2px solid #6F020A', width:"11%", marginLeft:adfilte==='All'?null:"17%"}}
                onClick={()=>{handleChange(adfilte)}}
              >
                <span>{adfilte}</span>
              </button>
              
            ))}
            
            <a style={{marginLeft:"15%"}}><strong>0 To </strong></a><input type="text" onChange={onChangeValue} name="search" placeholder="Price range" style={{fontSize:"15px",height:"40px", borderRadius:"4px", padding:"13px 12px"}}></input>
            
            <br></br>
            {option=='Bike'?brands.map(brand=>(
                <button
                type="button"
                className="btn toggle-btn"
                
                style={{backgroundColor: brand===option2?'#4CAF50':null , border:'2px solid #6F020A'}}
                onClick={()=>{handleChange2(brand)}}
              >
                <span>{brand}</span>
              </button>
              
            )):null}
            <br></br>
            {ads2.map(job=>(
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
            
            

            
            
        </div>
    )
}

export default ShowJobs
