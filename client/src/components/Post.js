import React,{useState} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Axios from 'axios'
import Modal from '@material-ui/core/Modal';
import {  useSelector } from "react-redux";

function Post({post,image,id}) {
    const [open, setOpen] = useState(false);
    const [Isopen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [newText, setNewText] = useState('')
    const [newFile, setNewFile] = useState('')
    const [newFileData, setNewFileData] = useState('')

    //file

    const onChangeFile = (e) =>{
     setNewFile(e.target.files[0]);
     setNewFileData(e.target.value)
   }

 //modal
 const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //edit & del modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

//edit post
/* created two buttons to not get
  undefined of originalName in nodejs

  editPost will post text and image
  editPost2 only text
*/
  const editPost = () =>{
    setUpdate(true)
    
    setTimeout(()=>{
        setIsOpen(false);

    },500)
    const formData = new FormData();
    formData.append("id", id)
    formData.append("newText", newText)
    formData.append("image", newFile)
    setTimeout(()=>{
      window. location.reload()

  },1000)
     Axios.put("http://localhost:3001/edit",formData)
    
  }
  const editPost2 = () =>{
    setUpdate(true)
    
    setTimeout(()=>{
        setIsOpen(false);

    },500)
    setTimeout(()=>{
      window. location.reload()

  },1000)
    const formData = new FormData();
    formData.append("id", id)
    formData.append("newText", newText)

     Axios.put("http://localhost:3001/edit2",formData)
    
  }
  //delete post
  const delPost = async () =>{
    window. location.reload()

  await  Axios.delete(`http://localhost:3001/delete/${id}`)
 
  }


  const body = (
    <div className="edit_modal_body">
        <h1>Edit the post</h1>

            {update && <h1 style={{color:'green',marginTop:'10px'}}>Post has been updated</h1>}
        <div className="edit_modal_body_cont">
            <input onChange={(e)=>{setNewText(e.target.value)}} value={newText} type="text" placeholder='Text..' />
            <input onChange={onChangeFile} name='file' type="file" />
        </div>
        
        <div className="edit_modal_button">
            <button onClick={ newFile ? editPost : editPost2} type='submit'>Edit</button>
        </div>
   
    </div>
  );
    return (
       
        <div className='post'>
             <Avatar src={userInfo?.pic} style={{width:'50px',height:'50px'}}/>
            <div className="post__info">
              <div className="post__top_info">
                 
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
                                <div onClick={()=>delPost(id)} className="post_modal__option">
                                    <DeleteOutlineIcon style={{color:'red'}}/>
                                    <h4>Delete</h4>
                                </div>
                                <div onClick={handleOpen}  className="post_modal__option">
                                    <EditOutlinedIcon style={{color:'black',fontSize:'20px'}}/>
                                    <h4 style={{color:'#000'}} >Edit</h4>
                                </div>
                            </div>
                            ) : null}
                        </div>
                        </ClickAwayListener>
                </div>
                </div>
                   <p>{post}</p>
                 {image && <img width='300px' src={image}  alt=""/> }

               
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

export default Post
