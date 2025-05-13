// src/pages/AdminDashboard.jsx
import React from 'react';
import AdminNavbar from '../Admin/AdminNavbar';
import { Route, Routes} from 'react-router-dom';
import ReportComponent from '../Admin/ReportComponent';
const AdminDashboard = () => (
  <>
    <AdminNavbar />
    <Routes>
      <Route path='/reports' element={<ReportComponent />}/>
    </Routes>
  </>
);

export default AdminDashboard;
