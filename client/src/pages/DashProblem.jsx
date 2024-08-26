import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

export default function DashProblem() {
  const location=useLocation();
  const [tab,setTab]=useState('');

  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const tabFormUrl=urlParams.get('tab');
if(tabFormUrl){
  setTab(tabFormUrl);
}  },[location.search]);

  return (
    <div>
      {/* <DashProblems/> */}
<Sidebar className='w-full md:w-56 '>
<Sidebar.Items >
<Sidebar.ItemGroup className='flex flex-col gap-1 rounded-md'>
  <Link to='/problems?tab=arrays'>
  <Sidebar.Item  className='hover:bg-slate-300 font-semibold'as='div'
   active={tab === 'arrays'}>
  Arrays
  </Sidebar.Item>
  </Link>
  <Link to='/problems?tab=strings'>

  <Sidebar.Item active={tab === 'strings'} className='hover:bg-slate-300 font-semibold' as='div'>
  String
  </Sidebar.Item>
  </Link>
  <Link to='/problems?tab=linkedlists'>
  <Sidebar.Item className='hover:bg-slate-300 font-semibold'
  active={tab === 'linkedlists'} as='div'>
  LinkedLists
  </Sidebar.Item>
  </Link>
  <Link to='/problems?tab=tree'>

  <Sidebar.Item className='hover:bg-slate-300 font-semibold'
  active={tab === 'tree'} as='div'>
  Tree
  </Sidebar.Item>
  </Link>
  <Link to='/problems?tab=stack'>

  <Sidebar.Item className='hover:bg-slate-300 font-semibold' 
  active={tab === 'stack'}as='div'>
  Stack
  </Sidebar.Item>
  </Link>  <Link to='/problems?tab=queue'>

  <Sidebar.Item className='hover:bg-slate-300 font-semibold'
  active={tab === 'queue'} as='div'>
  Queue
  </Sidebar.Item>
  </Link>
  
  </Sidebar.ItemGroup>
  </Sidebar.Items>

  </Sidebar>    </div>
  )
}
