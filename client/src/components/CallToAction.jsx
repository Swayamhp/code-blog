import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div  className=' flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center
    rounded-tl-3xl rounded-br-3xl text-center gap-4'>
    <div className='flex-1 justify-center flex flex-col '>
<h1 className='text-2xl'>Top 100 interview problems</h1>
<p1 className='text-gray-500 my-2'>Check the different java script items in the website</p1>
<Button gradientDuoTone='purpleToBlue' ><a href='www.google.com' target='_blank'
rel='noopener noreferrer'>Find the link</a></Button>
    </div>
    <div className='flex-1  '>
      <img className='' src='https://www.shutterstock.com/shutterstock/photos/2432854517/display_1500/stock-photo-computer-programmer-using-development-software-2432854517.jpg'/>
    </div>
    </div>
  )
}
