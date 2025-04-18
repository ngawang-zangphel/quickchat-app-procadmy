import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ChatArea from './components/chat';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

//Making it global variable
//Url where our server is running
const socket = io('https://quickchat-app-server-j9aj.onrender.com');

function Home() {

    const { selectedChat, user } = useSelector(state => state.usersReducer);
    //Online User: Step 3
    const [onlineUser, setOnlineUser] = useState([]);

    useEffect(() => {
        if (user) {
            //First param: room name
            socket.emit('join-room', user?._id);
            //Online User: Step 1
            socket.emit('user-login', user?._id); 
            //Online User: Step 4
            socket.on('online-users', onlineusers => {
                setOnlineUser(onlineusers);
            });
            socket.on('online-users-updated', updatedOnlineUser => {
                setOnlineUser(updatedOnlineUser);
            })
        }
    }, [user, onlineUser]);

    return (
        <div className='home-page'>
            <Header socket={socket}></Header>
            <div className='main-content'>
                {/* SIDEBAR LAYOUT */}
                <Sidebar socket={socket} onlineUser={onlineUser}></Sidebar>
                {/* CHAT AREA */}
                { selectedChat && <ChatArea socket={socket}></ChatArea>}
            </div>
        </div>
    )
}
export default Home;