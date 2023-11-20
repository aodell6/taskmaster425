import React, { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSignUpScreenActive, setSignUpScreenActive] = useState(false);

  return (
    <>
    {isSignUpScreenActive ? (<CreateAccount onDismiss={setSignUpScreenActive}/>) : (!isLoggedIn ? (<Login stateFunction={setLoggedIn} signUpFunction={setSignUpScreenActive} />):(
        <div className=" overflow-hidden  overflow-x-scroll">
          <Header/>
          <Body />
        </div>
      ))}
      
    </>
    
  );
}

export default App;