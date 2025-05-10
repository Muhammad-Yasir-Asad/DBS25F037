import React from 'react'
import FreelancerNavbar from '../Freelancer/FreelancerNavbar';
import PersonalInformation from '../Freelancer/PersonalInfoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfessionalInformation from '../Freelancer/ProfessionalInformation';
import StartSelling from '../Freelancer/StartSelling';

const Freelancer = () => {
  return (
    <>
        
        <FreelancerNavbar />
      <Routes>
        <Route path='/start-selling' element={<StartSelling />} />
        <Route path='/personal-information' element={<PersonalInformation />} />
        <Route path='/professional-information' element={<ProfessionalInformation />} />
      </Routes>
       
        
    </>
  )
}

export default Freelancer