import React from 'react'
import { spider, delta, ecell, max, sigma, oedc, dc, naksh, psi, rmi, graphique, td, prof, fh, db, ever } from "../assets";
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({p , i}) => {
    const navigate = useNavigate();
    const handleClick = (latestLink) => {
        navigate(latestLink);
    };
     const latestYear = p.years.length > 0 ? p.years[0].link : null;
  return (
    <div className='project-item'
     key={i}  
     onClick={() => latestYear && handleClick(latestYear)}>
        <img src={p.image} alt="ClubLogo"/>
      <div className='projectname'>
      {p.name}
      </div>
      
    </div>
  )
}

export default ProjectCard
