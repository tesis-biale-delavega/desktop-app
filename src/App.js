import React from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import ImportImagesScreen from "./ImportImagesScreen/ImportImagesScreen";
import Navbar from "./Navbar/Navbar";
import ProcessingScreen from "./ProcessingScreen/ProcessingScreen";
import ProjectsListScreen from "./ProjectsListScreen/ProjectsListScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";

function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/index.html";

  return (
    <div className={"App"}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/projects" element={<ProjectsListScreen />} />
        <Route path="/import-images" element={<ImportImagesScreen />} />
        <Route path="/processing" element={<ProcessingScreen />} />
      </Routes>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={"dark"}
        toastStyle={{ backgroundColor: "#747474" }}
      />
    </div>
  );
}

export default App;
