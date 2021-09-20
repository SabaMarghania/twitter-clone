import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './MessagesPage.css'
import {
    Link
  } from "react-router-dom";
import Photo from '../images/hecker.jpg'
import Axios from 'axios'

function MessagesPage() {
    const[data,setData] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:3001/getLastMessage", )
        .then((res) => {
                setData(res.data);
        })

    },[])
    return (
        <div className='messagespage'>
            <div className="messagespage__top__box">
                <h2>Messages</h2>
            </div>
            <div className="messagespage__list">
                <Link to='/chat' style={{textDecoration:'none',color:'#000'}} >
                <div className="messagespage__profile">
                    <Avatar src={Photo} style={{width:'50px',height:'50px'}}/>
                    <div className="messagespage__profile_cont">
                        <div className="messagespage__profile-name">
                            <h4>Chat 1</h4>
                        </div>
                    
                        <div className="messagespage__message">
                        {data.map((item)=>{
                            return (
                                <div style={{marginLeft:'10px',marginTop:'5px'}} key={item._id}>
                                    {item.message}
                                </div>
                            )
                        })}
                        </div>
            
                </div>
                </div>
                </Link>
         
            </div>
        </div>
    )
}

export default MessagesPage
