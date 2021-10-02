import React, {useState,useEffect, useContext} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import { pk } from "./pk.js";
import {UserContext} from './UserContext'
import { brands } from "./brands.js";
import { cities } from "./cities.js";
import { years } from "./years.js";
import './mycss.css'
import { BikeParts } from "./BikeParts.js";
function EditJob() {
    let params = useParams();
    const value12 = useContext(UserContext);
    const [year, setYear] = useState("")
    const [addescription, setAddescription] = useState("")
    const [brand, setBrand] = useState("")
    const [adtitle, setAdtitle] = useState("")
    const [price, setPrice] = useState("")
    const [Mileage, setMileage] = useState("")
    const [BikePart, setBikePart] = useState("")
    const [condition, setCondition] = useState("")
    const [Category, setCategory] = useState("")
    const [selectedfile, setSelectedfile] = useState(null)
    const [success, setSuccess] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedfile2, setSelectedfile2] = useState(null)
    let history = useHistory();
    
    const getJob=(id)=>{
        axios.get('http://localhost:5000/ad/'+id)
            .then(response => {
                console.log(response.data)
                setCategory(response.data.Category)
                if(response.data.Category==="Bike"){
                    setYear(response.data.Model)
                    setBrand(response.data.brand)
                    setMileage(response.data.Mileage)
                }else{
                    setBikePart(response.data.BikePart)
                }
                setCondition(response.data.condition)
                setAddescription(response.data.addescription)
                setAdtitle(response.data.adtitle)
                setSelectedOption2(response.data.city)
                setPrice(response.data.price)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    } 
    const updatejob=()=>{
        const data = new FormData() 
        data.append('file', selectedfile2)
        data.append('file', selectedfile)
        data.set("adtitle", adtitle);
        data.set("year", year);
        data.set("id", params.id);
        data.set("Category", Category);
        data.set("addescription", addescription);
        data.set("brand", brand);
        data.set("Mileage", Mileage);
        data.set("BikePart", BikePart);
        data.set("condition", condition);
        data.set("price", price);
        data.set("city", selectedOption2);
        if(selectedfile2==null){
            data.set("isvideo", "false");
        }else{
            data.set("isvideo", "true");
        }
        data.set("date", new Date().toLocaleString());
        const URL = "http://localhost:5000/updatejob";
        axios.post(URL,data)
            .then((response) => {
                if(response.data.success){
                    setSuccess(response.data.message)
                }
            }).catch((error) => {
        });

    }
    const handleChange=(e) =>{
        setYear(e.target.value)
    }
    const handleChange2=(e) =>{
        setBrand(e.target.value)
    }
    const handleCities=(e) =>{
        setSelectedOption2(e.target.value)
    }
    const handleChange3=(e) =>{
        setBikePart(e.target.value)
    }
    const onChangeValue=(event)=> {
        console.log(event.target.value);
        setCondition(event.target.value)
      }
      const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    const onIMGChangeHandler2=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile2(event.target.files[0])
    
    }
    useEffect(() => {
        console.log("We editing job"+ params.id)
        getJob(params.id)
    }, [])
    function PartOption({handleChange3}) {
        return (<label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Bike Parts:</label>,
        <select name="BikeParts" onChange={handleChange3}>
            {BikeParts.map(item=> <option value={item}>{item}</option>)}
        </select>)
      }
      function BikeOptions({handleChange,handleChange2,model,Mileage,brand,setMileage}) {
        return (<div><label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Model:</label>
        <select name="Year" value={model} onChange={handleChange}>
        {years.map(item=> <option value={item}>{item}</option>)}
        </select>
        <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Brands:</label>
        <select name="brand" value={brand} onChange={handleChange2}>{brands.map(item=> <option value={item}>{item}</option>)}</select>
        <div className="form-group">
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Mileage in Km</label>
            <input type="text" value={Mileage} onChange={(e)=>{setMileage(e.target.value)}} className="form-control" placeholder="10,000" />
        </div></div>)
      }
    return (
        <div class="jumbotron">
            <h1>Edit Job</h1>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Ad Title</label>
                    <input type="text" value={adtitle} onChange={(e)=>{setAdtitle(e.target.value)}} className="form-control" placeholder="Ad Title" />
            </div>
            {Category=="Bike"
            ?<BikeOptions handleChange={handleChange} brand={brand} model={year} handleChange2={handleChange2} Mileage={Mileage} setMileage={setMileage}/>
            :null}
            {Category=="Part"
            ?<PartOption handleChange3={handleChange3} />
            :null}
            <div onChange={onChangeValue}>
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Condition: </label>
                <input type="radio" class="foo2" value="New" name="gender" checked={condition=="New"?"checked":null}/> New
                <input type="radio" class="foo2" value="Used" name="gender" checked={condition=="Used"?"checked":null}/> Used
            </div>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Price</label>
                    <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="form-control" placeholder="i.e 30,000" />
            </div>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Location</label>
                    <select name="Cities" value={selectedOption2} onChange={handleCities}>
                        {cities.map(city=> <option value={city}>{city}</option>)}
                    </select>
            </div>
            <div class="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold'}}>Ad Description</label>
                <textarea value={addescription} onChange={(e)=>{setAddescription(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>*Upload Image</label>
            <input type="file" name="file" onChange={onIMGChangeHandler}/>
            <br></br>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Upload Video</label>
            <input type="file" name="file" onChange={onIMGChangeHandler2}/>
            <button onClick={e => {e.preventDefault();updatejob()}} type="button" class="btn btn-success">Done</button>
            {success? <div class="alert alert-success" role="alert">{success}</div> : null}
        </div>
    )
}

export default withRouter(EditJob)
