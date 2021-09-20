import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Home.css'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import Axios from 'axios'
import Post from './Post'
import Poll from './Poll'
import { useSelector } from "react-redux";
import Modal from '@material-ui/core/Modal';
function Home() {
    //post  


    const [post, setPost]=useState("");
    const [users, setUsers]= useState([])
    const[postsArr, setPostsArr] = useState([])
    //image
    const [fileData, setFileData] = useState('');
    const [images, setFile] = useState("");
    //modal
    const [open, setOpen] = useState(false);
    //poll
    const [title, setTitle] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const[poll,setPoll] = useState([])
    const[polls,setPolls] = useState([])
    //load
    const [load, setLoad] = useState(false);

//select image
const onChangeFile = (e) =>{
    setFileData(e.target.files[0]);
    setFile(e.target.value);
}

 //modal
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
   //get data
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
       
           if(load) {

            setTimeout(() => {
              setLoad(false);
            }, 1500)
          }
       return () => flag = false
   }, [load])

     
    const AddPosts2 = async (e)  =>{
 
        const formData = new FormData();
        formData.append("post", post)
        e.preventDefault()

        await Axios.post("http://localhost:3001/insert2",formData)
        .then(() => {
            setPost('');
            setLoad(true);
          })

        .catch((err)=>{
            console.log(err);
        })
    }

    const AddPosts = async (e)  =>{
  
        const formData = new FormData();
        formData.append("post", post)
        formData.append("image", fileData)
        e.preventDefault()
       
       await Axios.post("http://localhost:3001/insert",formData)
       .then(() => {
        setFileData('');
        setLoad(true);
      })
       .catch((err)=>{
           console.log(err);
       })

    }

    const AddPoll =  (e)  =>{
   
        e.preventDefault()
        setOpen(false)
        Axios.post("http://localhost:3001/poll",{
           title:title,
           option1:option1,
           option2:option2,
           option3:option3,
        })
      
    .then(()=>setLoad(true))
       .catch((err)=>{
           console.log(err);
       })

    }
    const user = userInfo.username
    
    const body = (
        <div className="modal_body">
            <h1>Make a poll</h1>
            <div className="modal_question">
                    <textarea
                    onChange={(e)=>setTitle(e.target.value)}
                    wrap="soft" 
                    placeholder='Ask a question...' 
                    style={{resize:'none'}}></textarea>
            </div>
            <div className="modal_body_cont">
                <input onChange={(e)=>{setOption1(e.target.value)}} type="text" placeholder='Choice 1' />
                <input onChange={(e)=>{setOption2(e.target.value)}} type="text" placeholder='Choice 2' />
                <input onChange={(e)=>{setOption3(e.target.value)}} type="text" placeholder='Choice 3' />
            </div>
            <div className="modal_button">
                <button type='submit' onClick={AddPoll}>Tweet</button>
            </div>
       
        </div>
      );
    return (
        <div className='home'>
        <div className='home_cont'>

            <div className="homefile_title">
                <h3>Home</h3>
            </div>
            
            <div className="home__profile_cont">
            <div className="home__profile">
                <Avatar src={userInfo?.pic} style={{width:'50px',height:'50px'}} />
                <div className="home__profile_input">
                    <input
                    onChange={(e)=>setPost(e.target.value)}
                    type="text"  
                    placeholder="What's happening?"/>
                </div>

                </div>

                <form>
                <div className="home__actions">
                    <div className="home__actions_icons">
                    <div className="home__uploadImage">
                        <label htmlFor="postImage">
                            <ImageOutlinedIcon style={{color:'rgba(29,161,242,1.00)',cursor:'pointer'}}/>
                        </label>
                        <input id="postImage" 
                        onChange={onChangeFile} 
                        name="file" 
                        type="file" 
                        />

                    </div>
                   
                        <PollOutlinedIcon onClick={handleOpen} style={{color:'rgba(29,161,242,1.00)',cursor:'pointer'}}/>
                    </div>
                  {(post || fileData)  &&  <button onClick={fileData ? AddPosts : AddPosts2} type='submit'>Tweet</button>}
                </div>
                </form>
            </div>
            </div>
            <div className="reverse">

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

            <div className="Polls">
                  {polls.map((val)=>{
                  return (
                      <Poll
                      key={val._id}
                      id={val._id}
                      title={val.title}
                      option1={val.option1}
                      option2={val.option2}
                      option3={val.option3}
                      />
                  )
              })}
            </div>
            <div className='modal'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>
            </div>
            </div>
        </div>
    )
}

export default Home
