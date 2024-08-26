import React, { useEffect, useState } from 'react'
import {Button, Select, TextInput} from 'flowbite-react'
import {useLocation, useNavigate} from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sideBarData, setSideBarData ] = useState({
    searchTerm:'',
    sort:'desc',
    category:'uncategorized'
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
const navigate = useNavigate();
  useEffect(()=>{
const urlParams = new URLSearchParams(location.search);
const searchTermFromUrl = urlParams.get('searchTerm');
const sortFromUrl = urlParams.get('sort');
const categoryFromUrl = urlParams.get('category');
if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
  setSideBarData({
    ...sideBarData,
    searchTerm:searchTermFromUrl,
    sort:sortFromUrl,
    category: categoryFromUrl,
  })
}

const fetchPosts = async() =>{
  setLoading(true);
  const searchQuery = urlParams.toString();
  const res = await fetch(`/api/post/getposts?${searchQuery}`);
  const data = await res.json();
console.log({searchQuery});
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
  },[location.search]);

  const handleChange =(e)=>{
    if(e.target.id === 'search-term'){
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      })
    }
    if(e.target.id === 'sort'){
      const order = e.target.value || 'desc';
      setSideBarData({ ...sideBarData, sort:order});
    }
if(e.target.id === 'category'){
  const category = e.target.value || 'uncategorized';
  setSideBarData({ ...sideBarData,category});

}
  }
  console.log(sideBarData)

const handleSubmit  = (e) =>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm', sideBarData.searchTerm);
  urlParams.set('sort', sideBarData.sort)
  urlParams.set('category', sideBarData.category);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`)

}
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen
       border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2 '>
           <label className='whitespace-nowrap font-semibold'>Search Term:</label> 
           <TextInput placeholder='Search...' id='search-term' type='text'
           value={sideBarData.searchTerm} onChange={handleChange}/>

          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sideBarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select onChange={handleChange} value={sideBarData.category} id='category'>
            <option value='uncategorized' >Select a language</option>
          <option value='c'>C</option>
          <option value='cpp'>C++</option>
          <option value='java'>Java</option>
          <option value='python'>Pthon</option>
            </Select>
          </div>
          <Button type='submit' onSubmit={handleSubmit} className='bg-blue-600'>Apply Filters</Button>
          
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b
        border-gray-500 p-3 mt -5'>Post results</h1> 
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
