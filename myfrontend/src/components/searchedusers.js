import React, {useState,useEffect, useContext} from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
function Searchedusers() {
    const value12 = useContext(UserContext);
    const [results, setResults]=useState([])
    
    const [update, setUpdate]=useState(0)
    let params = useParams();
    let history = useHistory();
    const getData=(query)=>{
        axios.get('http://localhost:5000/getusers')
            .then(response => {
                console.log("Users", response.data)
                var filteredNames = response.data.filter((x)=>{ 
                    console.log(x.firstname)
                    if(x.firstname.toLowerCase().includes(params.query.toLowerCase())){
                        return x
                    }
                })
                setResults(filteredNames)
                console.log("searched users", filteredNames)
            })
        
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const isinfollowing=(email)=>{
        console.log("Ad ID: "+email+" following:"+value12.following)
        var array1=value12.following
        console.log(array1.includes(email))
        return array1.includes(email)
        
        
    }
    const handleClick=async(profilestatus,email)=>{
        console.log("Lets do work "+profilestatus)
        
        
        
        const URL = "http://localhost:5000/handlefriendbutton";
        var data2 ={
            Pemail: email,
            LUemail2: value12.email2,
            profilestatus: profilestatus
            
        }
        
        
        
        await axios.post(URL,data2)
            .then((response) => {
                /*console.log("Button click response from backend", response.data)
                console.log("We opening profile"+ params.id+"Logged user email: "+value12.email2)
                var ret = params.id.replace('profile','');
                console.log(ret);
                getFF(ret)*/
                console.log("response after click event in search follow",response.data,"Clicked user email: ",email)
                
                console.log("Updating page")
                if(profilestatus=="Not Anything"){
                    var index=value12.following.length
                    var newvalues=value12.following
                    console.log("new values1",newvalues)
                    newvalues[index]=email
                    console.log("new values2",newvalues,"Index: ", index)
                    
                    value12.updatefollowing(newvalues)
                    setUpdate(update+1)
                    

                }else{
                    value12.updatefollowing(value12.following.filter(follow=>follow !== email))

                }
                

                
            }).catch((error) => {
        });
        
        
        
        
        
    }

    useEffect(() => {
        
        console.log("We opening profile"+ params.query+"Logged user email: "+value12.email2)
        var ret = params.query
        
        
        getData(ret)
        
    }, [params.query, update])
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> {results.length} Search Results</h3>
            {results.map(name=>(
                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid"}}>
                <div class="container">
                
                <img width="100" height="100" src={'/content/'+name.propic} ></img>
                <a style={{fontSize:'42px'}} href='#' onClick={()=>{history.push('/profile/'+name._id);}} >{name.firstname} {name.lastname}</a><br></br>
                        <a style={{paddingLeft:'105px', paddingTop:'−80px'}}>Email: {name.email}</a><br></br>
                        {value12.isadmin=="true"||value12.islogged=="false"||value12.email2==name.email?null:isinfollowing(name.email)?<button style={{marginLeft:'80%'}} onClick={()=>handleClick("Following",name.email)}  type="button" class="btn btn-danger">Unfollow</button>:<button style={{marginLeft:'80%'}} onClick={()=>handleClick("Not Anything",name.email)} type="button" class="btn btn-success">Follow</button>}
                    
                    
                </div>
            </div> 
            ))}
        </div>
    )
}

export default Searchedusers
