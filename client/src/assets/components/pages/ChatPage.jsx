import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from "../shared/ChatApp"
import ClientNavbar from '../Clinet/ClientNavbar';

const ChatPage = () => {
  return (
    <>
         <ClientNavbar />
        <Routes>
            <Route path='/chat' element={<Chat />} />
        </Routes>


    </>
  )
}

export default ChatPage