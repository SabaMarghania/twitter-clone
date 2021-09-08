import React from 'react'
import './Login.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import {
    Link
  } from "react-router-dom";
function Login() {

    return (
        <div className='login'>
            <div className="login__left">
                <TwitterIcon 
                style={{
                    color:'#fff',
                    fontSize:'260px',
                    margin:'0 auto',
                    marginLeft:'30%',
                    marginTop:'20%',
                    }}/>
            </div>
            <div className="login__right">
                    <div className="login__right-icon">
                        <TwitterIcon style={{fontSize:'50px',color:'rgb(54, 175, 231)'}} />
                    </div>
                <div className="login__right_text">
                    <h1>Happening now</h1>
                    <h2>Join Twitter today.</h2>
                </div>
                <Link to='/loginPage' style={{textDecoration:'none',color:'#000'}} >
                        <div  className="login__right__auth">
                        <h3>Use email or phone</h3>
                        </div>
                </Link>
            
            </div>
      
        </div>
    )
}

export default Login
