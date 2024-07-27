import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [localStorageData, setLocalStorageData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('Users')) || {};

    const fetchUserData = () => {
      setUserData(user);
      setLoading(false);
    };

    const fetchLocalStorageData = () => {
      const allData = {
        currentYear: localStorage.getItem('currentYear'),
        mock0_timer: localStorage.getItem('mock0_timer'),
        userEmail: localStorage.getItem('userEmail'),
        theme: localStorage.getItem('theme'),
        noticeDismissed: localStorage.getItem('noticeDismissed'),
        quizSelectedAnswer: localStorage.getItem('quizSelectedAnswer'),
        mock0_currentQuestion: localStorage.getItem('mock0_currentQuestion'),
        currentQuestionIndex: localStorage.getItem('currentQuestionIndex'),
        timer: localStorage.getItem('timer'),
        userName: localStorage.getItem('userName'),
        mock0_score: localStorage.getItem('mock0_score'),
        currentQuestion: localStorage.getItem('currentQuestion'),
        score: localStorage.getItem('score'),
        quizCurrentQuestion: localStorage.getItem('quizCurrentQuestion'),
        savedTime: localStorage.getItem('savedTime'),
        quizScore: localStorage.getItem('quizScore'),
      };

      setLocalStorageData(allData);
      setLoading(false);
    };

    fetchUserData();
    fetchLocalStorageData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22c-5.523 0-10-4.477-10-10s4.477-10 10-10c1.788 0 3.468.424 4.988 1.176l-1.428 1.428C14.198 4.766 13.126 4 12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.126 0 2.198-.766 2.56-1.804l1.428 1.428C15.468 21.576 13.788 22 12 22z" fill="currentColor"/></svg>
        <p className="text-xl text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  );

  // Prepare data for charts
  const chartData = {
    labels: Object.keys(localStorageData),
    datasets: [
      {
        label: 'Local Storage Data',
        data: Object.values(localStorageData).map(val => val ? parseFloat(val) : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const pieChartData = {
    labels: Object.keys(localStorageData),
    datasets: [
      {
        data: Object.values(localStorageData).map(val => val ? parseFloat(val) : 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Information Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
            <div className="flex flex-col sm:flex-row items-center mb-6">
              <img
                src={userData.userImage || 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG-Picture.png'}
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-xl"
              />
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 space-y-3">
                <p className="text-gray-700 text-lg"><strong>Name:</strong> {userData.fullname || 'N/A'}</p>
                <p className="text-gray-700 text-lg"><strong>Email:</strong> {userData.email || 'N/A'}</p>
                <p className="text-gray-700 text-lg"><strong>Registration Number:</strong> {userData.registrationNumber || 'N/A'}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 h-auto overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Charts</h2>
            <div className="flex flex-col items-center space-y-8">
              {/* Line Chart */}
              <div className="w-full h-64">
                <h3 className="text-xl font-semibold mb-2">Line Chart</h3>
                <Line data={chartData} />
              </div>
              {/* Bar Chart */}
              <div className="w-full h-64">
                <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
                <Bar data={chartData} />
              </div>
              {/* Pie Chart */}
              <div className="w-full h-64 ">
                <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
                <Pie data={pieChartData} />
              </div>
            </div>
          </div>
        </div>

        {/* Local Storage Data Table */}
        <div className="bg-white mt-8 p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Local Storage Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(localStorageData).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
