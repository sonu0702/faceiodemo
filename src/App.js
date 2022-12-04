import React, { useState, useEffect } from "react";
import "./styles.css";
import { handleError } from "./errorHandler";
let faceio;
export default function App() {
  const [faceid, setFaceId] = useState(null);
  const [accountExistString, setAccountExistString] = useState("");
  useEffect(() => {
    faceio = new faceIO("fioaa823");
  }, []);
  useEffect(() => {
    setAccountExistString("");
  }, [faceid]);
  const handleNewUser = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto"
      });
      setFaceId(response.facialId);
    } catch (error) {
      console.log("error", error);
      handleError(error);
      if (error === 20) {
        setAccountExistString("Your account exists, Please Sign In");
      }
      if (error === 9 || error === 6) {
        setAccountExistString("Something went wrong! Please try again!");
      }
      if (error === 13) {
        window.location.reload();
      }
    }
    console.log("This is done");
  };

  const handleAuthentication = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto"
      });
      setFaceId(response.facialId);
    } catch (error) {
      if (error === 20) {
        window.location.reload();
      }
    }
  };

  const handleLogout = async () => {
    window.location.reload();
  };

  return (
    <div className="App">
      {faceid && (
        <>
          <div>
            <img src="./padlock.svg" alt="faceid" height="300" width="200" />
          </div>
          <h1>Face Identity Verified</h1>
          <button className={"mybutton"} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
      {!faceid && (
        <>
          <h1> Verify Face Identity</h1>
          <img src="./faceid.svg" alt="faceid" height="300" width="200" />
          <button className={"mybutton"} onClick={handleAuthentication}>
            Sign In
          </button>
          <button className={"mybutton"} onClick={handleNewUser}>
            Sign Up
          </button>
          {accountExistString && <h3>{accountExistString}</h3>}
        </>
      )}
    </div>
  );
}
