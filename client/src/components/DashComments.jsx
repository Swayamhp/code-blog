import { Alert, Button, Modal, Table, TableCell } from 'flowbite-react';
import React from 'react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa'
import { errorHandler } from '../../../api/utils/error';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [ comments, setComments ] = useState([])
  const [showMore, setShowMore ] = useState(true)
  const [showModal, setShowModal ] =useState(false);
  const [commentIdToDelete, setCommentIdToDelete ] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect( () => {

    const fetchComments = async () => {
    try{
const res = await fetch(`/api/comment/getcomments`);
const data = await res.json();
if(res.ok){
  setComments(data.comments);
  if(data.comments.length < 9){
    setShowMore(false);
  }
}  } catch (error){
console.log(error.message);
    }
  }
    if(currentUser.isAdmin){
      fetchComments();
    }
  },[currentUser._id]);

  const handleShowMore = async () =>{
    const startIndex=comments.length;
    try{
const res = await fetch(`/api/comment/comments?startIndex=${startIndex}`);
   const data = await res.json();
   if(res.ok){
    setComments((prev) => [...prev, ...data.comments]);
    if(data.comments.length < 9){
      setShowMore(false);
    }
   }
    }catch(error){
      console.log(error.message);    }
  };
const handleDeleteComment = async(next) =>{
setShowModal(false);
try{
  const res  = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
    method: 'DELETE'
});
const data = res.json();
if(res.ok){
  setShowModal(false);
  setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
}else {
  console.log(data.message);
}
}
catch(error){
  next(error.message)
}
}
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-300 '>
      {  currentUser.isAdmin && comments.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head  >
            <Table.HeadCell >Date Updated</Table.HeadCell>
            <Table.HeadCell>Comment content</Table.HeadCell>
            <Table.HeadCell>Number of likes</Table.HeadCell>
            <Table.HeadCell>Post Id</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          {comments.map((comment) => (
            <Table.Body className='divide-y' key={comment._id}> 
              <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700' >
                <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{comment.content}</Table.Cell >
                <Table.Cell>
                  {comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline 
                  cursor-pointer' onClick={()=>{setShowModal(true),setIsAdmin(comment.isAdmin),
                  setCommentIdToDelete(comment._id)}} >Delete</span>
                </Table.Cell>
                
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} 
            className='w-full text-teal-500' self-center text-sm py-7>show more</button>
          )
        }
        </>
      )
      :( <p> You hava no coments yet </p>) }
      <Modal show={showModal}
  onClose={() => setShowModal(false)}
  popup size='md'>
    <Modal.Header/>
    <Modal.Body>
      <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400
      dark:text-gray-200 mb-4 mx-auto'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400
      '>{isAdmin?("You cant delete an admin ask to authority"):("Are you sure want to delete this post ?")}</h3>
<div className='flex justify-between md:mt-5'>
  <Button color='failure'  onClick={handleDeleteComment}> Yes, I am sure</Button>
  <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
</div>
    </Modal.Body>
  </Modal>
    </div>

  )
}
