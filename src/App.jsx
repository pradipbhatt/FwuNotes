import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Mock from "./components/mock/Mock.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Mock1 from "./components/mock/Mock1";
import Mock2 from "./components/mock/Mock2";
import Mock3 from "./components/mock/Mock3";
import Mock4 from "./components/mock/Mock4";
import About from "./pages/About.jsx";
import Mock0 from "./components/mock/Mock0";
import Mock6 from "./components/mock/Mock6";
import Mock7 from "./components/mock/Mock7";
import Mock5 from "./components/mock/Mock5";
import AdmissionGuidelines from "./components/mock/AdmissionGuidelines";
import PdfUploadPage from "./components/notes/PdfUploadPage.jsx";
import NotesUploaded from "./components/notes/NotesUploaded.jsx";
import Courses from "../src/courses/Courses";
import Profile from "./components/Profile";
// import Settings from "./components/Settings";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Addbook from "./pages/Addbook.jsx";
import BooksUploaded from "./pages/BooksUploaded.jsx";
import { Analytics } from '@vercel/analytics/react';
import Mock8 from "./components/mock/Mock8.jsx";
import Mock9 from "./components/mock/Mock9.jsx";
import Mock10 from "./components/mock/Mock10.jsx";
import Quiz from "./components/mock/Quiz.jsx";
import QuizResultForm from "./components/mock/QuizResultForm.jsx";
import QuizResult from "./components/mock/QuizResult.jsx";
import Gallary from "./components/Gallery.jsx"
import Chat from "../src/components/AI/Chat.jsx"
function App() {
  const [authUser] = useAuth();
  return (
    <>
      <div className="bg-gray-100 dark:bg-slate-900 dark:text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addbook" element={ <ProtectedRoute><Addbook/></ProtectedRoute> } />
          <Route
            path="/showbook"
            element={authUser ? <BooksUploaded/> : <Navigate to="/signup" />}
          />
          <Route path="/Mock" element={<Mock />} />
          <Route path="/AdmissionGuidelines" element={<AdmissionGuidelines />} />
          <Route path="/Mock0" element={<Mock0 />} />
          <Route path="/Mock1" element={<Mock1 />} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/Mock2" element={<Mock2 />} />
          <Route path="/Mock3" element={<Mock3 />} />
          <Route path="/Mock4" element={<Mock4 />} />
          <Route path="/Mock0" element={<Mock0 />} />
          <Route path="/Mock5" element={<Mock5 />} />
          <Route path="/Mock6" element={<Mock6 />} />
          <Route path="/Mock7" element={<Mock7 />} />
          <Route path="/Mock8" element={<Mock8 />} />
          <Route path="/Mock9" element={<Mock9 />} />
          <Route path="/Mock10" element={<Mock10 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/quizresult" element={<QuizResult/>} />
          <Route path="/quizresultadmin" element={ <ProtectedRoute> <QuizResultForm /> </ProtectedRoute>} />
          <Route path="/About" element={<About />} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pdf-upload" element={ <PdfUploadPage /> } />
          <Route path="/notes-uploaded" element={<NotesUploaded />} />
          <Route path="/gallary" element={<Gallary />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
      <Analytics />
    </>
  );
}

export default App;
