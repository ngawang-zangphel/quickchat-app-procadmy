import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { uploadProfilePic } from "../../apiCalls/users";
import { hideLoader, showLoader } from '../../redux/loaderSlice';
import { setUser } from '../../redux/userSlice';
import { toast } from "react-hot-toast";

function Profile() {

    const { user } = useSelector(state => state.usersReducer);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    function getInitials() {
        let f = user?.firstname.toUpperCase()?.[0];
        let l = user?.lastname.toUpperCase()?.[0];
        return f + ' ' + l;
    }

    function getFullName() {
        let fname = user?.firstname.toUpperCase();
        let lname = user?.lastname.toUpperCase();
        return fname + ' ' + lname;
    }

    const onFileSelect = async (e) => {
        const file = e.target.files[0];

        //Convert the file into Base64 string
        const reader = new FileReader(file);

        reader.readAsDataURL(file);

        //Once selection is complete
        reader.onloadend = async () => {
            setImage(reader.result);
        }
    }

    const updateProfilePic = async () => {
       try {
        dispatch(showLoader());
        const response = await uploadProfilePic(image); 
        dispatch(hideLoader());  

        if (response.success) {
            toast.success(response?.message);
            dispatch(setUser(response.data));
        } else {
            toast.error(response.message);
        }

       } catch (error) {
            toast.error(error.message)
            dispatch(hideLoader());  
       }
    }

    useEffect(() => {
        if(user?.profilePic) {
            setImage(user?.profilePic)
        };
    }, [user]);

    return (
        <div className="profile-page-container" >
            <div className="profile-pic-container">
                {
                    image && <img src={image} alt="profile pic" className="user-profile-pic-upload"/>
                }
                { !image && <div className="user-default-profile-avatar"> { getInitials() }</div>
                }
                
            </div>
            <div className="profile-info-container">
                <div className="user-profile-name">
                    <h1> { getFullName() } </h1>
                </div>
                <div>
                    <b>Email: </b>{ user?.email } 
                </div>
                <div>
                    <b>Account Created: </b> { moment(user?.createdAt).format('MMM DD YYYY') } 
                </div>
                <div className="select-profile-pic-container">
                    <input 
                        type="file"
                        onChange={onFileSelect}
                    />
                    <button 
                        className="upload-image-btn"
                        onClick={updateProfilePic}
                    >Upload</button>
                </div>
            </div>
        </div> 
    )
}

export default Profile;