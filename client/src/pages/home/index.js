import React, { useEffect } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ChatArea from './components/chat';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

function Home() {

    const { selectedChat, user } = useSelector(state => state.usersReducer);

    //Url where our server is running
    const socket = io('http://localhost:3000');

    useEffect(() => {
        if (user) {
            //First param: room name
            socket.emit('join-room', user._id);   
            socket.emit('send-message', { text: "Hi User 14", recipent: '67e006dc0b3f4ae296bfe059' });
            socket.on('receive-message', (data) => {
                console.log(data);
            })
        }
    }, [user]);

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