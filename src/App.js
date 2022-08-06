import './App.scss';
import { Route, Routes } from "react-router-dom";
import ImportImagesScreen from "./ImportImagesScreen/ImportImagesScreen";
import Navbar from "./Navbar/Navbar";
import ProcessingScreen from "./ProcessingScreen/ProcessingScreen";

function App() {
  return (
      <div className={"App"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImportImagesScreen />} />
          <Route path="/pre-stitching" element={<ProcessingScreen />} />
        </Routes>
      </div>
  );
}

export default App;
