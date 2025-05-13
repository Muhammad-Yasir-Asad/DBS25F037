import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Freelancer from './assets/components/pages/Freelancer';
import Home from './assets/components/pages/Home';
import AdminDashboard from './assets/components/pages/Admin';
import Client from './assets/components/pages/Client';
import Admin from './assets/components/pages/Admin'
import ProtectedRoute from './assets/components/Context/ProtectedRoute';
import StartSellingPage from './assets/components/pages/StartSellingPage';
import SearchResults from './assets/components/shared/SearchResults'
import SearchResultResponse from './assets/components/shared/SearchResultResponse';
import GigList from './assets/components/shared/GigList';
import GigDetail from './assets/components/shared/GigDetail';
import ReportComponent from './assets/components/Admin/ReportComponent';


export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* Public landing / login page */}
        <Route path="/" element={<Home />} />

        {/* Freelancer dashboard—only role==="Freelancer" */}
        <Route
          path="/freelancer/*"
          element={
            <ProtectedRoute requiredRole="User">
              <Freelancer />
            </ProtectedRoute>
          }
        />

<Route path="/search-response" element={<SearchResultResponse />} />
<Route path="/search" element={<SearchResults />} />
 <Route path="/gigs" element={<GigList />} />
  <Route path="/gig/:gigId" element={<GigDetail />} />
        <Route 
          path='/start-selling'
          element={
            <StartSellingPage />
          }
          />

          <Route
           path='/search-results'
           element={
            <GigList />
           }
           />


        {/* Client dashboard—only role==="Client" */}
        <Route
          path="/client"
          element={
            <ProtectedRoute requiredRole="User">
              <Client />
            </ProtectedRoute>
          }
        />

<Route path='/reports' element={<ReportComponent />}/>
    </Routes>
        
    </BrowserRouter>
  );
}
