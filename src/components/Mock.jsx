import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const years = [2077, 2078, 2079, 2080];

const Mock = () => {
  const [currentYear, setCurrentYear] = useState(null);

  const handleTestNowClick = (year) => {
    setCurrentYear(year);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {years.map((year) => (
            <Card key={year} className="p-4">
              <h2 className="text-lg font-semibold mb-4">{year}</h2>
              <Link to={`/Mock${year - 2076}/`}> {/* Update the to prop */}
                <Button variant="contained" onClick={() => handleTestNowClick(year)}>
                  Test Now
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mock;
