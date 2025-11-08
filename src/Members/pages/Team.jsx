import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap'
import ScientMembers from '../components/ScientMembers'


const Team = () => {
  return (
    <div className='w-screen m-0 p-0 '>
      <nav className='clear-both'>
        <Navbar/>
      </nav>
      <ScientMembers/>
      <footer className='w-screen clear-both'>
        <Footer/>
      </footer>
    </div>
  )
}

export default Team
