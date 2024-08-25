import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocument, HiDocumentText, HiOutlineExclamationCircle, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashBoardComp() {
  const [showMore, setShowMore ] = useState(true)
  const [showModal, setShowModal ] =useState(false);
  const [postIdToDelete, setPostIdToDelete ] = useState('');
  const [postIdForUser, setPostForUser ] = useState([]);


  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [userPosts, setPosts ] = useState([]);  
  const [totalUsers, setTotalUsers ] = useState(0);
  const [ totalPosts, setTotalPosts ] = useState(0);
  const [ totalComments, setTotalComments ] = useState(0);
  const [ lastMonthUsers, setLastMonthUsers] = useState(0);
  const [ lastMonthPosts, setLastMonthPosts] = useState(0);
  const [ lastMonthComments, setLastMonthComments] =useState(0);  
  const   {currentUser } = useSelector( (state)=> state.user);
  const [ user, setUser ] = useState({});
  



 



  useEffect(()=>{

    const fetchUsers  = async() =>{
      try{
const res = await fetch('/api/user/getusers?limit=5');
      const data = await res.json();  
      if(res.ok){
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }  
    }
    catch(error){
    console.log(error.message);
    }
  }
    const fetchPosts  = async() =>{
      try{
        const res = await fetch('/api/post/getposts?limit=5');
              const data = await res.json();  
              if(res.ok){
                setPosts(data.posts);
                setTotalPosts(data.totalPosts);
                setLastMonthPosts(data.lastMonthPosts);
              }  
            }
            catch(error){
            console.log(error.message);
            }
      
    }
    const fetchComments  = async() =>{
      try{
        const res = await fetch('/api/comment/getcomments?limit=5');
              const data = await res.json();  
              if(res.ok){
                setComments(data.comments);
                setTotalComments(data.totalComments);
                setLastMonthComments(data.lastMonthComments);
              }  
            }
            catch(error){
            console.log(error.message);
            }
      
    }
    if(currentUser.isAdmin){
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
    
  },[currentUser]); 

  const handleShowMore = async () =>{
    const startIndex = userPosts.length;
    try{
const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
   const data = await res.json();
   if(res.ok){
    setPosts((prev) => [...prev, ...data.posts]);
    if(data.posts.length < 9){
      setShowMore(false);
    }
   }
    }catch(error){
      console.log(error.message);    }
  }
  const handleDeletePost = async()=>{
try{
const res = await fetch(`/api/post/deletes/${postIdToDelete}`,
  {
    method:'DELETE',
  }
);
const data = await res.json();
if(!res.ok){
  console.log(data.message);
}else{
  setPosts((prev) =>
  prev.filter((post)=>post._id !== postIdToDelete));
  setShowModal(false);
}
}catch(error){
console.log(error);
}
  }
  


  return (
  
<div className="p-3 md:mx-auto flex flex-wrap gap-4 h-30 ">
  <div className='flex flex-row'>
  <div className='flex flex-wrap gap-4 justify-center '>
  <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full 
  rounded-md shadow-md'>
    <div className="flex justify-between  ">
      <div>
        <h3 className='text-gray-500 text-md uppercase'>Total users</h3>
        <p className='text-2xl'>{totalUsers}</p>
        </div>
        <HiOutlineUserGroup className='bg-teal-600 text-white 
        rounded-full text-5xl p-3 shadow-lg'/>
      </div>
      <div className='flex gap-2 text-sm'>
        <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp/> {lastMonthUsers}</span>
    <div className='text-gray-500'>Last month users</div>
      </div>
      </div>  
  </div>
  <div className='flex flex-wrap gap-4 justify-center'>
  <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full 
  rounded-md shadow-md'>
    <div className="flex justify-between  ">
      <div>
        <h3 className='text-gray-500 text-md uppercase'>Total comments</h3>
        <p className='text-2xl'>{totalComments}</p>
        </div>
        <HiAnnotation  className='bg-indigo-600 text-white 
        rounded-full text-5xl p-3 shadow-lg'/>  
      </div>
      <div className='flex gap-2 text-sm'>
        <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp/> {lastMonthComments}</span>
    <div className='text-gray-500'>Last month comments</div>
      </div>
      </div>  
  </div>
  <div className='flex flex-wrap gap-4 justify-center'>
  <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full 
  rounded-md shadow-md'>
    <div className="flex justify-between  ">
      <div>
        <h3 className='text-gray-500 text-md uppercase'>Total posts</h3>
        <p className='text-2xl'>{totalPosts}</p>
        </div>
        
        <HiDocumentText  className='bg-lime-600 text-white 
        rounded-full text-5xl p-3 shadow-lg'/>
      </div>
      <div className='flex gap-2 text-sm'>
        <span className='text-green-500 flex items-center'>
            <HiArrowNarrowUp/> {lastMonthPosts}</span>
    <div className='text-gray-500'>Last month posts</div>
      </div>
      </div>  
  </div>
  </div>
  <div className='relative'>
  <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-300 '>
      {   userPosts.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head  >
            <Table.HeadCell >Data updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell><span>Edit</span></Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
          
            <Table.Body className='divide-y'  key ={post._id}>
              <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700' >
                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell><Link to={`/post/${post.slug}`}>
                <img
                src={post.image}
                alt={post.title}
                className="w-10 h-10 object-cover bg-gray-400"/></Link></Table.Cell>
                <Table.Cell><Link 
                className='font-medium text-gray-900 dark:text-white'to={`/post/${post.slug}`}>
                  {post.title}</Link></Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline 
                  cursor-pointer' onClick={()=>{setShowModal(true),
                  setPostIdToDelete(post._id)}}>Delete</span>
                </Table.Cell>
              <Table.Cell></Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline ' to= {`/update-post/${post._id}`}>
                  <span >Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500' self-center text-sm py-7>show more</button>
          )
        }
        </>
      )
      :( <p> You havae no posts yet </p>) }
      <Modal show={showModal}
  onClose={() => setShowModal(false)}
  popup size='md'>
    <Modal.Header/>
    <Modal.Body>
      <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400
      dark:text-gray-200 mb-4 mx-auto'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400
      '>Are you sure want to delete this post ?</h3>
<div className='flex justify-between md:mt-5'>
  <Button color='failure' onClick={handleDeletePost}> Yes, I am sure</Button>
  <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
</div>
    </Modal.Body>
  </Modal>
    </div>
  </div>
</div>

  )
}