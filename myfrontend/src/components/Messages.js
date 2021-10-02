import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {UserContext} from './UserContext'
import Conversation from './Conversation';
function Messages() {
    const [messages, setMessages] = useState(null)
    const value12 = useContext(UserContext);
    const getMessages=()=>{
        axios.get('http://localhost:5000/getConversations/'+value12.userid)
            .then(response => {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    
    useEffect(() => {
        getMessages()
    }, [])
    if(messages==null){
        return(<div style={{backgroundColor:'#dadada', width:'35%'}}>
            <h1 style={{backgroundColor:'#08ffc8'}}>Messages Loading...</h1>
        </div>)

    }else{
        return (
            <div style={{backgroundColor:'#dadada', width:'35%'}}>
                <h1 style={{backgroundColor:'#08ffc8'}}>Recent Chat</h1>
                {messages.map(wholeconversation=>(
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}}>
                    <div style={{display:'inline-block'}} class="container">
                        
                        <Conversation wholeconversation={wholeconversation}  />
                    </div>
                </div> 
                ))}
            </div>
        )

    }
    
}

export default Messages
