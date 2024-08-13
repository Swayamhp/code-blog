import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function DashSiderbar() {
  const dispatch = useDispatch();
  const location=useLocation();
  const [tab,setTab]=useState('');
  const { currentUser } = useSelector(state=>state.user);
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const tabFormUrl=urlParams.get('tab');
if(tabFormUrl){
  setTab(tabFormUrl);
}  },[location.search]);

const handleSignOut = async () => {
  try{
  const res = await fetch('/api/user/signout', {
    method: 'POST',
  });
  const data = await res.json();
  if(!res.ok){
    console.log(data.message);
  }else{
    dispatch(signOutSuccess())
  }

}catch(error){
  console.log(error.message)
}
}
  return (
    <Sidebar className='w-full md:w-56 '>
      <Sidebar.Items >
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab==='profile'}
           icon={HiUser}
           label= { currentUser.isAdmin ? ('Admin'):'User'}labelColor='dark' as='div'>
            Profile
          </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
             <Link to='/dashboard?tab=dashboards'>
             <Sidebar.Item
             active={tab === 'dashboards'}
             icon={HiAnnotation} as='div'>
               Dashboards</Sidebar.Item></Link>
          )}  
          {currentUser.isAdmin && (
             <Link to='/dashboard?tab=posts'>
             <Sidebar.Item
             active={tab === 'posts'}
             icon={HiDocumentText} as='div'>
               Posts</Sidebar.Item></Link>
          )}
          {currentUser.isAdmin && (
             <Link to='/dashboard?tab=users'>
             <Sidebar.Item
             active={tab === 'users'}
             icon={HiOutlineUserGroup} as='div'>
               Users</Sidebar.Item></Link>
          )}
          {currentUser.isAdmin && (
             <Link to='/dashboard?tab=comments'>
             <Sidebar.Item
             active={tab === 'comments'}
             icon={HiAnnotation} as='div'>
               Comments</Sidebar.Item></Link>
          )}
         
          <Sidebar.Item  icon={HiArrowSmRight}
           onClick={handleSignOut} className='cursor-pointer'>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
