// ChatApp.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Video, X } from 'lucide-react';
import { startCall, videoConnection } from '../services/videoConnection';

const API_BASE = 'https://skillhub.runasp.net/api/messages';

const ChatApp = ({ currentUserId, receiverId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const pollingRef = useRef(null);

  useEffect(() => {
    // initial load
    fetchMessages();
    // poll every 1s
    pollingRef.current = setInterval(fetchMessages, 1000);
    return () => clearInterval(pollingRef.current);
  }, []);

  const fetchMessages = async () => {
    try {
      const [sent, received] = await Promise.all([
        axios.get(`${API_BASE}/Retrive_Msg_bySender`, { params: { senderid: currentUserId } }),
        axios.get(`${API_BASE}/Retrive_Msg_byReceiver`, { params: { receiverid: currentUserId } })
      ]);
      const all = [...sent.data, ...received.data]
        .filter(m => m.senderId === currentUserId || m.receiverId === currentUserId)
        .map(m => ({ senderId: m.senderId, text: m.messageText, time: m.sentTime }));
      setMessages(all);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const form = { senderId: currentUserId, receiverId, messageText: newMessage };
    try {
      await axios.post(`${API_BASE}/send`, form);
      setNewMessage('');
      fetchMessages();
    } catch (e) { console.error(e); }
  };

  const handleFileChange = e => setSelectedFile(e.target.files[0]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md h-screen md:h-auto rounded-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold">Chat</h3>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m,i) => (
            <div key={i} className={`p-2 rounded ${m.senderId===currentUserId?'bg-blue-200 self-end':'bg-gray-200 self-start'}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center gap-2">
          <input type="file" onChange={handleFileChange} className="hidden" id="attach" />
          <label htmlFor="attach" className="cursor-pointer">📎</label>
          <input
            className="flex-1 border rounded px-3 py-2"
            value={newMessage}
            onChange={e=>setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
          <Video className="text-green-600 cursor-pointer" onClick={()=>startCall(receiverId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;