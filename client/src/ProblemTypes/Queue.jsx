import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';

export default function Queue() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(()=>{
    const fetchPosts = async() =>{
      setLoading(true);
      const searchQuery = "searchTerm=queue";
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      const data = await res.json();
      if(!res.ok){
        setLoading(false);
    return;  }
    if(res.ok){
      setPosts(data.posts);
      setLoading(false);
      if(data.posts.length === 9){
        setShowMore(true);
      }else{
        setShowMore(false);
      }
    }
    }
    fetchPosts();
  },[])
  return (
    <div>
       <div className='w-full'>
         
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts</p>
          )}
          {
            loading && (
              <p className='text-xl text-gray-500'>
                Loading...
              </p>
            )
          }
          {
            !loading && posts && posts.map((post)=>
              <PostCard key={post._id} post={post} /> 
            )
          }
        </div>
        </div>
      
    </div>
  )
}
