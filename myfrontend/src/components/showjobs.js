import React, { useState, useEffect, useContext } from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import {UserContext} from './UserContext'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Slideshow from './Slideshow'
import { brands } from "./brands.js";
import { years } from "./years.js";
import Font, { Text } from 'react-font'
import { cities } from "./cities.js";
import {ArrowUpRightSquareFill,SaveFill, Save, Trash2Fill, EyeFill, PenFill, Calendar2MinusFill, Bezier, GeoAltFill, ChatDots, CartCheckFill } from 'react-bootstrap-icons';
import './mycss.css'
import "bootstrap/dist/css/bootstrap.min.css";
function ShowJobs() {
    const [ads, setads]=useState([])
    const [ads2, setads2]=useState([])
    const [ads3, setads3]=useState([])
    const [update, setUpdate]=useState(0)
    const [option, setOption]=useState('All')
    const [option2, setOption2]=useState('')
    const [show, setShow] = useState(false);
    const [tempid, setTempid] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [selectedOption4, setSelectedOption4] = useState(null);
    const [pricerange, setPricerange]=useState(10000000)
    const adfilter =['Category','All','Bike','Part']
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const value12 = useContext(UserContext);
    const handleClose2 = () => {
        axios.post('/addtocart', {
            useremail:value12.email2,
            id:tempid
          })
          .then(function (response) {
              console.log(response.data)
              value12.updatecart(tempid)
              setShow(false);
              setUpdate(update+1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        

    }
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
        if(adfilte=="Category"){
            return
        }
        setOption(adfilte)
        setOption2('')
        adfilte=='All'?setSelectedOption2(null):setSelectedOption2(adfilte)
        console.log("setting: ", adfilte)
        if(!pricerange){
            if(adfilte=='All'){
                selectedOption3?setads2(ads.filter(ad=>ad.city==selectedOption3)):setads2(ads)
            }else{
                selectedOption3?setads2(ads.filter(ad=>ad.Category == adfilte&&ad.city==selectedOption3)):setads2(ads.filter(ad=>ad.Category == adfilte))
            }
            

        }else{
            if(adfilte=='All'){
                selectedOption3?setads2(ads.filter(ad=>ad.price <= pricerange&&ad.city==selectedOption3)):setads2(ads.filter(ad=>ad.price <= pricerange))
            }else{
                selectedOption3?setads2(ads.filter(ad=>ad.Category == adfilte&&ad.price <= pricerange&&ad.city==selectedOption3)):setads2(ads.filter(ad=>ad.Category == adfilte&&ad.price <= pricerange))
            }

        }
        
        
    }
    const handleChange2=(brandfilte) =>{
        if(brandfilte=="Brands"){
            return
        }
        setOption2(brandfilte)
        brandfilte=='All'?setSelectedOption4(null):setSelectedOption4(brandfilte)
        if(!pricerange){
            if(option2==brandfilte){
                setOption2('')
                selectedOption3?setads2(ads3.filter(ad=>ad.Category == 'Bike'&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.Category == 'Bike'))
                return
            }
            selectedOption3?setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.Category == 'Bike'&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.Category == 'Bike'))
            
            

        }else{
            if(brandfilte=='All'){
                setOption2('')
                selectedOption3?setads2(ads3.filter(ad=>ad.Category == 'Bike'&&ad.price <= pricerange&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.Category == 'Bike'&&ad.price <= pricerange))
                return
            }
            selectedOption3?setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.price <= pricerange&&ad.Category == 'Bike'&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.brand == brandfilte&&ad.price <= pricerange&&ad.Category == 'Bike'))
            

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
              console.log(response.data)
              var favs2=value12.favs.filter(fav=>fav !== id)
              value12.updatefavs(response.data.favs)
              setUpdate(update+1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          
    }
    const onChangeValue=(event)=> {
        console.log(event.target.value, "option i.e type: ", option, "option2 i.e brand: ", option2)
        setPricerange(event.target.value)
        if(option=='All'){
            if(!event.target.value){
                console.log("empty value")
                selectedOption3?setads2(ads.filter(ad=>ad.city==selectedOption3)):setads2(ads)
            }else{
                console.log("Filtering results to price: ",event.target.value )
                selectedOption3?setads2(ads.filter(ad=>ad.price <= event.target.value&&ad.city==selectedOption3)):setads2(ads.filter(ad=>ad.price <= event.target.value))

            }
            
        }else{
            console.log( "option i.e type: ", option, "option2 i.e brand: ", option2)
            if(option=='Bike'&&option2!=''){
                
                if(!event.target.value){
                    
                    console.log("Category: ",option," Brand: ",option2)
                    selectedOption3?setads2(ads3.filter(ad=>ad.Category == option&&ad.brand == option2&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.Category == option&&ad.brand == option2))
    
                }else{
                    console.log("Category2: ",option," Brand2: ",option2)
                    console.log("Filtering results to price: ",event.target.value )
                    selectedOption3?setads2(ads3.filter(ad=>ad.Category == option&&ad.price <= event.target.value&&ad.brand == option2&&ad.city==selectedOption3)):setads2(ads3.filter(ad=>ad.Category == option&&ad.price <= event.target.value&&ad.brand == option2))
    
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
    
    const handleCities=(city) =>{
        if(city=="Cities"){
            return
        }
        console.log("Selected City: ",city)
        console.log("selectedOption2",selectedOption2," selectedOption3: ",city, "selectedOption4: ",selectedOption4)
        if(city=='All'){
            setSelectedOption3(null)
            if(selectedOption2){
                if(selectedOption4){
                    console.log("Category and Brand selected already")
                    setads2(ads3.filter(ad=>ad.Category == selectedOption2&&ad.brand == selectedOption4))
                }else{
                    console.log("Category selected already")
                    setads2(ads3.filter(ad=>ad.Category == selectedOption2))
                }
            }else{

                if(selectedOption4){
                    console.log("Only Brand selected already")
                    setads2(ads3.filter(ad=>ad.brand == selectedOption4))
                }else{
                    console.log("Nothng Selected")
                    setads2(ads3)
                }
    
            }
        }else{
            setSelectedOption3(city)
            if(selectedOption2){
                if(selectedOption4){
                    console.log("Only Category,Brand,city selected already")
                    setads2(ads3.filter(ad=>ad.Category == selectedOption2&&ad.brand == selectedOption4&&ad.city == city))
                }else{
                    console.log("Only Category,city selected already")
                    setads2(ads3.filter(ad=>ad.Category == selectedOption2&&ad.city == city))
                }
            }else{
                if(selectedOption4){
                    console.log("Only Brand,city selected already")
                    setads2(ads3.filter(ad=>ad.brand == selectedOption4&&ad.city == city))
                }else{
                    console.log("Only city selected already")
                    setads2(ads3.filter(ad=>ad.city == city))
                }
    
            }
        }
        
        //setads2(ads3.filter(ad=>option?ad.Category == option:null&&option2&&option=="Bike"?ad.brand == option2:null))
    
        
    }
    const addToCart=(id)=>{
        if(value12.cart){
            setTempid(id)
            setShow(true)
        }else{
            axios.post('/addtocart', {
                useremail:value12.email2,
                id:id
              })
              .then(function (response) {
                  console.log(response.data)
                  value12.updatecart(id)
                  setUpdate(update+1)
                  
              })
              .catch(function (error) {
                console.log('Error is ',error);
              });

        }
        
        
    }
    const removefromCart=(id)=>{
        axios.post('/removefromcart', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              console.log(response.data)
              value12.updatecart(null)
              setUpdate(update+1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
        
    }
    return (
        <div>
             <div style={{backgroundColor:'#C00000', alignContent:'center', marginBottom:'0.5%'}}>
            <Font family='Karantina'>
                <h1 style={{color:'#F7B32D', textAlign:'center', fontSize:'70px'}}>Bike Arena</h1>
                <a style={{color:'#F8F9FC', marginLeft:'41.7%', fontSize:'50px'}}>Sell and Purchase</a>
            </Font>    
            </div>
            {value12.islogged==="true"?<Button onClick={openPostad} style={{marginLeft: '42.5%',  backgroundColor: '#E52D27', MarginTop:'1%'}} ><ArrowUpRightSquareFill/> Post bike ad</Button>:value12.isadmin==="true"?null:<Button href="/sign-in" style={{marginLeft: '36%',  backgroundColor: '#E52D27'}} ><ArrowUpRightSquareFill/> Click Here To Login So You Can Post Ads</Button>}
            <Button href={'/chatwithus'} style={{marginLeft: '42.5%', marginTop:'2%',  backgroundColor: '#E52D27'}} ><ChatDots /> Chat With Us</Button>
            <div>
            <Slideshow />
            </div>
            
            <div style={{marginTop:'2%'}}>
            <Font family='Karantina'>
            <h1 style={{marginLeft:"43.5%", marginTop:"2%"}}>Fresh Ads</h1>
            <h1 style={{borderTop:"1px solid", width:"178px", marginLeft:"41%", marginTop:"-9px"}}></h1>
            <h1 style={{borderTop:"1px solid", width:"120px", marginLeft:"43%"}}></h1>
            </Font>
            
            
            <div style={{backgroundColor:'#E52D27'}} >
                <div class="select" style={{display:'inline-block', marginLeft:'20%'}} >
                <Font family='Raleway'>
                    <select  name="Adtypes" value={selectedOption2} style={{backgroundColor:'#204969', color:'#fff7f7', paddingRight:'20%', width:'180%', fontSize:'200%'}} onChange={(e)=>handleChange(e.target.value)} >
                        {adfilter.map(adfilte=> <option style={{color:'#fff7f7'}} value={adfilte}>{adfilte}</option>)}
                    </select>
                </Font>
                </div>
                <div class="select" style={{display:'inline-block', marginLeft:'10%'}}>
                <Font family='Raleway'>
                    <select name="Cities" value={selectedOption3} style={{backgroundColor:'#204969', color:'#fff7f7', paddingRight:'20%', width:'100%', fontSize:'200%'}} onChange={(e)=>{handleCities(e.target.value)}} >
                        <option value='Cities'>Cities</option>
                        {cities.map(city=> <option value={city}>{city}</option>)}
                    </select>
                </Font>
                </div>
                {option=='Bike'?<div class="select" style={{display:'inline-block', marginLeft:'10%'}}>
                <Font family='Raleway'>
                    <select name="brands" value={selectedOption4} style={{backgroundColor:'#204969', color:'#fff7f7', paddingRight:'20%', width:'100%', fontSize:'200%'}} onChange={(e)=>{handleChange2(e.target.value)}}>
                        <option value='Brands'>Brands</option>
                        <option value='All'>All</option>
                        {brands.map(brand=> <option value={brand}>{brand}</option>)}
                    </select>
                </Font>
                </div>:null}
            </div>
            <a style={{marginLeft:"82%"}}><strong>0 To </strong></a><input type="text" onChange={onChangeValue} name="search" placeholder="Price range" style={{fontSize:"15px",height:"40px", borderRadius:"4px", padding:"13px 12px"}}></input>
            <br></br>
            <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Already An Item In Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Want To Remove That Item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
            {ads2.map(job=>(
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'40%', height:'40%',display:'inline-block', marginLeft:'5%'}} >
                    <img style={{/*position:"absolute", left:"1%", marginTop:"0%"*/display:'inline-block', marginTop:'-7%'}} width="100%" height="300px" src={'/content/'+job.adimg}  ></img>
                    
                <div class="container" >
                
                    
                    {value12.isadmin==="true"?<button onClick={()=>{handleDelete(job._id)}} style={{float:'right'}} type="button" class="btn btn-danger"> Delete Ad As Admin</button>:null}
                    <h3 id="ccc2"  >{job.adtitle}</h3>
                    <a style={{marginLeft:'43%'}}><GeoAltFill /> {job.city}</a>
                    
                    
                    <br></br>
                    {/*<a><strong>Ad Description:</strong> {job.addescription}</a><br></br>*/}
                    {job.Category==='Bike'?<a id="forpadding" style={{marginLeft:'18%'}}><strong></strong><Bezier /> {job.brand}</a>:<a id="forpadding"><strong>Bike Part:</strong> {job.BikePart}</a>}
                    {job.Category==='Bike'?<a id="forpadding"><strong><Calendar2MinusFill /> </strong> {job.Model}</a>:null}
                    <a id="forpadding"><strong>Condition:</strong> {job.condition}</a>
                    
                    
                    
                    <br></br>
                    <a style={{size:'12px'}} ><a href={'/profile/'+job.userid}>{job.username}</a></a><a style={{fontSize:"13px", marginLeft:'2%'}}>{job.date}</a>
                    <div style={{backgroundColor:'#fff591', width:'25%', textAlign:'center', float:'right'}}><a id="forpadding2"><strong></strong> RS. {job.price}</a><br></br></div>
                    
                    <button onClick={()=>{openad(job._id)}}style={{ marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><EyeFill/> View Ad</button>
                    {job.useremail===value12.email2?<button onClick={()=>{handleEdit(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><PenFill /> Edit</button>:null}
                    {job.useremail===value12.email2?<button onClick={()=>{handleDelete(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><Trash2Fill /> Delete Ad</button>:null}
                    {value12.type=="Mechanic"?null:value12.islogged==="true"&&isinsavead(job._id)?<button style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><SaveFill/> Saved</button>:
                    value12.islogged==="true"?<button onClick={()=>{savead(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><Save/> Save Ad</button>:null}
                    {value12.type=="Mechanic"||job.Category==='Bike'||job.issold?null:value12.islogged==="true"&&value12.cart===job._id?<button onClick={()=>{removefromCart(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><SaveFill/> Remove From Cart</button>:
                    value12.islogged==="true"&&job.useremail!==value12.email2?<button style={{marginTop:"2%", width:'100%'}} onClick={()=>{addToCart(job._id)}} type="button" class="btn btn-success"> <CartCheckFill size={40}/></button>:null}
                    {job.issold?<button style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"> Sold</button>:null}
                </div>
                
            </div>
            ))}
            </div>
            
            

            
            
        </div>
    )
}

export default ShowJobs
