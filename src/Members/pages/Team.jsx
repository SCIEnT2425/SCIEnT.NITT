import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap'
import ScientMembers from '../components/ScientMembers'


const Team = () => {
    
  return (
    <div className='w-screen flex flex-col '>
        <Navbar/>
      
        <div id='team' className='mt-12'>
          <ScientMembers/>
        </div>
        <div>
          {/*  just for fun */}
          <h1 className='text-2xl font-mono justify-center flex laptop:justify-start'>Sanskar Sharma</h1>
        </div>
        <Footer/>
    </div>
  )
}

export default Team
