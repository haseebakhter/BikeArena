import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import ProfileDetails from './ProfileDetails'
import {UserContext} from './UserContext'
import ReactPlayer from 'react-player'
import Font, { Text } from 'react-font'
import Carousel from 'react-bootstrap/Carousel'
import { PersonFill } from 'react-bootstrap-icons';
import Fade from 'react-reveal/Fade';
import './mycss.css'
function Addetails() {
    let params = useParams();
    const [ad, setAd]=useState(null)
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [isaddetail, setIsaddetail] = useState(true)
    const value12 = useContext(UserContext);
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
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
                setId(response.data._id)
                
                
                
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
    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        }
      ];
      if(ad==null){
        return(<div class="jumbotron jumbotron-fluid"><div class="container">
          <h1>Ad Loading...</h1>
        </div>

        </div>)

      }else{
        return (
          <div>
              <div class="jumbotron jumbotron-fluid">
                  <div class="container">
                      
                      <h3 id="ccc2" >Ad Title: {ad.adtitle}</h3>
                      {ad.useremail===value12.email2?<button onClick={()=>{handleEdit(ad._id)}} style={{float:'right'}} type="button" class="btn btn-success">Edit</button>:null}
                      {ad.useremail===value12.email2?<button onClick={()=>{handleDelete(ad._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad</button>:null}
                      {value12.isadmin==="true"?<button onClick={()=>{handleDelete(ad._id)}} style={{float:'right'}} type="button" class="btn btn-danger">Delete Ad As Admin</button>:null}
                      <a style={{fontSize:"13px",textDecoration:'underline'}}>{ad.date}</a>
                      
                      
                      <br></br>
                      <br></br>
                      <a id="postforpadding"><strong>Ad Description:</strong> {ad.addescription}</a><br></br><br></br>
                      
                      {ad.Category==='Bike'?<a id="postforpaddingsamelinefirst"><strong>Brand:</strong> {ad.brand}</a>:<a id="postforpadding"><strong>Bike Part:</strong> {ad.BikePart}</a>}
                      {ad.Category==='Bike'?<a id="postforpaddingsameline"><strong>Mileage:</strong> {ad.Mileage}</a>:null}
                      {ad.Category==='Bike'?<a id="postforpaddingsameline"><strong>Model Year:</strong> {ad.Model}</a>:null}
                      <a id="postforpaddingsameline"><strong>Condition:</strong> {ad.condition}</a>
                      <a id="postforpadding2"><strong>Price:</strong> RS. {ad.price}</a><br></br><br></br>
                      <a id="postforpaddingposted" > Posted by <a href='#' onClick={()=>{history.push('/profile/'+ad.userid);}}><PersonFill /> {ad.username}</a></a>
                      {value12.islogged==="true"&&isinsavead(ad._id)?<button style={{position:'absolute',left:'82%'}} type="button" class="btn btn-success">Saved</button>:
                      value12.islogged==="true"?<button onClick={()=>{savead(ad._id)}} style={{position:'absolute',left:'85%'}} type="button" class="btn btn-success">Save Ad</button>:null}
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
                  <div style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", marginTop:'2%'}}>
              <Carousel style={{height:"30%", width:"60%", marginLeft:"20%"}} activeIndex={index} onSelect={handleSelect}>
        {ad.adimg?<Carousel.Item>
          <img
            className="d-block w-100"
            src={'/content/'+ad.adimg}
            alt="First slide"
            style={{height:"400px", width:"800px"}}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>:null}
        {ad.adimg2?<Carousel.Item>
          <img
            className="d-block w-100"
            src={'/content/'+ad.adimg2}
            alt="Second slide"
            style={{height:"400px", width:"800px"}}
          />
  
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>:null}
        {ad.adimg3?<Carousel.Item>
          <img
            className="d-block w-100"
            src={'/content/'+ad.adimg3}
            alt="Third slide"
            style={{height:"400px", width:"800px"}}
          />
  
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>:null}
        {ad.adimg4?<Carousel.Item>
          <img
            className="d-block w-100"
            src={'/content/'+ad.adimg4}
            alt="Third slide"
            style={{height:"400px", width:"800px"}}
          />
  
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>:null}
      </Carousel>
    <h2 style={{marginLeft:'45%', backgroundColor:'#C00000',color:'#F7B32D', width:'10%',borderRadius: "25%", marginTop:'0.8%'}}>Gallery</h2>
      </div>
                      
                      
                      
                  </div>
              </div>
              <div style={{ backgroundColor:'#fff591'}}>
              <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}>    Seller Details</h3>
              <ProfileDetails isaddetail={isaddetail} name={name} email={email} id={id} address={address}/>
              </div>
          </div>
      )

      }
    
}

export default Addetails
