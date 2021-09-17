import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Profile.css'
import {useSelector} from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Profile() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
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
                    <Avatar src={userInfo.pic} style={{width:'150px',height:'150px',marginLeft:'20%'}}/>
                    <div className="profile__profile_cont">
                    <div className="profile__profile-name">
                        <h3>{userInfo?.email}</h3>
                        <p>@{userInfo?.username}</p>
                    </div>
                <div className="profile__editProfile">
                    <button type='submit'>Edit profile</button>
                    </div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Profile
