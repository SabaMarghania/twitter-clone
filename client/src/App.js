import React from 'react'
import './App.css';
import SidebarRight from './components/SidebarRight'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {  useSelector } from "react-redux";
import MessagesPage from './components/MessagesPage';
import Chat from './components/Chat';
import Profile from './components/Profile';

function App() {

  
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

  return (
    <Router>
        <div className="App">

      <Switch>
      <Route path = "/profile" >
            <Sidebar />
            <Profile />
            <SidebarRight />
          </Route>
      <Route path = "/chat" >
            <Sidebar />
            <MessagesPage />
            <Chat />
          </Route>
      <Route path = "/messagesPage" >
            <Sidebar />
            <MessagesPage />
          </Route>

          <Route path = "/home" >
            <Sidebar />
            <Home />
            <SidebarRight />
          </Route>


        <Route path="/loginPage" component={LoginPage}  />
        <Route path="/register" component={Register} />
        

        {!userInfo ? (
        <Login />
      ) : (
          <>
          <Sidebar />
            <Home />
            <SidebarRight />
        </>
      )}
           
        <Route path="/" component={Login} exact/>
      
      </Switch>
      </div>

    </Router>
  );
}

export default App;
