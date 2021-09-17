import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Poll.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Axios from 'axios'
import Modal from '@material-ui/core/Modal';
import {  useSelector } from "react-redux";

function Poll({title,option1,option2,option3,id}) {
    const [checked,setChecked] = useState(false)
    const [checked1,setChecked1] = useState(false)
    const [checked2,setChecked2] = useState(false)
    let [count,setCount] = useState(0)
    let [count1,setCount1] = useState(0)
    let [count2,setCount2] = useState(0)
    const [Isopen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);

    //poll edit
    const [newTitle, setNewTitle] = useState('')
    const [newOption1, setNewOption1] = useState('')
    const [newOption2, setNewOption2] = useState('')
    const [newOption3, setNewOption3] = useState('')

 //modal
 const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

        const func = () =>{
            setCount(count1 || count2===1 ? 0 : 1);
            setChecked(checked1 || checked2 ? false : true)
        } 
        const func1 = () =>{
            setCount1(count || count2===1 ? 0 : 1);
            setChecked1(checked || checked2 ? false : true)
        }
        const func2 = () =>{
            setCount2(count || count1===1 ? 0 : 1);
            setChecked2(checked || checked1 ? false : true)
        }
        const delFun = () =>{
            setChecked(false)
            setChecked1(false)
            setChecked2(false)
            setCount(0)
            setCount1(0)
            setCount2(0)
        }

         //edit & del modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  //edit post
  const editPoll = () =>{
    setUpdate(true)
    
    setTimeout(()=>{
        setIsOpen(false);

    },500)
    Axios.put("http://localhost:3001/editPoll",{
        id:id,
        newTitle:newTitle,
        newOption1:newOption1,
        newOption2:newOption2,
        newOption3:newOption3,
     })
     setTimeout(()=>{
        window. location.reload()
  
    },1000)
  }
  //delete post
  const delPoll = () =>{
    Axios.delete(`http://localhost:3001/deletePoll/${id}`)
        window. location.reload()
  
  }

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

  const body = (
    <div className="edit_poll_modal_body">
        <h1>Edit the poll</h1>

            {update && <h1 style={{color:'green',marginTop:'10px'}}>Poll has been updated</h1>}
        <div className="edit_poll_modal_body_cont">
            <input onChange={(e)=>{setNewTitle(e.target.value)}} type="text" placeholder='Title..' />
            <input onChange={(e)=>{setNewOption1(e.target.value)}} type="text" placeholder='Option 1..' />
            <input onChange={(e)=>{setNewOption2(e.target.value)}} type="text" placeholder='Option 2..' />
            <input onChange={(e)=>{setNewOption3(e.target.value)}} type="text" placeholder='Option 3..' />
        </div>
        <div className="edit_poll_modal_button">
            <button onClick={()=>editPoll(id)} type='submit'>Edit</button>
        </div>
   
    </div>
  );
    return (
        <div className='poll'>
            <Avatar src={userInfo?.pic} style={{width:'50px',height:'50px'}} />
            <div className="post__info">
            <div className="post__info_cont">
                <div className="post__info_names">
                    <h4>{userInfo?.username}</h4>
                    <p>@{userInfo?.username}</p>   
                  
                </div>
                <div className="post__info__edit">
                   
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div className='post_modal_root'>
                        <MoreHorizIcon onClick={handleClick} style={{cursor:'pointer'}}/>
                            {open ? (
                            <div className='post_modal_dropdown'>
                                <div onClick={()=>delPoll(id)} className="post_modal__option">
                                    <DeleteOutlineIcon style={{color:'red'}}/>
                                    <h4>Delete</h4>
                                </div>
                                <div onClick={handleOpen} className="post_modal__option">
                                    <EditOutlinedIcon style={{color:'black',fontSize:'20px'}}/>
                                    <h4 style={{color:'#000'}} >Edit</h4>
                                </div>
                            </div>
                            ) : null}
                        </div>
                        </ClickAwayListener>
                </div>
                
                </div>
             
                <div className="poll_cont">
                    <div className="poll__title">
                        <h4>{title}</h4>
                    </div>
                   
                      <div className="poll__options">
                    {option1 &&
                    <>
                          <div className="poll__option">
                              <div className="poll__option_cont"  onClick={func}>
                               <div style={{width: checked ? '50px' : 'auto',background: checked ? 'rgb(202, 202, 202)' : 'none'}} className="poll__option_count">
                                   
                                <input type="radio" name="option" id=""/>
                                <div className="poll__option__info">
                                    <h4>{option1}</h4>
                                </div>
                               </div>
                              </div>
                              <p>{count}</p>
                         
                          
                        </div>
                    </>
                    }
                    {option2 &&   
                               <div className="poll__option">
                               <div className="poll__option_cont"  onClick={func1}>
                                <div style={{width: checked1 ? '50px' : 'auto',background: checked1 ? 'rgb(202, 202, 202)' : 'none'}} className="poll__option_count">
                                    
                                 <input type="radio" name="option" id=""/>
                                 <div className="poll__option__info">
                                     <h4>{option2}</h4>
                                 </div>
                              
                                </div>
                               </div>
                               <p>{count1}</p>
                          
                           
                         </div>
                        }
                    {option3 && 
                                <div className="poll__option">
                                <div className="poll__option_cont"  onClick={func2}>
                                 <div style={{width: checked2 ? '50px' : 'auto',background: checked2 ? 'rgb(202, 202, 202)' : 'none'}} className="poll__option_count">
                                     
                                  <input type="radio" name="option" id=""/>
                                  <div className="poll__option__info">
                                      <h4>{option3}</h4>
                                  </div>
                               
                                 </div>
                                </div>
                                <p>{count2}</p>
                           
                            
                          </div>
                    }
                    </div>
                  
                    </div>

                    <button onClick={delFun} type="submit">Delete Choice</button>
                </div>
                <Modal
                open={Isopen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>
        </div>
    )
}

export default Poll
