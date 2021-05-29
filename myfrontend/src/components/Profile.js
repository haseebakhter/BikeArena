import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {UserContext} from './UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './mycss.css'
import Showprofileads from './showprofileads'
import { Button,Jumbotron } from 'react-bootstrap';
import ProfileDetails from './ProfileDetails'
import Profilecart from './Profilecart';
function Profile({email2}) {
    const value12 = useContext(UserContext);
    let params = useParams();
    let history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [test, setTest] = useState()
    const [banned, setBanned] = useState("")
    const [profileads, setProfileads] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [address, setAddress] = useState("")
    const [proficpic, setProficpic] = useState("")
    const [showWhich, setShowWhich] = useState("profile")
    const [profilestatus, setProfilestatus] = useState("Not Anything")
    const getFF=(id)=>{
        axios.get('http://localhost:5000/'+id)
            .then(response => {
                console.log("Getting Following/Followers: ",response.data)
                
                setFollowers(response.data.followers)
                setFollowing(response.data.following)
                
                
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getProfile=(id)=>{
        axios.get('http://localhost:5000/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setName(response.data.firstname+' '+response.data.lastname)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setBanned(response.data.isbanned)
                setProficpic(response.data.propic)
                setFollowers(response.data.followers)
                setFollowing(response.data.following)
                if(value12.email2==="Login"){
                    setProfilestatus('')
                }else{
                    getLUFL(response.data.email)
                    getFF(id)
                }
                
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    
    const getLUFL=(emaill)=>{
        axios.get('http://localhost:5000/changeaccountsetting/'+email2)
            .then(response => {
                console.log("Logged User Info: ",response.data)
                console.log("Checking if "+emaill+" is in LU array")
                if (emaill===response.data.email){
                    setProfilestatus("My Profile")
                    console.log("Profile status is:My Profile")
                }
                if (response.data.following.includes(emaill)){
                    console.log("Following")
                    setProfilestatus("Following")
                    console.log("Profile status is in Following")

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
    const handleClick=async()=>{
        console.log("Lets do work "+profilestatus)
        
        
        
        const URL = "http://localhost:5000/handlefriendbutton";
        var data2 ={
            Pemail: email,
            LUemail2: email2,
            profilestatus: profilestatus
            
        }
        
        
        
        await axios.post(URL,data2)
            .then((response) => {
                /*console.log("Button click response from backend", response.data)
                console.log("We opening profile"+ params.id+"Logged user email: "+value12.email2)
                var ret = params.id.replace('profile','');
                console.log(ret);
                getFF(ret)*/
                console.log(response.data)
                if(profilestatus=="Not Anything"){
                    var index=value12.following.length
                    var newvalues=value12.following
                    console.log("new values1",newvalues)
                    newvalues[index]=email
                    console.log("new values2",newvalues,"Index: ", index)
                    
                    value12.updatefollowing(newvalues)
                    

                }else{
                    value12.updatefollowing(value12.following.filter(follow=>follow !== email))

                }
                setTest(test+1)
            }).catch((error) => {
        });
        
        
        
        
        if(profilestatus==="Following"){
            setProfilestatus("Not Anything")
        }
        if(profilestatus==="Not Anything"){
            setProfilestatus("Following")
        }
    }
    const handleBan=(id)=>{
        console.log("fuckkk",id)
        axios.post('/banuser', {
            useremail: email
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          setBanned(true)

    }
    const handleUnBan=(id)=>{
        console.log("fuckkk",id)
        axios.post('/unbanuser', {
            useremail: email
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          setBanned(false)
        

    }
    useEffect(() => {
        console.log("We opening profile"+ params.id+"Logged user email: "+value12.email2)
        var ret = params.id.replace('profile','');
        console.log(ret);
        getProfile(ret)
        
    }, [test,params])
    
    if(banned){
        return (
            <div style={{alignItems: 'center',justifyContent: 'center'}} >
            <div style={{textAlign: 'center'}}><img width="100" height="100" src={'/content/'+proficpic} ></img></div>
            <h1 style={{textAlign:'center'}}>{name} is banned by admin</h1>
            {value12.isadmin==="true"?<div id="ccc4"><button onClick={()=>{handleUnBan(email)}} type="button" class="btn btn-danger">UnBan User As Admin</button></div>:null}
            
            
        </div>

        )

    }else{
        return (
        
            <div style={{alignItems: 'center',justifyContent: 'center'}} >
            <div style={{textAlign: 'center'}}><img width="100" height="100" src={'/content/'+proficpic} ></img></div>
            <h1 style={{textAlign:'center'}}>{name}</h1>
            
            {value12.email2==="Login"||profilestatus==="My Profile"?null
            :profilestatus==="Not Anything"?
            <div id="ccc" onClick={handleClick}><div id="confirm">Follow</div></div>
            :profilestatus==="Following"?
            <div id="ccc" onClick={handleClick}><div id="confirm2">Unfollow</div></div>
            :null}
            {value12.isadmin==="true"?<div id="ccc3"><button style={{marginTop:"20px"}}onClick={()=>{handleBan(email)}}  type="button" class="btn btn-danger">Ban User As Admin</button></div>:null}
            
            <br/>
            <br/>
            <div style={{borderLeft: '6px solid #1423A4',backgroundColor: '#088190'}}>
            <Button onClick={()=>showFR("profile")} style={{marginLeft:'10%',display:'inline-block',backgroundColor: '#11204D' }}>Profile </Button>
            <Button onClick={()=>showFR("myads")} style={{position:'relative',left:'10%',display:'inline-block', backgroundColor: '#11204D' }}>{name} Ads </Button>
            <Button onClick={()=>showFR("followers")} style={{position:'relative',left:'20%',display:'inline-block', backgroundColor: '#11204D' }}>View {name} Followers </Button>
            <Button onClick={()=>showFR("following")} style={{position:'relative',left:'30%',display:'inline-block', backgroundColor: '#11204D' }}>View {name} Followings </Button>
            </div>
            {showWhich==="profile"
            ?<ProfileDetails name={name} email={email} address={address}/> 
            :null}
            {showWhich==="followers"
            ?followers.map(friend=>(
                <Profilecart fremail={friend}/>
                ))
            :null}
            {showWhich==="following"
            ?following.map(friend=>(
                <Profilecart fremail={friend}/>
                ))
            :null}
            {showWhich==="myads"
            ?<Showprofileads email={email} />
            :null}
            
        </div>
    )

    }
    
}

export default Profile
