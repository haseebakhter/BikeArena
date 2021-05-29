import React, {useState,useEffect, useContext} from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
function Users({isadmin}) {
    const value12 = useContext(UserContext);
    const [results, setResults]=useState([])
    const [actionperform, setActionperformed]=useState(1)
    let params = useParams();
    let history = useHistory();
    const getData=()=>{
        axios.get('http://localhost:5000/getusers')
            .then(response => {
                console.log("Users", response.data)
                var filteredNames = response.data.filter((x)=>{ 
                    console.log(x.firstname)
                    
                        return x
                    
                })
                setResults(filteredNames)
                console.log("searched users", filteredNames)
            })
        
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const handleUnBan=async (email)=>{
        console.log("fuckkk",email)
        await axios.post('/unbanuser', {
            useremail: email
          })
          .then(function (response) {
            console.log("getting data of new banned users: ",response.data)
            getData()
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          
        

    }
    const handleBan=(email)=>{
        console.log("fuckkk",email)
        axios.post('/banuser', {
            useremail: email
          })
          .then(function (response) {
            getData()
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });

    }
    useEffect(() => {
        console.log("isadmin"+ isadmin)
        if(isadmin==="true"){
            getData()
        }else{

        }
        
        
    }, [actionperform])
    if(isadmin==="true"){
        return (
            <div>
                <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> Total {results.length} Users</h3>
                {results.map(name=>(
                    <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                    <h1 style={{size:'12px'}} onClick={()=>{history.push('/profile/'+name._id);}}>{name.firstname} {name.lastname}</h1>
                    <img width="100" height="100" src={'/content/'+name.propic} ></img>
                            <a>Email: {name.email}</a><br></br>
                            {name.isbanned?<button onClick={()=>{handleUnBan(name.email)}} style={{float:'right'}} type="button" class="btn btn-danger">UnBan User As Admin</button>:<button onClick={()=>{handleBan(name.email)}} style={{float:'right'}} type="button" class="btn btn-danger">Ban User As Admin</button>}
                            
                        
                        
                    </div>
                </div>
                ))}
            </div>
        )
    }else{
        return (<div>
            <h1>Unautherized Access</h1>
        </div>)

    }

    
}

export default Users
