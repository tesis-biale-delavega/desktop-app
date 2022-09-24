import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ImportImagesScreen from "./ImportImagesScreen/ImportImagesScreen";
import Navbar from "./Navbar/Navbar";
import ProcessingScreen from "./ProcessingScreen/ProcessingScreen";
import ProjectsListScreen from "./ProjectsListScreen/ProjectsListScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={"App"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectsListScreen />} />
        <Route path="/import-images" element={<ImportImagesScreen />} />
        <Route path="/processing" element={<ProcessingScreen />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={"dark"}
        toastStyle={{backgroundColor: "#747474"}}
      />
    </div>
  );
}

export default App;
