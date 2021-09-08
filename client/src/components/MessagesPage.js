import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './MessagesPage.css'
import {
    Link
  } from "react-router-dom";

function MessagesPage() {
    return (
        <div className='messagespage'>
            <div className="messagespage__top__box">
                <h2>Messages</h2>
            </div>
            <div className="messagespage__list">
                <Link to='/chat' style={{textDecoration:'none',color:'#000'}} >
                <div className="messagespage__profile">
                    <Avatar style={{width:'50px',height:'50px'}}/>
                    <div className="messagespage__profile_cont">
                        <div className="messagespage__profile-name">
                            <h4>test@gmail.com</h4>
                            <p>@testName</p>
                        </div>
                    
                        <div className="messagespage__message">
                            <p>test</p>
                        </div>
            
                </div>
                </div>
                </Link>
                <div className="messagespage__profile">
                    <Avatar style={{width:'50px',height:'50px'}}/>
                    <div className="messagespage__profile_cont">
                        <div className="messagespage__profile-name">
                            <h4>test@gmail.com</h4>
                            <p>@testName</p>
                        </div>
                    
                        <div className="messagespage__message">
                            <p>test</p>
                        </div>
            
                </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesPage
