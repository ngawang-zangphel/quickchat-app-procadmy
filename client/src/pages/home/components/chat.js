import { useSelector } from "react-redux";

function ChatArea() {

    const { selectedChat, user } = useSelector(state => state.usersReducer);
    
    const selectedUser = selectedChat.members.find(u => u._id !== user._id);

    return <> {selectedChat && 
        <div className="app-chat-area">
            <div className="app-chat-area-header">
                {/* RECEIVER DATA */}
                { selectedUser.firstname + ' ' + selectedUser.lastname }
            </div>
            <div>
                CHAT AREA
            </div>
            <div>
                SEND MESSAGE
            </div>
        </div>
    }</>;
};

export default ChatArea;