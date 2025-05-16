import React from 'react'
import FreelancerNavbar from '../Freelancer/FreelancerNavbar';
import PersonalInformation from '../Freelancer/PersonalInfoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfessionalInformation from '../Freelancer/ProfessionalInformation';
import StartSelling from '../Freelancer/StartSelling';
import GigAddForm from "../Freelancer/GigCreationForm";
import FreelancerDashboard  from '../Freelancer/FreelancerDashboard';
import FreelancerInbox from './../Freelancer/FreelancerInbox';
import FreelancerOrders from '../Freelancer/FreelancerOrders';  

const Freelancer = () => {
  return (
    <>
        
        <FreelancerNavbar />
      <Routes>
        <Route path='/chat' element={<FreelancerInbox />} />
        <Route path='/dashboard' element={<FreelancerDashboard />} />
        <Route path='/manage_gig' element={<GigAddForm />}/>
        <Route path='/start_selling' element={<StartSelling />} />
        <Route path='/personal_information' element={<PersonalInformation />} />
        <Route path='/professional_information' element={<ProfessionalInformation />} />
        <Route path="/:freelancerId/orders" element={<FreelancerOrders />} />
      </Routes>
       
        
    </>
  )
}

export default Freelancer