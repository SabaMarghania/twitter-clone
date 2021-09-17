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
    const [fileData, setFileData] = useState('');
    const [load, setLoad] = useState(false);
    const [images, setFile] = useState("");

    const onChangeFile = (e) =>{
        setFileData(e.target.files[0]);
        setFile(e.target.value)
    }

    useEffect(() => {
        let flag = true
     // http://localhost:3001
        Axios.get("http://localhost:3001/getMessages",)
            .then((res) => {
                if (flag) {
                    setMessages(res.data);
                }
            })
            if(load) {
                setTimeout(() => {
                  setLoad(false);
                }, 1000)
              }
          
        return () => flag = false
    }, [load])

    const HandleMessage = async (e)  =>{
        if(load===false){
            setLoad(true)
        }else{
            setLoad(false)
        }
        e.preventDefault()
        const formData = new FormData();
        formData.append("message", message)
        formData.append("image", fileData)
       

       await Axios.post("http://localhost:3001/message",formData)
       .then(() => {
        setFileData('');
        setMessage('');
        setLoad(true);
      })
       .catch((err)=>{
           console.log(err);
       })

    }
    const HandleText =  async (e)  =>{
        if(load===false){
            setLoad(true)
        }else{
            setLoad(false)
        }
        e.preventDefault()
        const formData = new FormData();
        formData.append("message", message)
       

        await Axios.post("http://localhost:3001/message2",formData)
        .then(() => {
            setMessage('');
            setLoad(true);
          })
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
                      id={value._id}
                      message={value.message}
                      messageimg={value.image}
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
                        name="file" 
                        type="file" 
                        />

                    </div>
                    </div>
                    <div className="chat__bottom__input">
                        <input onChange={ (e) => setMessage(e.target.value)} type="text" placeholder='Start a new message' />
                    </div>
                    <div className="chat__bottom__icons2 ">
                  { (message || fileData)  &&    <SendIcon  onClick={fileData ? HandleMessage : HandleText} style={{color: "rgb(29, 161, 242)",cursor:'pointer'}} />
 }
  </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
