import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Mock from "./components/Mock";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Mock1 from "./components/Mock1";
import Mock2 from "./components/Mock2";
import Mock3 from "./components/Mock3";
import Mock4 from "./components/Mock4";
import About from "./components/About";
import Mock0 from "./components/Mock0";
import Mock6 from "./components/Mock6";
import Mock7 from "./components/Mock7";
import Mock5 from "./components/Mock5";
// import Compare from "./components/Compare";
import AdmissionGuidelines from "./components/AdmissionGuidelines";
// import Shadharan from "./components/shadharan/Shadharan";
import PdfUploadPage from "./components/PdfUploadPage";
import NotesUploaded from "./components/NotesUploaded";

function App() {
  const [authUser] = useAuth();
  return (
    <>
      <div className="dark:bg-slate-100 dark:text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes-uploaded"
            element={authUser ? <NotesUploaded /> : <Navigate to="/signup" />}
          />
          <Route path="/Mock" element={<Mock />} />
          <Route path="/AdmissionGuidelines" element={<AdmissionGuidelines />} />
          <Route path="/Mock1" element={<Mock1 />} />
          <Route path="/Mock2" element={<Mock2 />} />
          <Route path="/Mock3" element={<Mock3 />} />
          <Route path="/Mock4" element={<Mock4 />} />
          <Route path="/Mock0" element={<Mock0 />} />
          <Route path="/Mock5" element={<Mock5 />} />
          <Route path="/Mock6" element={<Mock6 />} />
          <Route path="/Mock7" element={<Mock7 />} />
          <Route path="/About" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pdf-upload" element={<PdfUploadPage />} />
          <Route path="/notes-uploaded" element={<NotesUploaded />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
