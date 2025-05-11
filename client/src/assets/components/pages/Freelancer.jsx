import React from 'react'
import FreelancerNavbar from '../Freelancer/FreelancerNavbar';
import PersonalInformation from '../Freelancer/PersonalInfoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfessionalInformation from '../Freelancer/ProfessionalInformation';
import StartSelling from '../Freelancer/StartSelling';
import GigAddForm from "../Freelancer/GigCreationForm"

const Freelancer = () => {
  return (
    <>
        
        <FreelancerNavbar />
      <Routes>
        <Route path='/manage_gig' element={<GigAddForm />}/>
        <Route path='/start_selling' element={<StartSelling />} />
        <Route path='/personal_information' element={<PersonalInformation />} />
        <Route path='/professional_information' element={<ProfessionalInformation />} />
      </Routes>
       
        
    </>
  )
}

export default Freelancer