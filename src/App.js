import './App.scss';
import { Route, Routes } from "react-router-dom";
import ImportImagesScreen from "./ImportImagesScreen/ImportImagesScreen";
import Navbar from "./Navbar/Navbar";
import ProcessingScreen from "./ProcessingScreen/ProcessingScreen";
import ProjectsListScreen from "./ProjectsListScreen/ProjectsListScreen";

function App() {
  return (
      <div className={"App"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProjectsListScreen />} />
          <Route path="/import-images" element={<ImportImagesScreen />} />
          <Route path="/processing" element={<ProcessingScreen />} />
        </Routes>
      </div>
  );
}

export default App;
