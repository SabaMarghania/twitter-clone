import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import TwitterIcon from '@material-ui/icons/Twitter';
import './Register.css'
import ErrorMessage from './ErrorMessage'
import {
    Link
  } from "react-router-dom";


function Register({history}) {

    //reg
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, userInfo } = userRegister;
    //modal

//

  
const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

            useEffect(() => {
                if (userInfo) {
                    history.push("/loginPage");
                }
            }, [history , userInfo]);

            const submitHandler = (e) => {
                e.preventDefault();

                if (password !== confirmpassword) {
                    setMessage("Passwords do not match");
                } else dispatch(register(username, email, password, pic, birth));
            };

    return (
        <div className='register'>
             
            <div className="login__modal_body">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                <TwitterIcon  className='login__icon' style={{fontSize:'40px',color:'rgb(54, 175, 231)'}} />
           
            <div className="login__modal_body_title">
                <h2>Create your account</h2>
            </div>
            <div className="login__modal_body_cont">
                <input name='username'  onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='username' />
                <input name='email'  onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                <input name='password' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                <input name='confirmPassword'onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />
                {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
                <input type="file" onChange={(e) => postDetails(e.target.files[0])}   />
                   
                    <h4>Date of birth</h4>
                    <p>This will not be shown publicly. Confirm your own age,
                        even if this account is for a business, a pet, or something else.</p>
                <input onChange={(e)=>setBirth(e.target.value)}  type="date" placeholder='Choice 3' />
            </div>
            <div className="login__modal_button">
                <button onClick={submitHandler} type='submit'>Sign up</button>
            </div>
            <div className="register__login">
                <p>Already have an account? <Link to='/loginPage'>Sign in</Link></p>
            </div>
        </div>
        </div>
    )
}

export default Register
