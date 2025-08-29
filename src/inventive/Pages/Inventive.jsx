import React from 'react'
import InventiveHero from '../Components/InventiveHero'
import InnovationJourney from '../Components/InnovationJourney'
import WhyChooseInventive from '../Components/WhyChooseInventive'
import ReadyToInnovate from '../Components/ReadyToInnovate'
import ProgramTimeline from '../Components/ProgramTimeline'
import ProgramDurationCTA from '../Components/ProgramDurationCTA'
import FAQSection from '../Components/FAQSection'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'



const Inventive = () => {
  return (
    <div className=' overflow-hidden'>
        <Navbar/>
        <InventiveHero/>
        <InnovationJourney/>
        <WhyChooseInventive/>
        <ReadyToInnovate/>
        <ProgramTimeline/>
        <ProgramDurationCTA/>
        <FAQSection/>
        <Footer/>
      
    </div>
  )
}

export default Inventive
