import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {UserContext} from './UserContext'

function Conversation({wholeconversation, setIsloaded}) {
    const value12 = useContext(UserContext);
    let history = useHistory();
    const [userInfo, setUserInfo]=useState([])
    const [datetime, setDatetime]=useState([])
    const getProfile=async(id)=>{
        await axios.get('http://localhost:5000/user/'+id)
            .then(response => {
                
                if(response.data){
                    console.log("Opened Profile Info: ",response.data)
                    setUserInfo(response.data)
                    setIsloaded(true)
                    return response.data
                }else{
                    axios.get('http://localhost:5000/mechanic/'+id)
                    .then(response => {
                        console.log("Opened Profile Info: ",response.data)
                        setUserInfo(response.data)
                        setIsloaded(true)
                        return response.data
                    })
                    .catch(function (error){
                        console.log(error);
                        console.log("Aey te error hai bro")
                    })
                }
                
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const openConvo=()=>{
        history.push('/conversation/'+wholeconversation._id)
        
        

    }
    useEffect(() => {
        console.log("wholeconversation.members[0]: ",wholeconversation.members[0]," value12.userid:", value12.userid, " wholeconversation.members[1]", wholeconversation.members[1])
        if(wholeconversation.members[0]===value12.userid){
            console.log("Senderinfo: ",wholeconversation.members[1])
            getProfile(wholeconversation.members[1])
        }else{
            console.log("Senderinfo: ",wholeconversation.members[0])
            getProfile(wholeconversation.members[0])
        }
        var date = new Date(wholeconversation.updatedAt);
        console.log(date.toString())
        var array1=date.toString().split(' ')
        console.log("Month: ", array1[1], " Date: ", array1[2], " Year: ", array1[3])
        setDatetime(array1[1]+' '+array1[2]+' '+array1[3])
    }, [])
    return (
        <div>
            <img onClick={()=>openConvo()} width="100" height="100" src={'/content/'+userInfo.propic} ></img>
            <h1 onClick={()=>openConvo()} style={{display:'inline'}}>{userInfo.firstname+' '+userInfo.lastname}</h1>
            <a style={{float:'right', color:'#e41749'}}>{datetime}</a>
        </div>
    )
}

export default Conversation
