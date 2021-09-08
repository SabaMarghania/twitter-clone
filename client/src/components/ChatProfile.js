import React,{useEffect,useRef} from 'react'
import './ChatProfile.css'
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';

function ChatProfile({message,messageimg}) {
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [message]);
    return (
        <>
        <div className='chatProfile'>
            <Avatar src={userInfo?.pic} />
        <div className='chatProfile__info'>
            <p>{message}</p>
            <div ref={messagesEndRef} />
            <div className="chatprofile__img">
                {messageimg && <img width='300px' src={`/uploads/${messageimg}`}  alt=""/>  }
                
            </div>
            </div>
        </div>
        
        </>
    )
}

export default ChatProfile
