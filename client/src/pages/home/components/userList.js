import React from 'react';
import { useSelector } from "react-redux";

function UserList({ searchKey }) {

    const { allUsers } = useSelector(state => state.usersReducer);

    return (
        allUsers
        ?.filter(user => {
            return (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) || 
            user.lastname.toLowerCase().includes(searchKey.toLowerCase()))&& searchKey;
        })
        ?.map(user => {
            return (
                <div className='user-search-filter'>
                    <div className='filtered-user'>
                        <div className='filter-user-display'>
                            {user.profilePic && <img src={UserList.profilePic} alt='Profile Pic' class="user-profile-image"></img> }
                        { !user.profilePic && <div className='user-default-avatar'>
                                { 
                                user.firstname.charAt(0).toUpperCase() + 
                                user.lastname.charAt(0).toUpperCase() }
                            </div>}
                            <div className='filter-user-details'>
                                <div className='user-display-name'>
                                    { user.firstname + ' ' + user.lastname }
                                </div>
                                <div className='user-display-email'>{ user.email }
                                </div>
                            </div>
                            <div className='user-start-chat'>
                                <button className='user-start-chat-btn'>Start Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    )
}


export default UserList;