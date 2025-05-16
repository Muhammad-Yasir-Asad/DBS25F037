import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Check, Star, Video, Image } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import GigCard from './GigCard';
import { SearchContext } from '../Context/SearchContext';
import ClientNavbar from '../Clinet/ClientNavbar';
import { format } from 'date-fns';

const BASE_URL = 'https://skillhub.runasp.net/';
const BASE_URL_MEDIA = "https://skillhub.runasp.net/"; 

const GigDetail = () => {
  const { state: gig } = useLocation();
  const { gigResults } = useContext(SearchContext);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('Basic');
  const [mediaType, setMediaType] = useState('image');
  const [experienceYears, setExperienceYears] = useState(0);

  // Calculate experience years
  useEffect(() => {
    if (gig?.freelancer?.user?.joinDate) {
      const joinYear = new Date(gig.freelancer.user.joinDate).getFullYear();
      const currentYear = new Date().getFullYear();
      setExperienceYears(currentYear - joinYear);
    }
  }, [gig]);

  // Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.nameid);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const idAsInt = parseInt(userId, 10);

  console.log("aaaaaa",idAsInt);

useEffect(() => {
  let intervalId;
  const fetchMessages = async () => {
    try {
      if (!userId) return;
      
      const [sentRes, receivedRes] = await Promise.all([
        fetch(`${BASE_URL}api/Messages/Retrive_Msg_bySender?senderid=${idAsInt}`),
        fetch(`${BASE_URL}api/Messages/Retrive_Msg_byReceiver?receiverid=${userId}`)
      ]);

      // Check if responses are OK
      if (!sentRes.ok || !receivedRes.ok) {
        throw new Error('Failed to fetch messages');
      }

      // Parse responses
      const sentData = await sentRes.json();
      const receivedData = await receivedRes.json();

      // Extract data arrays from responses
      const sentMessages = sentData.data || [];
      const receivedMessages = receivedData.data || [];

      // Combine and filter messages
      const filteredMessages = [...sentMessages, ...receivedMessages]
        .filter(msg => 
          msg.senderId === idAsInt || msg.receiverId === idAsInt
        )
        .sort((a, b) => new Date(a.sentTime) - new Date(b.sentTime));

      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    }
  };

  if (isChatOpen) {
    fetchMessages();
    intervalId = setInterval(fetchMessages, 1000);
  }
  return () => clearInterval(intervalId);
}, [isChatOpen, userId, idAsInt]);

// Update handleSendMessage to add the new message immediately
const handleSendMessage = async () => {
  if (!newMessage.trim() || !userId) return;

  try {
    // Create temporary message object
    const tempMessage = {
      messageId: Date.now(), // temporary ID
      senderId: idAsInt,
      receiverId: gig.freelancer.user.userID,
      messageText: newMessage,
      sentTime: new Date().toISOString(),
      isRead: false
    };

    // Optimistically add to messages
    setMessages(prev => [...prev, tempMessage]);
    
    const response = await fetch(`${BASE_URL}api/Messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify({
        senderId: idAsInt,
        receiverId: gig.freelancer.user.userID,
        messageText: newMessage
      })
    });

    if (!response.ok) throw new Error('Failed to send message');
    
    setNewMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
    setError('Failed to send message');
    // Remove temporary message if error occurs
    setMessages(prev => prev.filter(msg => msg.messageId !== tempMessage.messageId));
  }
};

  const handlePlaceOrder = async (selectedPackage) => {
    setIsPlacingOrder(true);
    setError(null);

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('Authentication required');

      const orderData = {
        clientId: userId,
        gigId: gig.gigId,
        gigpackageId: selectedPackage.packageId,
        freelancerId: gig.freelancer.freelancerId,
        dueDate: new Date().toISOString(),
        coinAmount: selectedPackage.price
      };

      const response = await fetch(`${BASE_URL}api/order/Place_Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Order placement failed');
      
      setOrderSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const relatedGigs = (gigResults || [])
    .filter(g => g.category === gig.category && g.gigId !== gig.gigId)
    .slice(0, 4);

  const currentPackage = gig[`${selectedPackage.toLowerCase()}Package`];

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

    <div className='p-7'>
      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Placed!</h3>
            <p className="text-gray-600 mb-6">
              Your {currentPackage.packageType} package order has been successfully placed.
            </p>
            <button
              onClick={() => setOrderSuccess(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-4">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-700 font-bold hover:text-red-800"
          >
            ×
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Gig Title */}
            <h1 className="text-3xl font-bold text-gray-900">I will {gig.title}</h1>

            {/* Freelancer Profile */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <img
                  src={`${BASE_URL_MEDIA}${gig.freelancer.user.profilePicture}`}
                  alt={gig.freelancer.user.username}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                />
                <div >
                 <div className="flex items-center  justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        {gig.freelancer.user.firstName} {gig.freelancer.user.lastName}
                    </h2>
                  <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-700">{gig.avgRating || 'New Seller'}</span>  
                </div>
              </div>

                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                   
                    <span className="text-gray-400">•</span>
                    <span>{gig.freelancer.totalCompletedOrders} orders</span>
                    <span className="text-gray-400">•</span>
                    <span>{experienceYears} years experience</span>
                  </div>
                  <p className="mt-2 text-gray-500">{gig.category}</p>
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMediaType('image')}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    mediaType === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  Image
                </button>
                <button
                  onClick={() => setMediaType('video')}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    mediaType === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>
              </div>

              {mediaType === 'image' ? (
                <img
                  src={`${BASE_URL_MEDIA}${gig.picture}`}
                  alt={gig.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={`${BASE_URL_MEDIA}${gig.video}`}
                  controls
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: gig.description.replace(/\n/g, '<br/>') }}
              />
            </div>

            {/* Freelancer Information */}
           <div className="mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Get to know {gig.freelancer.user.username}
    </h2>
    
    <div className="flex items-center gap-6 mb-8">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full animate-spin"></div>
        <img
          src={`${BASE_URL_MEDIA}${gig.freelancer.user.profilePicture}`}
          alt={gig.freelancer.user.username}
          className="w-24 h-24 rounded-full object-cover border-4 border-white relative"
        />
      </div>
      
      <div>
        <div className="flex items-center gap-4 mb-3">
          <button 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            onClick={() => setIsChatOpen(true)}
          >
            Contact Me
          </button>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{gig.avgRating || 'New'}</span>
            <span className="text-gray-500">({gig.freelancer.totalCompletedOrders} orders)</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">From</span><br/>
          {gig.freelancer.user.country}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Member since</span><br/>
          {format(new Date(gig.freelancer.user.joinDate), 'MMM yyyy')}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">Avg. response time</span><br/>
          1 hour
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Last delivery</span><br/>
          about 10 hours
        </p>
      </div>
    </div>

    <div className="my-6 border-t pt-6">
      <h4 className="text-lg font-semibold mb-3">Languages</h4>
      <div className="flex flex-wrap gap-2">
        {gig.freelancer.language.split(',').map((lang, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
          >
            {lang.trim()}
          </span>
        ))}
      </div>
    </div>

    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-white text-gray-500 text-sm">Bio</span>
      </div>
    </div>

    <div className="prose max-w-none text-gray-700">
      {gig.freelancer.user.bio || 'No bio available'}
    </div>
  </div>
          </div>

          {/* Right Column - Packages */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* Packages Selector */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-2 mb-6">
                  {['Basic', 'Standard', 'Premium'].map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedPackage === pkg
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>

                {/* Package Details */}
                {currentPackage && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{currentPackage.packageType}</h3>
                        <p className="text-gray-500 mt-1">{currentPackage.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">${currentPackage.price}</span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Delivery Time:</span>
                        <span>{currentPackage.deliveryDays} days</span>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-semibold mb-3">Includes:</h4>
                        <ul className="space-y-2">
                          {currentPackage.skills.map((skill, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handlePlaceOrder(currentPackage)}
                        disabled={isPlacingOrder}
                        className={`flex-1 py-3 rounded-lg transition-colors ${
                          isPlacingOrder
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isPlacingOrder ? 'Processing...' : 'Order Now'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Related Gigs */}
              {relatedGigs.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
                  <div className="grid gap-4">
                    {relatedGigs.map(g => (
                      <GigCard key={g.gigId} item={g} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl h-[80vh] rounded-xl flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={`${BASE_URL_MEDIA}${gig.freelancer.user.profilePicture}`}
                    alt={gig.freelancer.user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{gig.freelancer.user.username}</h3>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((msg) => (
    <div
      key={msg.messageId} // Use actual message ID instead of index
      className={`flex ${msg.senderId === idAsInt ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] rounded-lg p-3 ${
        msg.senderId === idAsInt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <p>{msg.messageText}</p>
        <p className="text-xs mt-1 opacity-70">
          {format(new Date(msg.sentTime), 'HH:mm')}
        </p>
      </div>
    </div>
  ))}
</div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default GigDetail;