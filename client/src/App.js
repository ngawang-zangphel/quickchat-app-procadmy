import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import React from 'react';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/loader";
import { useSelector } from "react-redux";

function App() {
  
  //Name of the reducer that you want to access (comes from store.js )
  const { loader } = useSelector(state => state.loaderReducer);

  return (
    <div>
      <Toaster position="top-center" reverse={false}/>
      {/* To Display based on condition */}
      { loader && <Loader /> }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <ProtectedRoute>
                {/* Home Component will be passed as children to this protected route component. */}
                <Home />
              </ProtectedRoute> 
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
