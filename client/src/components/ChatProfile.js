import React,{useState,useEffect,useRef} from 'react'
import './ChatProfile.css'
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Axios from 'axios'
function ChatProfile({message,messageimg,id}) {
    const[modal,setModal] = useState(false)

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleClick = () => {
        setModal((prev) => !prev);
      };
    
      const handleClickAway = () => {
        setModal(false);
      };

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  
    useEffect(scrollToBottom, [message]);
    const delMsg = () =>{
        Axios.delete(`http://localhost:3001/deleteMsg/${id}`)
       
      }
    return (
        <div>
     <div className='chatProfile' >
            <Avatar src={userInfo?.pic} />
        <div className='chatProfile__info_cont'>
        <div className='chatProfile__info'>
          {message &&  <p>{message}</p>}
            <div className="chatprofile__img">
                {messageimg && <img width='300px' src={`/uploads/${messageimg}`}  alt=""/>  }
                
            </div>
            </div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div >
                    <MoreVertIcon onClick={handleClick} className='chatProfile__icon' />
                </div>
    </ClickAwayListener>
        </div>


        {modal && (
            <div className='chat__modal'>
                <div onClick={delMsg} className="chat__modal_del">
                    <h4>Delete</h4>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />

        </div>
        </div>
    )
}

export default ChatProfile
