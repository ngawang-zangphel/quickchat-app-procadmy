import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import React from 'react';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverse={false}/>
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
