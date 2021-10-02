import React, {useState,useEffect, useContext} from 'react'
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import {GeoAltFill} from 'react-bootstrap-icons';
import Font, { Text } from 'react-font'
function BrowseMechanics() {
    const [results, setResults]=useState([])
    const [filteredData,setFilteredData] = useState([]);

    const [search, setSearch]=useState([])
    let history = useHistory();
    const getData=()=>{
        axios.get('http://localhost:5000/getallmechanics')
            .then(response => {
                console.log("Mechanics", response.data)
                
                setResults(response.data)
                setFilteredData(response.data)
                
            })
        
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const searchMechanic=(value)=>{
        let value1 = value.toLowerCase();
        let result = [];
        console.log(value1);
        result = results.filter((data) => {
            console.log(data.firstname.toLowerCase())
            console.log(data.firstname.toLowerCase().includes(value1))
            return data.firstname.includes(value1);
        });
        setFilteredData(result);
        

    }
    useEffect(() => {
        
        
        
        getData()
        
    }, [])
    return (
        <div>
            <div style={{backgroundColor:'#C00000', alignContent:'center'}}>
            <Font family='Karantina'>
                <h1 style={{color:'#F7B32D', textAlign:'center', fontSize:'70px'}}>Mechanics At Your Service</h1>
                <a style={{color:'#F8F9FC', marginLeft:'37%', fontSize:'50px'}}>Trustworthy and Competent</a>
            </Font>    
            </div>
            <input onChange={e=>searchMechanic(e.target.value)} placeholder="Search Mechanic"></input>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#E52D27', color: 'white'}}> {results.length} Mechanics Available</h3>
            {filteredData.map(name=>(

                <div class="jumbotron jumbotron-fluid" style={{borderColor:"#0d3f67", border:"4px", borderStyle:"solid", width:'50%', marginLeft:'25%'}}>
                    
                <div style={{display:'inline-block'}} class="container">
                
                <img style={{display:'inline-block', marginLeft:'26.5%'}} width="300" height="300" src={'/content/'+name.propic} ></img>
                <div style={{backgroundColor:"#C00000"}}>
                <a style={{fontSize:'42px', marginLeft:'30%', display:'inline-block', color:'#F8F9FC'}} href='' onClick={()=>{history.push('/mechanicprofile/'+name._id);}} >{name.firstname} {name.lastname}</a><br></br>
                        <a style={{ marginLeft:'32%', backgroundColor:'#f6003c', borderRadius:'25%', color:'#ffffff'}}>Email: {name.email}</a><br></br>
                        <a style={{marginLeft:'35%', backgroundColor:'#fff591', borderRadius:'25%', color:'#e41749'}}> <b>Works from</b> {name.startinghours} to {name.endinghours}</a><br/>
                        <a style={{marginLeft:'37%', backgroundColor:'#fff591', borderRadius:'25%', color:'#e41749'}}> <b></b> <GeoAltFill /> {name.town} {name.city} </a>
                </div>
                </div>
            </div> 
            ))}
        </div>
    )
}

export default BrowseMechanics
