import React from 'react'
import './SidebarRight.css'
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

function SidebarRight() {
    return (
        <div className='sidebarR'>
            <div className="sidebarR__search">
                <input type="text" placeholder='Search Twitter' />
            </div>

            <div className="sidebarR__trends">
                <div className="sidebarR__trends-title">
                    <h2>Trends for you</h2>
                </div>
                <div className="sidebarR__trending">
                <div className="sidebarR__trending_cont">

                    <p>Politics · Trending</p>
                    <h4>Taliban</h4>
                    <p>3.03M Tweets</p>
                </div>
                <MoreHorizOutlinedIcon/>
                </div>

                <div className="sidebarR__trending">
                <div className="sidebarR__trending_cont">

                    <p>Politics · Trending</p>
                    <h4>Taliban</h4>
                    <p>3.03M Tweets</p>
                </div>
                <MoreHorizOutlinedIcon/>
                </div>

                <div className="sidebarR__trending">
                <div className="sidebarR__trending_cont">

                    <p>Politics · Trending</p>
                    <h4>Taliban</h4>
                    <p>3.03M Tweets</p>
                </div>
                <MoreHorizOutlinedIcon/>
                </div>

                <div className="sidebarR__trending">
                <div className="sidebarR__trending_cont">

                    <p>Politics · Trending</p>
                    <h4>Taliban</h4>
                    <p>3.03M Tweets</p>
                </div>
                <MoreHorizOutlinedIcon/>
                </div>

                <div className="sidebarR__trending">
                <div className="sidebarR__trending_cont">

                    <p>Politics · Trending</p>
                    <h4>Taliban</h4>
                    <p>3.03M Tweets</p>
                </div>
                <MoreHorizOutlinedIcon/>
                </div>                
        </div>
        </div>
    )
}

export default SidebarRight
