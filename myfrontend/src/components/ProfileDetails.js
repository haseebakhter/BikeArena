import React from 'react'

function ProfileDetails({name,email,address,isaddetail}) {
    return (
        <div style={{alignItems: 'center',justifyContent: 'center'}}>
            {isaddetail?null:<h1>{name} Profile Details</h1>}
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Name:</a><a style={{fontSize:"30px"}}> {name}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Email:</a><a style={{fontSize:"30px"}}> {email}</a><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Address:</a><a style={{fontSize:"30px"}}> {address}</a><br/>
        </div>
    )
}

export default ProfileDetails
