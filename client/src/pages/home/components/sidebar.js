import Search from "./search";
import { useState } from "react";
import UserList from "./userList";


function Sidebar() {

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
                searchKey={searchKey}
            ></UserList> 
        </div>
    )
}

export default Sidebar;