import React, { useContext , useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form' 
import { brands } from "./brands.js";
import { BikeParts } from "./BikeParts.js";

import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { ArrowRight,PersonFill,ArrowUpRightSquareFill, UnlockFill, BoxArrowInRight } from 'react-bootstrap-icons';
import './fullcss.css'
import {NavItem, NavDropdown} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link,withRouter, useHistory } from "react-router-dom";
function NavBar2({islogged,user3, user2, logout,setIsadmin, userid,isadmin}) {
    
  const [isOpen, updateIsOpen] = useState(false);
  const [isOpen2, updateIsOpen2] = useState(false);
    let history = useHistory();
    const opensavedads=()=>{
        history.push('/savedads');
        }
        const openHome=()=>{
          history.push('/');
          }
          const openProfile=()=>{
            console.log('/profile/'+userid)
            history.push('/profile/'+userid);
        
        }
        const openSettings=()=>{
          history.push('/settings');
      
      }
      const openBannedusers=()=>{
        history.push('/bannedusers');
    
    }
    const openUsers=()=>{
      history.push('/Users');
  
  }
    const onClickBrand=(brand)=>{
      
      history.push('/ads/brand/'+brand)
  
  }
  const onClickPart=(part)=>{
    
    history.push('/ads/part/'+part)


}
      const adminlogout=()=>{
        setIsadmin("false")
    
    }
      const onChangeValue=(event)=> {
        console.log(event.target.value);
        if(event.target.value===""){
          console.log("its null")
          history.push('/');
        }else{
          history.push('/search/'+event.target.value);

        }
        
      }
          
    return (
        <div>
            <Navbar className="color-nav"  variant="dark">
                  <Navbar.Brand style={{color: 'white'}} onClick={openHome}>BikeArena</Navbar.Brand>
                  <Form inline>
                    <FormControl onChange={onChangeValue} type="text" placeholder="Search User" className="mr-sm-2" />
                    <Button style={{color: 'white'}} variant="outline-light">Search</Button>
                  </Form>
                  <NavDropdown onMouseOver={() => updateIsOpen(true)}
                  onFocus={() => updateIsOpen(true)}
                  onMouseLeave={() => updateIsOpen(false)}
                  onBlur={() => updateIsOpen(false)}
                  toggle={() => updateIsOpen(!isOpen)}
                  isOpen={isOpen} title={"Brands"} id="nav-dropdown">
                    {brands.map(brand=>(<NavDropdown.Item onClick={()=>onClickBrand(brand)} className="nav-items" eventKey="4.1" >{brand}</NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown onMouseOver={() => updateIsOpen2(true)}
                  onFocus={() => updateIsOpen2(true)}
                  onMouseLeave={() => updateIsOpen2(false)}
                  onBlur={() => updateIsOpen2(false)}
                  toggle={() => updateIsOpen2(!isOpen2)}
                  isOpen={isOpen2} title={"Parts"} id="nav-dropdown">
                    {BikeParts.map(part=>(<NavDropdown.Item onClick={()=>onClickPart(part)} className="nav-items" eventKey="4.1" >{part}</NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  {islogged==="true" 
                  ? <Nav style={{}} className="mr-auto">
                    <Nav.Link style={{color: 'white'}} onClick={opensavedads}>Saved Ads</Nav.Link>
                    </Nav>
                  :isadmin==="true"?null:<Nav style={{marginLeft:'43.5%'}}>
                  <Nav.Link style={{color: 'white'}} to="/sign-up" href="/sign-up"><UnlockFill/> Signup</Nav.Link>
                  </Nav>
                  }
                  
                  <Nav style={{}} >
                    {islogged==="true"
                    ? <Nav.Link onClick={logout} style={{color: 'white', paddingright:'0%'}} >Logout</Nav.Link>
                    :isadmin==="true"?null: <Nav.Link style={{color: 'white'}} to="/sign-in" href="/sign-in"><BoxArrowInRight/> Signin</Nav.Link>}
                    {islogged==="true"?<PersonFill style={{marginTop:"5.5%"}} color="white" />:null}
                    {islogged==="true"
                    ?<NavDropdown style={{color: 'white', fontWeight: 'bold'}} title={user2} id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" className="nav-items" onClick={openProfile}>Profile</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2" className="nav-items" onClick={openSettings}>Account Setting</NavDropdown.Item>
                    
                    </NavDropdown>
                    :null}
                    
                    
                    
                    
                  </Nav>
                  {isadmin==="true"?<Nav style={{position:'absolute', left:'90%'}} className="mr-auto">
                    
                    <NavDropdown style={{color: 'white'}} title="Admin" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" className="nav-items" onClick={openBannedusers}>Banned Users</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.1" className="nav-items" onClick={openUsers}>Users</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2" className="nav-items" onClick={adminlogout}>Logout</NavDropdown.Item>
                    
                    </NavDropdown>
                  </Nav>:null}
                  
                </Navbar>
        </div>
    )
}

export default withRouter(NavBar2)
