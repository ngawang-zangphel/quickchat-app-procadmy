import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';

function Home() {
    return (
        <div className='home-page'>
            <Header></Header>
            <div className='main-content'>
                {/* SIDEBAR LAYOUT */}
                <Sidebar></Sidebar>
                {/* CHAT AREA */}
            </div>
        </div>
    )
}
export default Home;