import React from 'react'

import { BikeParts } from "./BikeParts.js";
function PartOption({handleChange3}) {
    return (
        <div>
            <label style={{color:'black', fontSize: 22, fontWeight: 'bold', paddingRight: '5px'}}>Bike Parts:</label>,
            <select name="BikeParts" onChange={handleChange3} style={{marginLeft:65}}>
                {BikeParts.map(item=> <option value={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default PartOption
