import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../home/Footer';
import { motion } from 'framer-motion';

const AdmissionGuidelines = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardId) => {
    setActiveCard(cardId === activeCard ? null : cardId);
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500 pt-10">
        <motion.section
          className="container mx-auto p-2 max-w-7xl bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-2xl font-extrabold mb-8 mt-10 text-gray-800 dark:text-gray-100">
            Notices and Announcements
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 - FWU Engineering Admission Notice */}
            <motion.div
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleCardClick(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">FWU Engineering Admission Notice</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Admission notice for B.E. (Civil, Computer) and B.Arch programs for 2024/25.
              </p>
            </motion.div>

            {/* Card 2 - ICEC Call for Articles */}
            <motion.div
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleCardClick(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">ICEC Call for Articles</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Call for articles for the 2024 IT Express by the Innovative Engineering Club (ICEC).
              </p>
            </motion.div>
          </div>

          {/* Content for FWU Engineering Admission Notice */}
          {activeCard === 1 && (
            <motion.section
              className="mt-12 px-6 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
                Far Western University School of Engineering - Admission Notice (2024/25)
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Far Western University, Faculty of Engineering, announces the admission for the academic year 2024/25 in the following undergraduate programs:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li><span className="font-semibold">B.E. Computer Program:</span> 48 seats</li>
                <li><span className="font-semibold">B.E. Civil Program:</span> 48 seats</li>
                <li><span className="font-semibold">B.Architecture Program:</span> 24 seats</li>
              </ul>
              {/* Add more details here as per the original content */}
              <motion.section
            className="mb-12 px-6 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
           
            <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
              <strong>Notice for Student Admission in B.E. (Civil, Computer) and B.Arch Programs</strong>
            </p>

            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Far Western University, Faculty of Engineering, announces the admission for the academic year 2024/25 in the following undergraduate programs:
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Number of Seats:
            </h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">B.E. Computer Program:</span> 48 (Regular - 24, Full Fee - 24)</li>
              <li><span className="font-semibold">B.E. Civil Program:</span> 48 (Regular - 24, Full Fee - 24)</li>
              <li><span className="font-semibold">B.Architecture Program:</span> 24 (Regular - 24, Full Fee - 24)</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Admission Form Submission Date:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-red-500">From 2081/05/23 to 2081/05/25</span>
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Form Submission Method:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Through the Far Western University website: <a href="http://www.fwu.edu.np" className="text-blue-500 dark:text-blue-300 underline">www.fwu.edu.np</a> in the Engineering Admission Open tab, from <span className="font-semibold text-red-500">2081/05/22 to 2081/05/25</span>.
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Last Date for Form Submission:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-red-500">2081/05/25, by 5:00 PM</span>
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Entrance Examination Date and Time:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-red-500">2081/05/29, from 10:00 AM onwards</span>
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Examination Venue:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Central Campus of Engineering, Bhimdatta Municipality, Mahendranagar
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Examination Fee:
            </h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              NPR 2500/- (Nepalese Rupees Two Thousand Five Hundred only) payable to FWU Department of Civil Engineering's current account at Nepal Bank Limited, Mahendranagar branch, account no. <span className="font-semibold">15600106526348000006</span>
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Minimum Qualifications for Application:
            </h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-600 mb-6">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Eligibility Criteria
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                    <span className="font-semibold">The student should have passed +2 level or equivalent</span> 
                    from recognized institutions.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                    The students must have obtained at least 
                    <span className="font-semibold text-red-500">45% in Physics, Chemistry, and Mathematics</span> 
                    or a minimum 
                    <span className="font-semibold text-red-500">'C' grade</span> 
                    in each subject.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                    For All other subjects, a minimum of 
                    <span className="font-semibold text-red-500">'D' grade</span> 
                    in each subject is required.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-red-500">The students who have grades lower than mentioned above are not eligible to apply.</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Required Documents for Online Application:
            </h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">Citizenship Certificate</span></li>
              <li><span className="font-semibold">Recent passport-size photo</span> with a plain background</li>
              <li><span className="font-semibold">SEE or equivalent exam marksheet</span>, character certificate, and transfer certificate</li>
              <li><span className="font-semibold">10+2 or equivalent exam transcript</span>, character certificate, and transfer certificate</li>
              <li><span className="font-semibold">Original Bank Voucher</span> for the exam fee</li>
              <li><span className="font-semibold">Photocopy of the receipt</span> to be uploaded in the online form</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              Important Notes:
            </h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">Incomplete applications</span> or applications without required documents will be rejected.</li>
              <li>Applications must be submitted online by the mentioned deadline.</li>
              <li>For any inquiries, please contact the <span className="font-semibold">Dean’s Office</span> at <span className="font-semibold">0985003456</span>.</li>
              <li>Ensure all information is filled accurately.</li>
            </ul>

            <p className="text-center text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Note:</span> 
              In case of any changes or updates in the admission process, the updated information will be published on the university website.
            </p>
          </motion.section>
            </motion.section>
            
          )}

          {/* Content for ICEC Call for Articles */}
          {activeCard === 2 && (
            <motion.section
              className="mt-12 px-6 py-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
                ICEC - Call for Articles (2024 IT Express)
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                The Innovative Engineering Club (ICEC) invites students to submit articles for the 2024 edition of IT Express. Topics related to emerging IT trends, innovative technologies, and computer science research are encouraged.
              </p>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Submission Deadline: <span className="font-semibold text-red-500">October 30, 2024</span>
              </p>
              {/* Add more details about the article call */}
            </motion.section>
          )}
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionGuidelines;
