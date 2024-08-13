import {Avatar, Dropdown, Navbar,TextInput } from 'flowbite-react';
import { Link , useLocation,useNavigate } from 'react-router-dom' ;
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon ,FaSun} from 'react-icons/fa';
import { Button } from 'flowbite-react';
import { useSelector ,useDispatch} from 'react-redux';
  import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';




export default function Header() {
  const {currentUser}=useSelector(state=>state.user);
  const {theme}=useSelector(state=>state.theme)
  const location = useLocation();
  const navigate = useNavigate();
  const path=useLocation.pathname;
  const dispatch=useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

console.log(searchTerm);
  useEffect( ()=> {
    const urlParams = new  URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }

  },[location.search])

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

const handleSubmit = (e) =>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm', searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);

}
  return (
    <Navbar className='border-b-2 '  >
      <Link to='/' className="self-centtespace-nowrap
      text-sm sm:text-xl font-semibold dark:text-white"><span className="
       px-2 py-1 bg-blue-600 rounded-lg text text-white">{"<Code/>"}</span>Blog
    </Link>
    <form onSubmit={handleSubmit}><TextInput type='text'
    placeholder='Search...'
    rightIcon={AiOutlineSearch}
    value ={searchTerm}
    onChange= {(e)=>setSearchTerm(e.target.value)}
    className='hidden lg:inline'/>
    </form>
    <Button className="w-12 h-10 lg:hidden " color="gray" pill>
      <AiOutlineSearch/>
    </Button>
    <div className="flex gap-2 md:order-2">
      <Button className="w-12 h-10 hidden sm:inline" color='gray' pill onClick={()=>dispatch(toggleTheme())}>
        {theme==='light'?<FaMoon/>:<FaSun/>}
      </Button>
      {currentUser?(
        <Dropdown arrowIcon={false}
        inline
        label={
          <Avatar 
          alt='user'
          img={currentUser.profilePicture}
          rounded/>
        }>
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>

<Dropdown.Header >
  <Link to={'/dashboard?tab=profile'}><Dropdown.Item>Profile</Dropdown.Item></Link>
<Dropdown.Divider/>
<Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
</Dropdown.Header>

        </Dropdown>
      ):(
      <Link to='/sign-in'>
      <Button  gradientDuoTone="purpleToBlue" outline>Sign In</Button>
     </Link>
      )}

    <Navbar.Toggle />
     </div>

     <Navbar.Collapse>
        <Navbar.Link active={path==='/'} as={'div'}>
        <Link to="/">Home</Link>
      </Navbar.Link>
      <Navbar.Link active={path==='/about' } as={'div'}>
        <Link to="/about">About</Link>
      </Navbar.Link>
      <Navbar.Link active={path==='/problems'} as={'div'}>
        <Link to="/problems">Problems</Link>
      </Navbar.Link>
      <Navbar.Link active={path==='/compiler'} as={'div'}>
        <Link to="/compiler">Compiler</Link>
      </Navbar.Link>
     </Navbar.Collapse>
     </Navbar>
  )
}
