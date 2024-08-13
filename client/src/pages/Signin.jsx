import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData,setFormData]=useState({});
const{loading,error:errorMessage}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleChange=(e)=>{
setFormData({...formData,[e.target.id]:e.target.value.trim()})  };
const handleSubmit= async(e)=>{
e.preventDefault();
if( !formData.email || !formData.password){
   dispatch(signInFailure("Please fill the fields!"))
}

try{
  dispatch(signInStart())
const res=await fetch('/api/auth/signin',
  {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formData),
  });
  const data=await res.json();
  if(data.success===false){
dispatch(signInFailure(data.message))  }
  if(res.ok){
    dispatch(signInSuccess(data))
    navigate('/');
  }

}catch(error){
  dispatch(signInFailure(error.message))

}
} ;
 return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center md:gap-5">
        {/* {left} */}
      <div className="flex-1">
      <Link to='/' className=" font-bold dark:text-white
      text-4xl"><span className=" px-2 py-1 bg-blue-600 rounded-lg text text-white">{"<Code/>"}</span>Blog
    </Link>
    <p className="text-sm mt-5">This is a site where you can posts your code and review it by user</p></div>
            {/* right */}
<div className='flex-1'>
  <form className='flex-col gap-4' onSubmit={handleSubmit}>
     
      <div>
        <Label value='Your email'/>
        <TextInput 
        type='email'
        placeholder="Email"
        id="email"onChange={handleChange}/>
      </div>
      <div>
        <Label value='Your Password'/>
        <TextInput 
        type='password'
        placeholder="*********"
        id="password"onChange={handleChange}/>
      </div>
      <Button  className='mt-2 w-full bg-blue-600' type='submit' >
{        loading?(
  <><Spinner size='sm'/>
  <span className='pl-3'>Loading...</span></>
):('Sign In')

}      </Button>
<OAuth/>
      </form>
      <Label className='mt-4 px-2'>
        <span>Dont have an account?   </span>
        <Link to='/sign-up' className='text-blue-500'>
        Sign Up</Link>
      </Label>
      {errorMessage &&(
        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
      
      )}
            </div>

      </div>
    </div>
  )
}
