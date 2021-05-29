import React from 'react'
import { brands } from "./brands.js";
import { years } from "./years.js";
function BikeOptions({handleChange,handleChange2,Mileage,setMileage}) {
    return (
        <div>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Model:</label>
            <select name="Year" onChange={handleChange}>
            {years.map(item=> <option value={item}>{item}</option>)}
            </select>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px', marginLeft:55}}>Brands:</label>
            <select name="brand" onChange={handleChange2}>{brands.map(item=> <option value={item}>{item}</option>)}</select>
            <div className="form-group">
                <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Mileage in Km</label>
                <input type="text" value={Mileage} onChange={(e)=>{setMileage(e.target.value)}} className="form-control" placeholder="10,000" />
            </div>
        </div>
    )
}

export default BikeOptions
