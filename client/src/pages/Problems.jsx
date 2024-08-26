import React from 'react'
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import Arrays  from '../ProblemTypes/Arrays';
import Strings from '../ProblemTypes/Strings';
import LinkedLists from '../ProblemTypes/LinkedLists';
import DashProblem from './DashProblem';
import Tree from '../ProblemTypes/Tree';
import Stack from '../ProblemTypes/Stack';
import Queue from '../ProblemTypes/Queue';


export default function Problems() {
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
        <DashProblem />
      </div>
      {/* profile */}
      {tab === 'arrays' && <Arrays />}
      {/* posts */}
      { tab ===  'strings' && <Strings />}
      {/* users */}
      { tab === 'linkedlists' && <LinkedLists /> }
      {tab === 'tree' && <Tree />}
    {/* comments */}
    { tab === 'stack' && <Stack />}
    {/* dashbords */}
    {tab === 'queue' && <Queue />}
    </div>
  )
}