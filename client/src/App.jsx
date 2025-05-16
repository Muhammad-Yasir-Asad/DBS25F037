import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Freelancer from './assets/components/pages/Freelancer';
import Home from './assets/components/pages/Home';
import AdminDashboard from './assets/components/pages/Admin';
import Client from './assets/components/pages/Client';
import Admin from './assets/components/pages/Admin'
import ProtectedRoute from './assets/components/Context/ProtectedRoute';
import StartSellingPage from './assets/components/pages/StartSellingPage';
import SearchResultResponse from './assets/components/shared/SearchResultResponse';
import GigList from './assets/components/shared/GigList';
import GigDetail from './assets/components/shared/GigDetail';
import SearchPage from './assets/components/pages/SearchPage';
import chatConnection from './assets/components/services/chatConnection';
import { useEffect } from 'react';
import SearchResults from './assets/components/shared/SearchResults';
import Reports from './assets/components/Admin/reports';


export default function App() {

  useEffect(() => {
    const startSignalRConnection = async () => {
      try {
        if (chatConnection.state === "Disconnected") {
      await chatConnection.start();
      console.log("✅ SignalR Connected");
    } else {
      console.warn("⚠️ SignalR already connected or connecting");
    }
  } catch (err) {
    console.error("❌ SignalR Connection failed: ", err);
  }
    };

    startSignalRConnection();

    // Optional: handle connection close/reconnect events
    chatConnection.onclose(() => {
      console.warn('🔌 SignalR disconnected.');
    });

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

      
        <Route
          path="/freelancer/*"
          element={
            <ProtectedRoute requiredRole="User">
              <Freelancer />
            </ProtectedRoute>
          }
        />

<Route path="/search-response" element={<SearchPage />} />
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

        

<Route path='/reports' element={<Reports />}/>
    </Routes>
        
    </BrowserRouter>
  );
}
