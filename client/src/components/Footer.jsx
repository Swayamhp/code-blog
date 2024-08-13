import React from 'react'
import {Footer} from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsFacebook,BsTwitterX,BsInstagram,BsGithub,BsDribbble} from 'react-icons/bs'
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
  <div className=' grid w-full justify-between sm:flex mid:grid-cols-1'>
  <div className='mt-5'>
    <Link to='/' className="self-centtespace-nowrap
      text-lg sm:text-xl font-semibold dark:text-white"><span className=" px-2 py-1 bg-blue-600 rounded-lg text text-white">{"<Code/>"}</span>Blog
    </Link>
    </div>
    <div className='grid grid-cols-2 gap-8 sm:mt-4  sm:grid-cols-3 sm:gap-6'>
      <div>
      <Footer.Title title='About'/>
      <Footer.LinkGroup col>
        <Footer.Link href='https://www.100jsprojects.com'
        target='_blank'
        rel='noopener noreferrer'>100 top interview problems</Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup col>
        <Footer.Link href='/about'
        target='_blank'
        rel='noopener noreferrer'>Swayam's blog</Footer.Link>
        </Footer.LinkGroup>
      </div>
      
      <div>
      <Footer.Title title='Follow us'/>
      <Footer.LinkGroup col>
        <Footer.Link href='github.com'
        target='_blank'
        rel='noopener noreferrer'>Github</Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup col>
        <Footer.Link href='/about'
        target='_blank'
        rel='noopener noreferrer'>Discord</Footer.Link>
        </Footer.LinkGroup>
      </div>
      <div>
      <Footer.Title title='Legal'/>
      <Footer.LinkGroup col>
        <Footer.Link href='####'
        target='_blank'
        rel='noopener noreferrer'>Privacy Policy</Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup col>
        <Footer.Link href='/about'
        target='_blank'
        rel='noopener noreferrer'>Terms & Conditions</Footer.Link>
        </Footer.LinkGroup>
      </div>

    </div>
    </div>
    <Footer.Divider />
    <div className=' w-full sm:flex sm:items-center sm:justify-between'>
      <Footer.Copyright
      href='#'
      by="Swayam's blog"
      year={new Date().getFullYear()}/>
      <div className='flex gap-6 sm:mt-0 mt-4'>
        <Footer.Icon href='#' icon={BsFacebook}/>
        <Footer.Icon href='#' icon={BsInstagram}/>
        <Footer.Icon href='#' icon={BsGithub}/>
        <Footer.Icon href='#' icon={BsTwitterX}/>
        <Footer.Icon href='#' icon={BsDribbble}/>
      </div>
    </div>
    </div>
    </Footer>
  )
}
