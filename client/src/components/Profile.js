import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios'
import DateRangeIcon from '@mui/icons-material/DateRange';
import Post from './Post'
import Modal from '@material-ui/core/Modal';

function Profile() {
    const[postsArr, setPostsArr] = useState([])
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const[polls,setPolls] = useState([])

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    //modal
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
  
    const[data,setData] = useState([])
    useEffect(()=>{
        Axios.get("http://localhost:3001/getUser", )
        .then((res) => {
                setData(res.data);
        })

    },[])
    useEffect(() => {
    
        let  flag = true
         Axios.get("http://localhost:3001/pollsData", )
             .then((res) => {
                 if (flag) {
                     setPolls(res.data);
                 }
             })
  
         Axios.get("http://localhost:3001/read", )
             .then((res) => {
                 if (flag) {
                     setPostsArr(res.data);
                 }
             })
         
         return () => flag = false
     }, [])

     const body = (
        <div className="profile__modal_body">
            <div className="profile__modal__title">
                <h2>Edit profile</h2>
            </div>
            <div className="profile__modal_avatar">
                 <Avatar src={userInfo?.pic} style={{width:'100px',height:'100px'}} />
            </div>
            <div className="profile__modal_body_cont">
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Bio' />
                <input type="text" placeholder='Location' />
                <input type="text" placeholder='Website' />
            </div>
            <div className="profile__modal__birthdate">
                <p>Birth date</p>
                <h3>{userInfo?.birth}</h3>
            </div>
            <div className="profile__modal_button">
                <button type='submit' >Save</button>
            </div>
       
        </div>
      );
    return (
        <div className='profile'>
            <div className="profile__header">
                <div className="profile__top_name">
                    <ArrowBackIcon/>
                    <h2>{userInfo?.username}</h2>
                </div>
                <div className="profile__header__background">
                </div>
                <div className="profile__header__avatar__box">
                    <Avatar src={userInfo?.pic} style={{width:'150px',height:'150px',marginLeft:'20%'}}/>
                    <div className="profile__profile_cont">
                    <div className="profile__profile-name">
                        <h3>{userInfo?.email}</h3>
                        <p>@{userInfo?.username}</p>
                            <div className="profile__birthdate">
                                <DateRangeIcon style={{color:'gray'}}/>
                                <span>Born </span>
                                <p>{userInfo?.birth}</p>
                            </div>     
                    </div>
                <div className="profile__editProfile">
                    <button type='submit' onClick={handleOpen}>Edit profile</button>
                    </div>
                    </div>
                </div>
               
            </div>
            <div className="Posts">
             {postsArr.map((value)=>{
                  return (
                      <Post
                      key={value._id}
                      id={value._id}
                      post={value.posting}
                      image={value.image}
                      />
                  )
              })}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>
        </div>
    )
}

export default Profile
