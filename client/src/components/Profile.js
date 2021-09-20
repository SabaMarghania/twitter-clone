import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios'
import Moment from 'react-moment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Post from './Post'

function Profile() {
    const[postsArr, setPostsArr] = useState([])
    const [load, setLoad] = useState(false);
    const[polls,setPolls] = useState([])

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
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
                        {data.map((item)=>{
                            return (
                                <div key={item._id}>
                                    <div style={{display:'flex',color:'gray',alignItems:'center',marginTop:'10px'}} className="date">
                                    <DateRangeIcon/>   
                                        <p>Joined </p>
                                    <Moment style={{marginLeft:'5px'}} format='MMMM  YYYY,hh:mm:ss'>{item.createdAt }</Moment> 
                                    </div>

                                    
                                </div>
                            )
                        })}
                    </div>
                <div className="profile__editProfile">
                    <button type='submit'>Edit profile</button>
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
        </div>
    )
}

export default Profile
