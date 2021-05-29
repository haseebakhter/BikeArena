import React, { useState, useEffect }  from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withRouter, useHistory } from 'react-router-dom'; 
import BikeOptions from './bikeoptions'
import './mycss.css'
import PartOption from './partoption'
function Bikepost(props) {
    const [year, setYear] = useState("1990")
    const [addescription, setAddescription] = useState("")
    const [brand, setBrand] = useState("Honda")
    const [adtitle, setAdtitle] = useState("")
    const [price, setPrice] = useState("")
    const [Mileage, setMileage] = useState("")
    const [BikePart, setBikePart] = useState("")
    const [condition, setCondition] = useState("")
    const [Category, setCategory] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [selectedfile2, setSelectedfile2] = useState("")
    const [success, setSuccess] = useState(null)
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
        console.log("User email in JP: ", props.email2, props.userid)
        
        const data = new FormData() 
        data.append('file', selectedfile)
        data.append('file', selectedfile2)
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
        data.set("price", price);
        data.set("date", new Date().toLocaleString());
        const URL = "http://localhost:5000/imgupload";
        
        await axios.post(URL,data)
            .then((response) => {
                console.log(response.data)
                setSuccess(response.data.message);
                e.preventDefault()
            }).catch((error) => {
        });
        
        e.preventDefault()
  
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
    const onIMGChangeHandler2=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile2(event.target.files[0])
    
    }
    useEffect(()=>{
        console.log("we have email",props.email2, props.userid)

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
            
            <div class="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold'}}>Ad Description</label>
                <textarea onChange={(e)=>{setAddescription(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>*Upload Image</label>
            <input type="file" name="file" onChange={onIMGChangeHandler}/>
            <br></br>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Upload Video</label>
            <input type="file" name="file" onChange={onIMGChangeHandler2}/>
            <button onClick={e => {e.preventDefault();addJob(e)}} type="button" class="btn btn-success">Post Ad</button>
            {success? <div class="alert alert-success" role="alert">{success}</div> : null}
            
        </div>
    )
}

export default Bikepost
