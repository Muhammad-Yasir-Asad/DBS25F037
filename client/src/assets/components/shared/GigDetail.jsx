import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import GigCard from './GigCard';
import { SearchContext } from '../Context/SearchContext';

const BASE_URL = 'https://skillhub.runasp.net/'; // your API base

const GigDetail = () => {
  const { state: gig } = useLocation();
  const { gigResults } = useContext(SearchContext);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async (selectedPackage) => {
    setIsPlacingOrder(true);
    setError(null);

    const token = localStorage.getItem('auth-token');
    if (!token) {
      setError('You must be logged in to place an order.');
      setIsPlacingOrder(false);
      return;
    }

    try {
      // Decode token to get client ID
      const decoded = jwtDecode(token);
      const clientId = decoded.nameid;

      // Calculate due date (7 days from now)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      // Prepare order payload
      const orderData = {
        clientId: clientId,
        gigId: gig.gigId,
        freelancerId: gig.freelancer.id, // Adjust based on your API structure
        dueDate: dueDate.toISOString(),
        coinAmount: selectedPackage.price
      };

      // Send POST request
      const response = await fetch(`${BASE_URL}api/order/Place_Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`Order failed: ${response.statusText}`);
      }

      setOrderSuccess(true);
    } catch (error) {
      console.error('Order error:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Related gigs calculation
  const related = (gigResults || [])
    .filter(g => g.category === gig.category && g.gigId !== gig.gigId)
    .slice(0, 4);

  // Packages data
  const packages = [
    gig.basicPackage || { packageType: 'Basic', price: 500, description: 'Basic service' },
    gig.standardPackage || { packageType: 'Standard', price: 1000, description: 'Standard service' },
    gig.premiumPackage || { packageType: 'Premium', price: 1500, description: 'Premium service' },
  ];

  return (
   <>
      {/* Success Modal */}
        {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your order. The freelancer will contact you soon.
            </p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}


      {/* Error Message */}
       {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-4 font-bold text-red-700"
          >
            ×
          </button>
        </div>
      )}

    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-white shadow mb-8">
        <div className="max-w-5xl mx-auto">
          {/* Media */}
          <div className="w-full h-0 pb-[40%] relative overflow-hidden rounded-t-lg">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={`${BASE_URL}${gig.video}`}
              poster={`${BASE_URL}${gig.picture}`}
              controls
              muted
              autoPlay
              loop
            />
          </div>

          {/* Title & Info */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Star size={16} fill="black" className="mr-1" />
              <span className="font-semibold">5.0</span>
              <span className="ml-2">{gig.category}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{gig.description}</p>
          </div>
        </div>
      </div>

      {/* Freelancer Info */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-white shadow rounded-lg flex items-center p-6">
          <img
            src={gig.freelancer.user.profilePicture || 'https://i.pravatar.cc/100'}
            alt={gig.freelancer.user.username}
            className="w-20 h-20 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {gig.freelancer.user.firstName} {gig.freelancer.user.lastName}
            </h2>
            <p className="text-gray-600">{gig.freelancer.user.username}</p>
            <p className="text-gray-500 text-sm">
              Joined on {new Date(gig.freelancer.user.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {packages.map((pkg) => (
          <div key={pkg.packageType} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.packageType}</h3>
            <p className="text-gray-600 flex-1 mb-4">{pkg.description}</p>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              PKR {pkg.price.toLocaleString()}
            </div>
            <button
              onClick={() => handlePlaceOrder(pkg)}
              disabled={isPlacingOrder}
              className={`mt-auto py-2 rounded-lg transition ${
                isPlacingOrder 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlacingOrder ? 'Processing...' : 'Order Now'}
            </button>
          </div>
        ))}
      </div>




      {/* Related Gigs */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 px-4">Related Gigs</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
            {related.map(g => <GigCard key={g.gigId} item={g} />)}
          </div>
        </div>
      )}
      </div>
    </>
  );
};


export default GigDetail;
