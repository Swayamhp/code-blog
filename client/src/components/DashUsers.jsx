import { Alert, Button, Modal, Table, TableCell } from 'flowbite-react';
import React from 'react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa'
import { errorHandler } from '../../../api/utils/error';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [ users, setUsers ] = useState([])
  const [showMore, setShowMore ] = useState(true)
  const [showModal, setShowModal ] =useState(false);
  const [userIdToDelete, setUserIdToDelete ] = useState('');
  const [userDeleteError, setUserDeleteError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect( () => {

    const fetchUsers = async () => {
    try{
const res = await fetch(`/api/user/getusers`);
const data = await res.json();
if(res.ok){
  setUsers(data.users);
  if(data.users.length < 9){
    setShowMore(false);
  }
}
    } catch (error){
console.log(error.message);
    }
  }
    if(currentUser.isAdmin){
      fetchUsers();
    }
  },[currentUser._id]);

  const handleShowMore = async () =>{
    const startIndex = users.length;
    try{
const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
   const data = await res.json();
   if(res.ok){
    setUsers((prev) => [...prev, ...data.users]);
    if(data.users.length < 9){
      setShowMore(false);
    }
   }
    }catch(error){
      console.log(error.message);    }
  };
const handleDeleteUser = async(next) =>{
if(isAdmin){
  setShowModal(false);
}else{
try{
  const res  = await fetch(`/api/user/deletes/${userIdToDelete}`,{
    method: 'DELETE'
});
const data = res.json();
if(res.ok){
  setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
  setShowModal(false);
}else {
  console.log(data.message);
}
}
catch(error){
  next(error.message)
}
}
}
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-300 '>
      {  currentUser.isAdmin && users.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head  >
            <Table.HeadCell >Date created</Table.HeadCell>
            <Table.HeadCell>User image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          {users.map((user) => (
            <Table.Body className='divide-y' key={user._id}> 
              <Table.Row className='bg-white dark:bg-gray-700 dark:border-gray-700' >
                <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10  object-cover bg-gray-400 rounded-full" /></Table.Cell >
                <Table.Cell>
                  {user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}</Table.Cell>
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline 
                  cursor-pointer' onClick={()=>{setShowModal(true),setIsAdmin(user.isAdmin),
                  setUserIdToDelete(user._id)}} >Delete</span>
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
      :( <p> You hava no users yet </p>) }
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
  <Button color='failure'  onClick={handleDeleteUser}> Yes, I am sure</Button>
  <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
</div>
    </Modal.Body>
  </Modal>
    </div>

  )
}
