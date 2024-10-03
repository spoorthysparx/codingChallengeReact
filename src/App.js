import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom"; // Import Navigate for redirection
import Bank from "./Component/Bank";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { useState } from "react";
import AddAccount from "./Component/AddAccount";

function App() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleOpenSignUp = () => setSignUpOpen(true);
  const handleCloseSignUp = () => setSignUpOpen(false);
  
  const handleOpenSignIn = () => setSignInOpen(true); 
  const handleCloseSignIn = () => setSignInOpen(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true on successful login
    handleCloseSignIn(); // Close the SignIn modal
  };

  return (
    <div className="App">
      <div className="button-container">
        {!isLoggedIn && ( // Only show buttons if not logged in
          <>
            <button onClick={handleOpenSignUp}> Sign Up</button>
            <button onClick={handleOpenSignIn}> Sign In</button>
          </>
        )}
      </div>

      <SignUp
        open={isSignUpOpen}
        handleClose={handleCloseSignUp}
        handleOpenSignIn={handleOpenSignIn} 
      />
      <SignIn
        open={isSignInOpen}
        handleClose={handleCloseSignIn}
        openSignUp={handleOpenSignUp} 
        onLogin={handleLogin} 
      />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/account" element={<Bank />} />
        <Route path="/addAccount" element={<AddAccount />} />
      </Routes>
    </div>
  );
}

export default App;
