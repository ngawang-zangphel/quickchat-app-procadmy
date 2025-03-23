import Search from "./search";
import { useState } from "react";


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
        </div>
    )
}

export default Sidebar;