import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';

const BASE_URL = 'https://skillhub.runasp.net/';

const FreelancerInbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [freelancerId, setFreelancerId] = useState(null);

  // Get freelancer ID from token
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFreelancerId(decoded.nameid);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Fetch all conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!freelancerId) return;

      try {
        // Get all messages where freelancer is sender or receiver
        const [sentRes, receivedRes] = await Promise.all([
          fetch(`${BASE_URL}api/Messages/Retrive_Msg_bySender?senderid=${freelancerId}`),
          fetch(`${BASE_URL}api/Messages/Retrive_Msg_byReceiver?receiverid=${freelancerId}`)
        ]);

        const [sentData, receivedData] = await Promise.all([
          sentRes.json(),
          receivedRes.json()
        ]);

        // Combine and process messages
        const allMessages = [
          ...(sentData.data || []),
          ...(receivedData.data || [])
        ];

        // Group messages by client
        const conversationsMap = allMessages.reduce((acc, message) => {
          const clientId = message.senderId === freelancerId 
            ? message.receiverId 
            : message.senderId;

          if (!acc[clientId]) {
            acc[clientId] = {
              clientId,
              messages: [],
              lastMessage: message.messageText,
              lastMessageTime: message.sentTime
            };
          }

          acc[clientId].messages.push(message);
          if (new Date(message.sentTime) > new Date(acc[clientId].lastMessageTime)) {
            acc[clientId].lastMessage = message.messageText;
            acc[clientId].lastMessageTime = message.sentTime;
          }

          return acc;
        }, {});

        setConversations(Object.values(conversationsMap));
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [freelancerId]);

  // Handle conversation selection
  const selectConversation = (clientId) => {
    const conversation = conversations.find(c => c.clientId === clientId);
    setSelectedClient(conversation);
    setMessages(conversation.messages.sort((a, b) => 
      new Date(a.sentTime) - new Date(b.sentTime)
    ));
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedClient || !freelancerId) return;

    try {
      // Optimistic update
      const tempMessage = {
        messageId: Date.now(),
        senderId: freelancerId,
        receiverId: selectedClient.clientId,
        messageText: newMessage,
        sentTime: new Date().toISOString()
      };

      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      // Send to API
      await fetch(`${BASE_URL}api/Messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({
          senderId: freelancerId,
          receiverId: selectedClient.clientId,
          messageText: newMessage
        })
      });

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(msg => msg.messageId !== tempMessage.messageId));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {conversations.map(conversation => (
            <div
              key={conversation.clientId}
              onClick={() => selectConversation(conversation.clientId)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedClient?.clientId === conversation.clientId ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Client #{conversation.clientId}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(conversation.lastMessageTime), 'MMM d, HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Client #{selectedClient.clientId}</h3>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
              {messages.map((message) => (
                <div
                  key={message.messageId}
                  className={`flex ${message.senderId === freelancerId ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === freelancerId
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    <p>{message.messageText}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {format(new Date(message.sentTime), 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerInbox;