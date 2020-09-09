import React from 'react';

import './App.css';
import SignUp from './SignUp';
import { Login } from './Login';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom'
import Home from './Home';
import LeaveApplication from './LeaveApplication';
import AdminHandle from './AdminHandle';
import UserDetails from './UserDetails';

function App() {
  return (
    <div className="App backgnd"  id='style' >
     
      <Router>  
           <h5 className='m-3' > 
       <NavLink style={{float:'right'}}   to='/login'> Login</NavLink> </h5>
   
     <Switch>  
        <Route path='/' exact component={Home}/>
        <Route path='/login'   component={Login}/>
       <Route path='/signup' component={SignUp}/>
       <Route path='/leaveApp/:id' component={LeaveApplication}/>
      <Route path='/admin' component={AdminHandle}/>
      <Route path='/detail' component={UserDetails}/> 
   </Switch>
     </Router> 
{/* <AdminHandle/>

{/* <ImageTest/> */}


   
 </div>
  );
}

export default App;
