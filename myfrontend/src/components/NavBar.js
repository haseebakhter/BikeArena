import React, { useContext , useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Switch, Route, Link,withRouter, useHistory, Redirect } from "react-router-dom";
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
import RegisterAsMechanic from './RegisterAsMechanic';
import LoginAsMechanic from './LoginAsMechanic';
import BrowseMechanics from './BrowseMechanics';
import MechanicProfile from './mechanicprofile';
import Cart from './Cart';
import Cart2 from './Cart2';
import ChatBotPage from './ChatBotPage';
import Chat from './Chat';
import Messages from './Messages';
import Purchases from './Purchases';
import UserPurchases from './UserPurchases';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
//export const UserContext = React.createContext()
const data = JSON.parse(localStorage.getItem('data'))
console.log("Local Storage: ",data)
function NavBar(props) {
  const [user2, setUser2] = useState(data?data.fname+' '+data.lname:"");
  const [user3, setUser3] = useState("Login");
  const [email2, setEmail2] = useState(data?data.email:"Login");
  const [userid, setUserid] = useState(data?data.id:"eww");
  const [isadmin, setIsadmin] = useState(data?data.isadmin:"false");
  const [favs, setFavs] = useState(data?data.favs:[]);
  const [cart, setCart] = useState(data?data.cart:null);
  const [credits, setCredits] = useState(data?data.credits:null);
  const [following, setFollowing] = useState(data?data.following:[]);
  const [islogged, setIslogged] = useState(data?data.islogged:"false");
  const [type, setType] = useState(data?data.type:null);
  let history = useHistory();
  const [redirectToReferrer, setRedirectToReferrer] = useState("false")
  const [test, setTest]= useState(null)
  const [updatejobs, setUpdatejobs]= useState(0)
  const updatefavs=(upfavs)=>{
    console.log("Updating favs: ",upfavs)
    const data = JSON.parse(localStorage.getItem('data'))
    console.log("Local Storage: ",data)
    data.favs=upfavs
    localStorage.setItem('data', JSON.stringify(data))
    setFavs(upfavs)
  }
  const updatefollowing=(following)=>{
    console.log("Updating following: ",following)
    const data = JSON.parse(localStorage.getItem('data'))
    console.log("Local Storage: ",data)
    data.following=following
    localStorage.setItem('data', JSON.stringify(data))
    setFollowing(following)
  }
  const updatecart=(cart)=>{
    console.log("Updating cart: ",cart)
    const data = JSON.parse(localStorage.getItem('data'))
    console.log("Local Storage: ",data)
    data.cart=cart
    localStorage.setItem('data', JSON.stringify(data))
    setCart(cart)
  }
  
  
  useEffect(() => {
    
    
  },[test]);
  const logout=()=>{
    setIslogged("false")
    setEmail2("Login")
    setUser3("Login")
    setUserid("eww")
    setUser2("")
    localStorage.clear();
    setTest(test+1)
  }
  
  
  const value12 = {
    user2: user2,
    email2: email2,
    islogged: islogged,
    userid: userid,
    type: type,
    following: following,
    favs: favs,
    updatefavs: updatefavs,
    updatefollowing: updatefollowing,
    updatecart: updatecart,
    isadmin: isadmin,
    cart: cart,
    updatejobs:updatejobs,
    test: test
  }
    return (<Router>
        <div>
                <>
                <NabBar2 credits={credits} type={type} islogged={islogged} setIsadmin={setIsadmin} isadmin={isadmin} user3={user3} user2={user2} logout={logout} userid={userid} />
                <br></br>
                <div className="auth-wrapper">
                  <div className="auth-inner">
                  
                    <Switch>
                    <UserContext.Provider value={ value12 }>
                      <Route exact path="/" >
                      
                      
                      <ShowJobs />
                      </Route>
                      <Route path="/savedads" component={Savedads}/>
                      <Route path="/browsemechanics" component={BrowseMechanics}/>
                      <Route path="/ads/brand/:brand" component={Showbrandads}/>
                      <Route path="/ads/part/:part" component={Showbrandads}/>
                      <Route path="/conversation/:id" component={Chat}/>
                      <Route path="/messages" component={Messages}/>
                      <Route path="/mycart" component={Cart}/>
                      <Route path="/chatwithus" component={ChatBotPage}/>
                      <Route path="/purchases" >
                        {isadmin==="true"?<Purchases />:<Redirect to="/" />} 
                      </Route>
                      <Route path="/mypurchases/:id" >
                        {islogged==="true"?<UserPurchases />:<Redirect to="/" />} 
                      </Route>
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
                        <Bikepost setTest={setTest} userid={userid} email2= {email2} islogged={islogged}  />
                      </Route>
                      
                      <Route path="/sign-in" >
                        <LoginForm setCredits={setCredits} setType={setType} setFavs={setFavs} setCart={setCart} setFollowing={setFollowing} setEmail2={setEmail2} setUserid={setUserid} setIslogged={setIslogged} setUser2={setUser2} user2={user2}/>
                        </Route>
                        <Route path="/mechanicsign-in" >
                        <LoginAsMechanic setType={setType} setEmail2={setEmail2} setUserid={setUserid} setIslogged={setIslogged} setUser2={setUser2} user2={user2}/>
                        </Route>
                        <Route path="/sign-up" component={SignupForm} />
                        <Route path="/mechanicsign-up" component={RegisterAsMechanic} />
                        <Route path="/edit/:id" component={EditJob} />
                        <Route path="/forgetpassword" component={ForgetPassword}/>
                        <Route path="/reset/:token" component={ResetPassword}/>
                        <Route path="/settings" >
                          <Settings setUser2={setUser2}/>
                        </Route>
                        <Route path="/profile/:id" >
                          <Profile email2={email2} userid={userid} updatefollowing={updatefollowing}/>
                        </Route>
                        <Route path="/mechanicprofile/:id" >
                          <MechanicProfile />
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
