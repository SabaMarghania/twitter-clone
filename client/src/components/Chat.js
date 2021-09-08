import React,{useState,useEffect} from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SendIcon from '@material-ui/icons/Send';
import ChatProfile from './ChatProfile';
import Axios from 'axios'

function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [file, setFile] = useState('')

    const onChangeFile = (e) =>{
        setFile(e.target.files[0]);
    }

    useEffect(() => {

        let flag = true
     
        Axios.get("http://localhost:3001/getMessages", )
            .then((res) => {
                if (flag) {
                    setMessages(res.data);
                }
            })
        return () => flag = false
    }, [messages])
    const HandleMessage =  ()  =>{
        const formData = new FormData();
        formData.append("message", message)
        formData.append("messageImage", file)

        Axios.post("http://localhost:3001/message",formData)
        .then((res)=>setMessages(res.data))
        .catch((err)=>{
            console.log(err);
        })
 
    }
    const HandleText =  ()  =>{
        const formData = new FormData();
        formData.append("message", message)

        Axios.post("http://localhost:3001/message2",formData)
        .then((res)=>setMessages(res.data))
        .catch((err)=>{
            console.log(err);
        })
 
    }
    return (
        <div className='chat'>
            <div className='chat__container'>
            <div className="chat__top__box">
                <Avatar style={{width:'30px',height:'30px'}}/>
                <div className="chat__top__box__cont">
                    <h3>Saba Marghania</h3>
                    <p>@SMarghania</p>
                </div>
            </div>
            <SettingsOutlinedIcon style={{cursor:'pointer'}}/>
            </div>
            
            <div className="chat__message__section">
            {messages.map((value)=>{
                  return (
                      <ChatProfile
                      key={value._id}
                      message={value.message}
                      messageimg={value.messageimg}
                      />
                  )
              })}
            </div>

            <div className="chat__bottom__box">
                <div className="chat__bottom__form">
                    <div className="chat__bottom__icons">
                    <div className="home__uploadImage">
                        <label htmlFor="messageImage">
                            <ImageOutlinedIcon style={{color:'rgba(29,161,242,1.00)',cursor:'pointer'}}/>
                        </label>
                        <input id="messageImage" 
                        onChange={onChangeFile} 
                        name="messageImage" 
                        type="file" 
                        />

                    </div>
                    </div>
                    <div className="chat__bottom__input">
                        <input onChange={ (e) => setMessage(e.target.value)} type="text" placeholder='Start a new message' />
                    </div>
                    <div className="chat__bottom__icons2 ">
                        <SendIcon  onClick={file ? HandleMessage : HandleText} style={{color: "rgb(29, 161, 242)",cursor:'pointer'}} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Chat
