import React from 'react'
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import Dashusers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashBoardComp from '../components/DashBoardComp';

export default function Dashbord() {
  const location=useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const tabFormUrl=urlParams.get('tab');
if(tabFormUrl){
  setTab(tabFormUrl);
}  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md: w-56'>
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      {/* posts */}
      { tab ===  'posts' && <DashPosts />}
      {/* users */}
      { tab === 'users' && <Dashusers /> }
    {/* comments */}
    { tab === 'comments' && <DashComments />}
    {/* dashbords */}
    {tab === 'dashboards' && <DashBoardComp />}
    </div>
  )
}
