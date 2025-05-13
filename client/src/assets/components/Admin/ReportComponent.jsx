import React, { useState } from 'react';
import axios from 'axios';

const ReportComponent = () => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    date: '',
    orders: '',
    years: '',
    coins: ''
  });

  const reportEndpoints = [
    // Reports without parameters
    { id: 1, name: 'Blocked Report', path: '/api/report/Blocked_Report' },
    { id: 2, name: 'Clients Report', path: '/api/report/ClientsReport' },
    { id: 6, name: 'Freelancer Report', path: '/api/report/FreeLancerReport' },
    { id: 7, name: 'Gig Report', path: '/api/report/GigReport' },
    { id: 9, name: 'Order Report', path: '/api/report/OrderReport' },
    { id: 10, name: 'Package Report', path: '/api/report/PackageReport' },
    { id: 11, name: 'Wallet Report', path: '/api/report/WalletReport' },

    // Reports with parameters
    { 
      id: 3, 
      name: 'Completed Orders', 
      path: '/api/report/CompletedOrderReport',
      params: ['date']
    },
    { 
      id: 4, 
      name: 'Freelancer Orders', 
      path: '/api/report/FreelacnerOrderReport',
      params: ['orders']
    },
    { 
      id: 5, 
      name: 'Freelancer Experience', 
      path: '/api/report/FreelancerExperinceReport',
      params: ['years']
    },
    { 
      id: 8, 
      name: 'Order Coin Report', 
      path: '/api/report/OrderCoinReport',
      params: ['coins']
    },
  ];

  const handleParamChange = (name, value) => {
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDownload = async (report) => {
    try {
      if (report.params?.some(p => !params[p])) {
        alert('Please fill all required parameters');
        return;
      }

      setLoading(true);
      
      // Remove authorization header since APIs are public
      const response = await axios.get(report.path, {
        responseType: 'blob',
        params: report.params?.reduce((acc, param) => ({
          ...acc,
          [param]: params[param]
        }), {})
      });

      // Verify response type
      const contentType = response.headers['content-type'];
      if (!contentType.includes('application/pdf')) {
        throw new Error('Invalid PDF response from server');
      }

      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.setAttribute('download', `${report.name}_${new Date().toISOString()}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      alert(error.message || 'Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  const renderParamInput = (param) => {
    switch(param) {
      case 'date':
        return (
          <input
            type="date"
            value={params.date}
            onChange={(e) => handleParamChange('date', e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          />
        );
      case 'orders':
      case 'years':
      case 'coins':
        return (
          <input
            type="number"
            value={params[param]}
            onChange={(e) => handleParamChange(param, e.target.value)}
            placeholder={`Enter ${param}`}
            style={{ 
              marginRight: '10px', 
              padding: '5px',
              width: '120px'
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="report-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>System Reports</h2>
      {loading && <div style={{ marginBottom: '10px', color: '#666' }}>Generating report...</div>}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Report Name</th>
            <th style={{ padding: '12px', width: '60%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reportEndpoints.map((report) => (
            <tr 
              key={report.id} 
              style={{ 
                backgroundColor: '#fff',
                borderBottom: '1px solid #dee2e6',
                ':hover': { backgroundColor: '#f8f9fa' }
              }}
            >
              <td style={{ padding: '12px', color: '#495057' }}>{report.name}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {report.params?.map(param => (
                    <div key={param} style={{ marginRight: '10px' }}>
                      {renderParamInput(param)}
                    </div>
                  ))}
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={loading}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      opacity: loading ? 0.7 : 1,
                      ':disabled': { cursor: 'not-allowed' }
                    }}
                  >
                    Download
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportComponent;