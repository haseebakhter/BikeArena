import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {UserContext} from './UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './mycss.css'
import Showprofileads from './showprofileads'
import { Button,Jumbotron } from 'react-bootstrap';
import {TelephoneFill, ChatFill } from 'react-bootstrap-icons';

function MechanicProfile({email2}) {
    const value12 = useContext(UserContext);
    let params = useParams();
    let history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [test, setTest] = useState()
    const [city, setCity] = useState([])
    const [startinghours, setStartinghours] = useState([])
    const [endinghours, setEndinghours] = useState([])
    const [town, setTown] = useState("")
    const [proficpic, setProficpic] = useState("")
    const [phoneno, setPhoneno] = useState("")
    const [profileID, setProfileID] = useState("")
    const [showWhich, setShowWhich] = useState("profile")
    
    const getProfile=(id)=>{
        axios.get('http://localhost:5000/mechanic/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setName(response.data.firstname+' '+response.data.lastname)
                setEmail(response.data.email)
                setTown(response.data.town)
                setStartinghours(response.data.startinghours)
                setEndinghours(response.data.endinghours)
                setCity(response.data.city)
                setProficpic(response.data.propic)
                setPhoneno(response.data.phoneno)
                setProfileID(response.data._id)
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getConversation=()=>{
        console.log(params.id," ",value12.userid)
        axios.get('http://localhost:5000/getConversation/'+params.id+'/'+value12.userid)
            .then(response => {
                console.log("Converation data: ",response.data)
                if(response.data){
                    history.push('/conversation/'+response.data._id)
                }else{
                    const converInfo={
                        receiverId: value12.userid,
                        senderId:profileID
                    }
                    axios.post('/newConversation', converInfo)
                      .then(function (response) {
                          console.log(response.data)
                          history.push('/conversation/'+response.data._id)
                          
                      })
                      .catch(function (error) {
                        console.log('Error is ',error);
                      });
                }
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
            
    }
    
    
    const showFR=(string)=>{
        setShowWhich(string)
        console.log(string)
    }
    
    
    
    useEffect(() => {
        console.log("We opening profile"+ params.id+"Logged user email: "+value12.email2)
        var ret = params.id.replace('profile','');
        console.log(ret);
        getProfile(ret)
        
    }, [test,params])
    
   

        return (
        
            <div style={{alignItems: 'center',justifyContent: 'center'}} >
            <div style={{textAlign: 'center'}}><img width="100" height="100" src={'/content/'+proficpic} ></img></div>
            <h1 style={{textAlign:'center'}}>{name}</h1>
            <h1 style={{textAlign:'center', backgroundColor:'#ffad60', width:'17%', marginLeft:'42%', borderRadius:'14%'}}>Mechanic</h1>
            <h1 style={{textAlign:'center', width:'25%', marginLeft:'37%'}}><TelephoneFill /> {phoneno}</h1>
            <Button onClick={()=>getConversation()} style={{marginLeft:'48.5%',backgroundColor: '#11204D' }}><ChatFill /> </Button>
            <br/>
            <br/>
            <div style={{borderLeft: '6px solid #1423A4',backgroundColor: '#088190'}}>
            <Button onClick={()=>showFR("profile")} style={{marginLeft:'47%',display:'inline-block',backgroundColor: '#11204D' }}>Profile </Button>
            </div>
            {showWhich==="profile"
            ?<div style={{alignItems: 'center',justifyContent: 'center'}}>
            <h1>{name} Profile Details</h1>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Mechanic Name:</a><a style={{fontSize:"30px"}}> {name}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Email:</a><a style={{fontSize:"30px"}}> {email}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Town:</a><a style={{fontSize:"30px"}}> {town}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>City:</a><a style={{fontSize:"30px"}}> {city}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Starting Hours:</a><a style={{fontSize:"30px"}}> {startinghours}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Ending Hours:</a><a style={{fontSize:"30px"}}> {endinghours}</a><br/>
            </div>
            :null}
            
            
        </div>
    )

    
    
}

export default MechanicProfile
