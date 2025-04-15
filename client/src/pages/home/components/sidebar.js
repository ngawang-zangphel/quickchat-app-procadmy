import Search from "./search";
import { useState } from "react";
import UserList from "./userList";


function Sidebar( { socket } ) {

    const [ searchKey, setSearchKey ] = useState('');

    return (
        <div className="app-sidebar">
            {/* SEARCH USER */}
            <Search 
                searchKey={searchKey}
                setSearchKey={setSearchKey}
            ></Search>
            {/* USER LIST */}
            <UserList
                socket = { socket }
                searchKey={searchKey}
            ></UserList> 
        </div>
    )
}

export default Sidebar;