import { Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import AceEditor from 'react-ace-builds'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai'

export default function PostPage() {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ post, setPost ] = useState(null);
  const { postSlug } = useParams();
  const [ recentPosts, setRecentPosts ] =useState(null);

  useEffect( () => {

const fetchPost = async () => {
  try {
    setLoading(true);
    const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
    const data = await res.json();
    if(!res.ok){
      setError(true);
      setLoading(false);
      return;
    }
    if(res.ok){
      setPost(data.posts[0]);
      setLoading(false);
      setError(null);
    }
  }catch(error){
    setError(true);
    setLoading(false);
  }
}
fetchPost();
  },[postSlug]);

  useEffect(()=>{
    try{
const fetchRecentPosts = async () =>{
  const res = await fetch(`/api/post/getposts?limit=3`);
  const data = await res.json();
  if(res.ok){
    setRecentPosts(data.posts);
  }
}
fetchRecentPosts();
    }catch(error){
      console.log(error.message);
    }
  })


  if(loading) return (
    <div className="flex justify-center min-h-screen items-center">
      <Spinner size='xl'/>
    </div>
  )
return <main className='p-3 flex flex-col min-h-screen 
max-w-6xl mx-auto'>
  <h1 className='text-3xl mt-10 p-3 text-center 
  font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
  <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
  <Button color='gray' pill size='xs'>{post && post.category}</Button>
</Link>
<img src={post && post.image} alt={post && post.title} className='mt-10
p-3  mx-auto h-80 w-80' />
<div className=' flex flex-row justify-between p-3 border-b border-slate-300 '>
  <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
  <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
</div>
<div className='p-3 max-2-2xl mx-auto w-full post-content '
 dangerouslySetInnerHTML={{__html: post && post.content}}></div>
  <AceEditor mode="c_cpp" theme='monokai' value={post.code}/>

 <div className='max-w-4xl mt-4 mx-auto w-full'><CallToAction/></div>
 <div>
  <CommentSection postId={post._id}/>

<div className="flex flex-col justify-center items-center mb-5">
  <h1 className='text-xl mt-5'> Recent articles</h1>
  <div className='flex flex-wrap justify-center gap-5 mt-5'>
    {
      recentPosts && 
      recentPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))
    }
  </div>
</div>
 </div>
</main>

}
