import React, { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      {!isLoggedIn ? (<Login stateFunction={setLoggedIn} />):(
        <div className=" overflow-hidden  overflow-x-scroll">
          <Header/>
          <Body />
        </div>
      )}
    </>
    
  );
}

export default App;