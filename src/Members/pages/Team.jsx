import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
const Team = () => {
  return (
    <div className='w-screen m-0 p-0 '>
      <nav className='clear-both'>
        <Navbar/>
      </nav>
      <div className='w-screen h-screen text-black bg-orange-500 clear-both'>
        <h1>
        This section is for group picture of scient
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quo quasi modi officiis quas velit aliquid saepe, architecto blanditiis excepturi nesciunt in doloribus, cupiditate a obcaecati nobis autem enim quis cumque alias eum impedit cum optio ex. Veritatis, maiores ipsum dolorem dolore cum, natus facere aut, error recusandae perferendis odio! Quis quasi odio aliquam quod deleniti.
        </h1>
      </div>
      <footer className='w-screen clear-both'>
        <Footer/>
      </footer>
    </div>
  )
}

export default Team
