import React, { useContext , useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Switch, Route, Link,withRouter, useHistory } from "react-router-dom";
import Bikepost from './Bikepost'
import ShowJobs from './showjobs'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import EditJob from './EditJob'
import Bannedusers from './bannedusers'
import Users from './users'
import Profile from './Profile'
import Savedads from './Savedads'
import Showbrandads from './Showbrandads'
import NabBar2 from './NavBar2'
import Addetails from './addetails'
import Settings from './Settings'
import Searchedusers from './searchedusers'
import axios from 'axios'
import Adminlogin from './adminlogin'
import {UserContext} from './UserContext'
//export const UserContext = React.createContext()
function NavBar(props) {
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("Login");
  const [email2, setEmail2] = useState("Login");
  const [userid, setUserid] = useState("eww");
  const [isadmin, setIsadmin] = useState("false");
  const [favs, setFavs] = useState([]);
  const [following, setFollowing] = useState([]);
  const [islogged, setIslogged] = useState("false");
  let history = useHistory();
  const [redirectToReferrer, setRedirectToReferrer] = useState("false")
  const [test, setTest]= useState(null)
  const [updatejobs, setUpdatejobs]= useState(0)
  const updatefavs=(upfavs)=>{
    console.log("Updating favs: ",upfavs)
    setFavs(upfavs)
  }
  const updatefollowing=(following)=>{
    console.log("Updating following: ",following)
    setFollowing(following)
  }
  const value12 = {
    user2: user2,
    email2: email2,
    islogged: islogged,
    userid: userid,
    
    following: following,
    favs: favs,
    updatefavs: updatefavs,
    updatefollowing: updatefollowing,
    isadmin: isadmin,
    updatejobs:updatejobs,
    test: test
  }
  
  useEffect(() => {
    
  },[test]);
  const logout=()=>{
    setIslogged("false")
    setEmail2("Login")
    setUser3("Login")
    setUserid("eww")
    setUser2("")
    setTest(test+1)
  }
  
  
    
    return (<Router>
        <div>
                <>
                <NabBar2 islogged={islogged} setIsadmin={setIsadmin} isadmin={isadmin} user3={user3} user2={user2} logout={logout} userid={userid} />
                <br></br>
                <div className="auth-wrapper">
                  <div className="auth-inner">
                  
                    <Switch>
                    <UserContext.Provider value={ value12 }>
                      <Route exact path="/" >
                      
                      
                      <ShowJobs />
                      </Route>
                      <Route path="/savedads" component={Savedads}/>
                      <Route path="/ads/brand/:brand" component={Showbrandads}/>
                      <Route path="/ads/part/:part" component={Showbrandads}/>
                      <Route path="/admin" >
                        <Adminlogin setIsadmin={setIsadmin}/>
                      </Route>
                      <Route path="/bannedusers" >
                        <Bannedusers isadmin={isadmin}/>
                      </Route>
                      <Route path="/users" >
                        <Users isadmin={isadmin}/>
                      </Route>
                      <Route path="/search/:query" component={Searchedusers}/>
                      <Route path="/ad/:id" component={Addetails}/>
                      <Route path="/addbikead">
                        <Bikepost setTest={setTest} userid={userid} email2= {email2}  />
                      </Route>
                      
                      <Route path="/sign-in" >
                        <LoginForm setFavs={setFavs} setFollowing={setFollowing} setEmail2={setEmail2} setUserid={setUserid} setIslogged={setIslogged} setUser2={setUser2} user2={user2}/>
                        </Route>
                        <Route path="/sign-up" component={SignupForm} />
                        <Route path="/edit/:id" component={EditJob} />
                        <Route path="/settings" >
                          <Settings/>
                        </Route>
                        <Route path="/profile/:id" >
                          <Profile email2={email2} userid={userid} updatefollowing={updatefollowing}/>
                        </Route>
                      </UserContext.Provider>
                    </Switch>
                    
                        
                    
                  </div>
                </div>
              </>
            
        </div></Router>
    )
}

export default NavBar
