import React, { useState, useEffect }  from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter, useHistory } from 'react-router-dom'; 
import BikeOptions from './bikeoptions'
import './mycss.css'
import PartOption from './partoption'
import {ProgressBar } from "react-bootstrap"
import { cities } from "./cities.js";
function Bikepost(props) {
    const [year, setYear] = useState("1990")
    const [addescription, setAddescription] = useState("")
    const [brand, setBrand] = useState("Honda")
    const [adtitle, setAdtitle] = useState("")
    const [price, setPrice] = useState("")
    const [Mileage, setMileage] = useState("")
    const [BikePart, setBikePart] = useState("")
    const [condition, setCondition] = useState("")
    const [location, setLocation] = useState("")
    const [Category, setCategory] = useState("")
    const [selectedfile, setSelectedfile] = useState(null)
    const [selectedfile2, setSelectedfile2] = useState(null)
    const [selectedfile3, setSelectedfile3] = useState(null)
    const [selectedfile4, setSelectedfile4] = useState(null)
    const [selectedfile5, setSelectedfile5] = useState(null)
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState()
    let history = useHistory();
    const handleChange=(e) =>{
        setYear(e.target.value)
    }
    const handleChange2=(e) =>{
        setBrand(e.target.value)
    }
    const handleChange3=(e) =>{
        setBikePart(e.target.value)
    }
    const addJob=async(e)=>{
        e.preventDefault()
        console.log("User email in JP: ", props.email2, props.userid)
        if (adtitle=="" || addescription==""|| price=="" || selectedOption2==null|| condition=="" ){
            setError(" ")
     }else{
        const data = new FormData() 
        data.append('file', selectedfile2)
        data.append('file', selectedfile)
        data.append('file', selectedfile3)
        data.append('file', selectedfile4)
        data.append('file', selectedfile5)
        data.set("useremail", props.email2);
        data.set("userid", props.userid);
        data.set("adtitle", adtitle);
        data.set("year", year);
        data.set("Category", Category);
        data.set("addescription", addescription);
        data.set("brand", brand);
        data.set("Mileage", Mileage);
        data.set("BikePart", BikePart);
        data.set("condition", condition);
        data.set("city", selectedOption2);
        data.set("price", price);
        if(selectedfile2==null){
            data.set("isvideo", "false");
        }else{
            data.set("isvideo", "true");
        }
        data.set("date", new Date().toLocaleString());
        const URL = "http://localhost:5000/imgupload";
        
        await axios.post(URL,data,{
            onUploadProgress: progressEvent  => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * progressEvent.loaded) / progressEvent.total))
              },
        })
            .then((response) => {
                console.log(response.data)
                setSuccess(response.data.message);
                history.push('/ad/'+response.data.AdID);
                
            }).catch((error) => {
        });
    }
        
  
      }
      const onChangeValue=(event)=> {
        console.log(event.target.value);
        setCondition(event.target.value)
      }
      const onChangeValue2=(event)=> {
        console.log(event.target.value);
        setCategory(event.target.value)
      }
      const onIMGChangeHandler=(event)=>{
        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    }
    const onIMGChangeHandler3=(event)=>{
        console.log(event.target.files[0])
        setSelectedfile3(event.target.files[0])
    }
    const onIMGChangeHandler4=(event)=>{
        console.log(event.target.files[0])
        setSelectedfile4(event.target.files[0])
    }
    const onIMGChangeHandler5=(event)=>{
        console.log(event.target.files[0])
        setSelectedfile5(event.target.files[0])
    }
    const onIMGChangeHandler2=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile2(event.target.files[0])
    
    }
    const handleCities=(e) =>{
        setSelectedOption2(e.target.value)
    }
    useEffect(()=>{
        console.log("we have email",props.email2, props.userid)
        if(props.islogged=="false"){
            history.push('/sign-in');
        }

    },[])
    return (
        <div class="jumbotron">
            <h1>Post Bike Ad</h1>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Ad Title</label>
                    <input type="text" value={adtitle} onChange={(e)=>{setAdtitle(e.target.value)}} className="form-control" placeholder="Ad Title" />
            </div>
            <div onChange={onChangeValue2}>
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '10px'}}>Category: </label>
                <input class="foo" type="radio" value="Bike" name="Category" /> Bike
                <input class="foo" type="radio" value="Part" name="Category" /> Part
                
            </div>
            {Category=="Bike"
            ?<BikeOptions handleChange={handleChange} handleChange2={handleChange2} Mileage={Mileage} setMileage={setMileage}/>
            :null}
            {Category=="Part"
            ?<PartOption handleChange3={handleChange3} />
            :null}
            
            <div onChange={onChangeValue}>
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Condition: </label>
                <input type="radio" class="foo2" value="New" name="gender" /> New
                <input type="radio" class="foo2" value="Used" name="gender" /> Used
            </div>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Price</label>
                    <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="form-control" placeholder="30000" />
            </div>
            <div className="form-group">
                    <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Location</label>
                    <select name="Cities" value={selectedOption2} onChange={handleCities}>
                        {cities.map(city=> <option value={city}>{city}</option>)}
                    </select>
            </div>
            
            
            <div class="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold'}}>Ad Description</label>
                <textarea onChange={(e)=>{setAddescription(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>*Upload Images</label>
            <input type="file" name="file" onChange={onIMGChangeHandler}/>
            <br></br>
            <input type="file" name="file" onChange={onIMGChangeHandler3}/>
            <br></br>
            <input type="file" name="file" onChange={onIMGChangeHandler4}/>
            <br></br>
            <input type="file" name="file" onChange={onIMGChangeHandler5}/>
            <br></br>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Upload Video</label>
            <input type="file" name="file" onChange={onIMGChangeHandler2}/>
            <button onClick={e => {e.preventDefault();addJob(e)}} type="button" class="btn btn-success">Post Ad</button>
            {error? <div class="alert alert-danger" role="alert">{adtitle==""?"add-title":null}{addescription==""?" add-description":null}{price==""?" price":null}{selectedOption2==null?" location":null}{condition==""?" condition":null} empty</div> : null}
            {success? <div class="alert alert-success" role="alert">{success}</div> : null}
            {progress && <ProgressBar now={progress} label={`${progress}%`} />}

            
        </div>
    )
}

export default Bikepost
