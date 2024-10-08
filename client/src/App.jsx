import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

import Header from "./components/Header"
import FooterCom from "./components/Footer"
import PrivateRoute from "./components/privateRoute"
import AdminPrivateRoute from "./components/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UdatePost"
import PostPage from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
import Compiler from "./pages/Compiler"
import { useSelector } from "react-redux";
import Search from "./pages/Search"
import Problems from "./pages/Problems"
import Dashbord from "./pages/Dashbord"

export default function App() {
  const {currentUser}=useSelector(state=>(state.user))

  return (
  <BrowserRouter>
  <ScrollToTop />
  <Header />
  <Routes>
    <Route path="/" element={<Home />}/>
  <Route path="/about" element={<About />}/>
   <Route path="/sign-in" element={<Signin/>}/>
   <Route path="/sign-up" element={<Signup />}/>
   <Route path='/search' element={<Search/>} />
   <Route path="/problems" element={<Problems />}></Route>

   <Route element={<PrivateRoute/>}>
    <Route path="/dashboard" element={<Dashbord />}/>
</Route>
   <Route path="/compiler"
   element={currentUser?(<Compiler />):(<Navigate to='/sign-in'/>)}/>
   <Route path='/post/:postSlug' element={<PostPage />}/>
   <Route path='create-post' element={<CreatePost />} />
   <Route path='/update-post/:postId' element={<UpdatePost/>}/>
<Route element={<AdminPrivateRoute />}>
</Route>
  </Routes>
  <FooterCom />
  </BrowserRouter>
  )
}

