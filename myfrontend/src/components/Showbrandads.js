import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {ArrowUpRightSquareFill,SaveFill, Save, EyeFill, Calendar2MinusFill, Bezier } from 'react-bootstrap-icons';
function Showbrandads() {
    const value12 = useContext(UserContext);
    const [ads, setads]=useState([])
    const [show, setShow] = useState(false);
    const [tempid, setTempid] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [update, setUpdate]=useState(0)
    let history = useHistory();
    let params = useParams();
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
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> {ads.length} {params.brand?params.brand:params.part} Results</h3>
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
            {ads.map(job=>(
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
                {value12.type=="Mechanic"?null:value12.islogged==="true"&&isinsavead(job._id)?<button style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><SaveFill/> Saved</button>:
                value12.islogged==="true"?<button onClick={()=>{savead(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-success"><Save/> Save Ad</button>:null}
                {value12.type=="Mechanic"||job.Category==='Bike'?null:value12.islogged==="true"&&value12.cart===job._id?<button onClick={()=>{removefromCart(job._id)}} style={{marginTop:"2%", width:'100%'}} type="button" class="btn btn-danger"><SaveFill/> Remove From Cart</button>:
                    value12.islogged==="true"&&job.useremail!==value12.email2?<button style={{marginTop:"2%", width:'100%'}} onClick={()=>{addToCart(job._id)}} type="button" class="btn btn-success"><Save/> Add To Cart</button>:null}
            </div>
        </div>
            ))}
        </div>
    )
}

export default Showbrandads
