import React, { useEffect } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ChatArea from './components/chat';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

function Home() {

    const { selectedChat } = useSelector(state => state.usersReducer);

    //Url where our server is running
    const socket = io('http://localhost:3000');

    useEffect(() => {
        //First param: event name (our choice)
        //Second Param: Data Message
        socket.emit('send-message-all', { text: 'Hi from User' });
        socket.on('send-message-by-server', data => {
            console.log(data);
        })
    }, []);

    return (
        <div className='home-page'>
            <Header></Header>
            <div className='main-content'>
                {/* SIDEBAR LAYOUT */}
                <Sidebar></Sidebar>
                {/* CHAT AREA */}
                { selectedChat && <ChatArea></ChatArea>}
            </div>
        </div>
    )
}
export default Home;