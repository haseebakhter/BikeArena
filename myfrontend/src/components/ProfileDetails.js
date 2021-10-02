import React from 'react'

function ProfileDetails({name,id,email,address,isaddetail}) {
    return (
        <div style={{alignItems: 'center',justifyContent: 'center'}}>
            {isaddetail?null:<h1>{name} Profile Details</h1>}
            <a  style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Name:</a><a id="profiledetailspadding" style={{}} href={'/profile/'+id}> {name}</a><br/><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Email:</a><a id="profiledetailspadding" > {email}</a><br/><br/>
            <a style={{color:"black",fontWeight:"bold", fontSize:"30px"}}>Address:</a><a id="profiledetailspadding" > {address}</a><br/>
        </div>
    )
}

export default ProfileDetails
