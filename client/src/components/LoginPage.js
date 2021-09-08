import React,{useState,useEffect} from 'react'
import './LoginPage.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import {
    Link
  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import ErrorMessage from "./ErrorMessage";

function LoginPage({history}) {
 
    const [email, setEmail] = useState("ucnobi102@gmail.com");
    const [password, setPassword] = useState("");
   
  
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;
  
    useEffect(() => {
      if (userInfo) {
        history.push("/home");
      }
    }, [history, userInfo]);
  

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    };
  
    return (
        <div className='loginpage' >

        <div className='loginpage__cont' >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <div className='loginpage__top' >
            <Link to='/'>
                <TwitterIcon style={{fontSize:'50px',color:'rgb(54, 175, 231)',marginTop:'15px'}} />
            </Link>
            </div>
            <div className="loginpage__text">
                <h1>Log in toprofileImg Twitter</h1>
            </div>
            <form onSubmit={submitHandler}>
            <div className="loginpage__form">
            
              <input type="text"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Email ' />

            

              <input type="password"   
              value={password}  
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'/>
             </div>
            <div className="loginpage__button">
                <button type='submit' onClick={submitHandler}>Log in</button>
            </div>
            </form>
            <div className="loginpage__signup">
                    <p>Don't have an account? <Link to='/register' style={{color:'blue'}}>Sign up</Link> </p>
            </div>
            </div>
       
        </div>
    )
}

export default LoginPage
