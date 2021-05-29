import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import ProfileDetails from './ProfileDetails'
import {UserContext} from './UserContext'
import ReactPlayer from 'react-player'
import './mycss.css'
function Addetails() {
    let params = useParams();
    const [ad, setAd]=useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [isaddetail, setIsaddetail] = useState(true)
    const value12 = useContext(UserContext);
    let history = useHistory();
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
          history.push('/')

    }
    const getSellerdetails=(emaill)=>{
        axios.get('http://localhost:5000/changeaccountsetting/'+emaill)
            .then(response => {
                setName(response.data.firstname+' '+response.data.lastname)
                setEmail(emaill)
                setAddress(response.data.address)
                
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const getJob=(id)=>{
        axios.get('http://localhost:5000/ad/'+id)
            .then(response => {
                console.log(response.data)
                setAd(response.data)
                getSellerdetails(response.data.useremail)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const handleEdit=(id)=>{
        history.push('/edit/'+id);
        

    }
    useEffect(() => {
        console.log("We showing ad"+ params.id)
        getJob(params.id)
    }, [])
    const savead=(id)=>{
        console.log("Ad ID: "+id+" User email:"+value12.email2)
        
        
        axios.post('/savead', {
            useremail:value12.email2,
            id:id
          })
          .then(function (response) {
              console.log(response.data.message)
              
              value12.updatefavs(response.data.favs)
              
              
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
    return (
        <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    {ad.useremail===value12.email2?<button onClick={()=>{handleEdit(ad._id)}} style={{float:'right'}} type="button" class="btn btn-success">Edit</button>:null}
                    {ad.useremail===value12.email2?<button onClick={()=>{handleDelete(ad._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad</button>:null}
                    {value12.isadmin==="true"?<button onClick={()=>{handleDelete(ad._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad As Admin</button>:null}
                    <h3 id="ccc2" >Ad Title: {ad.adtitle}</h3>
                    <a style={{fontSize:"13px"}}>{ad.date}</a>
                    <img style={{position:"absolute", left:-7}} width="100" height="100" src={'/content/'+ad.adimg}  ></img>
                    
                    <br></br>
                    <a><strong>Ad Description:</strong> {ad.addescription}</a><br></br>
                    {ad.Category==='Bike'?<a id="forpadding"><strong>Brand:</strong> {ad.brand}</a>:<a id="forpadding"><strong>Bike Part:</strong> {ad.BikePart}</a>}
                    {ad.Category==='Bike'?<a id="forpadding"><strong>Mileage:</strong> {ad.Mileage}</a>:null}
                    {ad.Category==='Bike'?<a id="forpadding"><strong>Model Year:</strong> {ad.Model}</a>:null}
                    <a id="forpadding"><strong>Condition:</strong> {ad.condition}</a>
                    <a id="forpadding2"><strong>Price:</strong> RS. {ad.price}</a><br></br>
                    <a style={{size:'12px'}} > Posted by <a href='#' onClick={()=>{history.push('/profile/'+ad.userid);}}>{ad.username}</a></a>
                    {value12.islogged==="true"&&isinsavead(ad._id)?<button style={{position:'absolute',left:'82%'}} type="button" class="btn btn-success">Saved</button>:
                    value12.islogged==="true"?<button onClick={()=>{savead(ad._id)}} style={{position:'absolute',left:'82%'}} type="button" class="btn btn-success">Save Ad</button>:null}
                    {ad.advideo!=null?
                    <div className='player-wrapper'>
                    <ReactPlayer
                    className='react-player'
                    url={'/content/'+ad.advideo}
                    width='600px'
                    height='400px'
                    controls={true}
                    />
                </div>:null}
                    
                    
                    
                </div>
            </div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}>    Seller Details</h3>
            <ProfileDetails isaddetail={isaddetail} name={name} email={email} address={address}/>
        </div>
    )
}

export default Addetails
