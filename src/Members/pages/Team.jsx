import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap'
import SCIentMembers from '../components/SCIentMembers'

const Team = () => {
    
  return (
    <div className='w-screen flex flex-col '>
        <Navbar/>
        <div id='team' className='mt-12'>
          <SCIentMembers/>
        </div>
        <Footer/>
    </div>
  )
}

export default Team
