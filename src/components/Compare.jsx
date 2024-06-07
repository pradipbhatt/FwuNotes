import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Compare = () => {
  const [products, setProducts] = useState([]);
  const [selected1, setSelected1] = useState(0);
  const [selected2, setSelected2] = useState(1); // Ensure different initial values for comparison
  const [compare, setCompare] = useState(false);

  // Fetching data from ./School.json
  useEffect(() => {
    fetch('/School.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching school data:', error));
  }, []);

  const handleSelect1 = (e) => {
    setSelected1(parseInt(e.target.value));
  };

  const handleSelect2 = (e) => {
    setSelected2(parseInt(e.target.value));
  };

  const handleCompare = () => {
    setCompare(true);
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  const product1 = products[selected1];
  const product2 = products[selected2];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">Compare Schools in Mahendranagar</h1>
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10 p-4 dark:bg-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-700">
              <thead className="bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left">Select School</th>
                  <th className="py-3 px-4">
                    <select
                      className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-600 dark:text-gray-200"
                      value={selected1}
                      onChange={handleSelect1}
                    >
                      {products.map((product, index) => (
                        <option key={index} value={index}>
                          {product.title || '-- Select Anyone --'}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th className="py-3 px-4">
                    <select
                      className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-600 dark:text-gray-200"
                      value={selected2}
                      onChange={handleSelect2}
                    >
                      {products.map((product, index) => (
                        <option key={index} value={index}>
                          {product.title || '-- Select Anyone --'}
                        </option>
                      ))}
                    </select>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="text-center mb-10">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
              onClick={handleCompare}
            >
              Compare
            </button>
          </div>
          {compare && (
            <>
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10 p-4 dark:bg-gray-700">
                <table className="min-w-full bg-white dark:bg-gray-700">
                  <thead className="bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left">Comparison Factor</th>
                      <th className="py-3 px-4 text-left">School 1</th>
                      <th className="py-3 px-4 text-left">School 2</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="py-3 px-4 text-left">School Image</th>
                      <td className="py-3 px-4">
                        <img
                          src={product1.image}
                          alt={product1.title}
                          className="w-full h-32 object-contain"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <img
                          src={product2.image}
                          alt={product2.title}
                          className="w-full h-32 object-contain"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">School Fee</th>
                      <td className="py-3 px-4">NPR {product1.price}</td>
                      <td className="py-3 px-4">NPR {product2.price}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">School Description</th>
                      <td className="py-3 px-4">{product1.description}</td>
                      <td className="py-3 px-4">{product2.description}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">School Brand</th>
                      <td className="py-3 px-4">{product1.brand}</td>
                      <td className="py-3 px-4">{product2.brand}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Affiliation</th>
                      <td className="py-3 px-4">{product1.affiliation}</td>
                      <td className="py-3 px-4">{product2.affiliation}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Infrastructure</th>
                      <td className="py-3 px-4">{product1.infrastructure}</td>
                      <td className="py-3 px-4">{product2.infrastructure}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Rank in Nepal</th>
                      <td className="py-3 px-4">{product1.rank}</td>
                      <td className="py-3 px-4">{product2.rank}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Total Alumni</th>
                      <td className="py-3 px-4">{product1.alumniTotal}</td>
                      <td className="py-3 px-4">{product2.alumniTotal}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Alumni Engineers</th>
                      <td className="py-3 px-4">{product1.alumniEngineers}</td>
                      <td className="py-3 px-4">{product2.alumniEngineers}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Alumni Doctors</th>
                      <td className="py-3 px-4">{product1.alumniDoctors}</td>
                      <td className="py-3 px-4">{product2.alumniDoctors}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Number of Teachers</th>
                      <td className="py-3 px-4">{product1.teachers}</td>
                      <td className="py-3 px-4">{product2.teachers}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Teacher Qualifications</th>
                      <td className="py-3 px-4">{product1.teacherQualifications}</td>
                      <td className="py-3 px-4">{product2.teacherQualifications}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Passout Rate</th>
                      <td className="py-3 px-4">{product1.passoutRate}</td>
                      <td className="py-3 px-4">{product2.passoutRate}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Location</th>
                      <td className="py-3 px-4">{product1.location ? `${product1.location.lat}, ${product1.location.lng}` : 'N/A'}</td>
                      <td className="py-3 px-4">{product2.location ? `${product2.location.lat}, ${product2.location.lng}` : 'N/A'}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Courses Offered</th>
                      <td className="py-3 px-4">{product1.courses || 'N/A'}</td>
                      <td className="py-3 px-4">{product2.courses || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th className="py-3 px-4 text-left">Website</th>
                      <td className="py-3 px-4">
                        <a href={product1.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{product1.website}</a>
                      </td>
                      <td className="py-3 px-4">
                        <a href={product2.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{product2.website}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-700">
                <MapContainer
                  center={[product1.location.lat, product1.location.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[product1.location.lat, product1.location.lng]}>
                    <Popup>{product1.title}</Popup>
                  </Marker>
                  <Marker position={[product2.location.lat, product2.location.lng]}>
                    <Popup>{product2.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compare;
