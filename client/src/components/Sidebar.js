import React,{useState,useEffect} from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import './Sidebar.css'
import Home from '../Icons/HomeIcon'
import Sharp from '../Icons/Sharp'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import {
    useHistory,
    Link
  } from "react-router-dom";


function Sidebar() {
    const[modal, setModal] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
      dispatch(logout());
    };

  
    const showMod = () =>{
        setModal(true)
    }
 
    useEffect(()=>{
        if(!userInfo){
            history.push('/')
        }
    },[history,userInfo])

    const modalClose = () =>{
        setModal(false)
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__head_icon">
                <TwitterIcon style={{color:'rgb(28, 164, 218)',fontSize:"35px"}}/>
            </div>
            <div className="sidebar__link_cont">

            <Link to='/home' style={{textDecoration:'none',color:'#000'}} >
                <div className="sidebar__links">
                    <Home/>
                    <h3>Home</h3>
                </div>
                </Link>

                <Link to='/messagesPage' style={{textDecoration:'none',color:'#000'}} >
                <div className="sidebar__links">
                    <EmailOutlinedIcon className='icon'/>
                    <h3>Messages</h3>
                </div>
                </Link>
                <div className="sidebar__links">
                    <Sharp/>
                    <h3>Explore</h3>
                </div>

                <div className="sidebar__links">
                    <NotificationsNoneOutlinedIcon className='icon'/>
                    <h3 >Notifications</h3>
                </div>

                <div className="sidebar__links">
                    <Sharp/>
                    <h3 >Explore</h3>
                </div>

                <div className="sidebar__links">
                    <PersonOutlineOutlinedIcon className='icon'/>
                    <h3 >Profile</h3>
                </div>
                <div className="sidebar__links">
                    <ListAltOutlinedIcon className='icon'/>
                    <h3>Lists</h3>
                </div>
                <div className="sidebar__links">
                    <MoreHorizOutlinedIcon className='icon'/>
                    <h3>More</h3>
                </div>
            </div>

            <div className="sidebar__tweet">
                <button>Tweet</button>
            </div>

        {modal && (
            <div className="sidebar__modal"  >
              <div onClick={logoutHandler} className="post_modal__option" style={{borderRadius:'5px'}}>
                  Logout from 
                  <p style={{marginLeft:'7px',color:'gray'}}>@{userInfo?.username}</p>
                  </div>
                  <p onClick={modalClose}>x</p>
            </div>
        )}

            <div className="sidebar__profile">
                <Avatar src={userInfo?.pic}/>
                <div className="sidebar__profile-name">
                    <h4>{userInfo?.email}</h4>
                    <p>@{userInfo?.username}</p>
                </div>
                <div className="sidebar__settings">
                    <MoreHorizOutlinedIcon 
                    onClick={showMod} 
                    className='icon'
                    style={{cursor:'pointer'}}
                    />
                </div>
            

            </div>
        </div>
    )
}

export default Sidebar
