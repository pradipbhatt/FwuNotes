import React from 'react';
import Navbar from '../Navbar';
import Footer from '../home/Footer';
import { motion } from 'framer-motion';

const AdmissionGuidelines = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-500">
        <motion.section
          className="mb-12 mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-3xl font-extrabold mb-8 mt-20 text-gray-800 dark:text-gray-100">
            Far Western University Faculty of Engineering
          </h1>
          <p className="text-center text-lg font-medium mb-4 text-gray-600 dark:text-gray-300">
            Admission Notice (2024/25)
          </p>
        </motion.section>

        <motion.section
          className="mb-10 px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
            <strong>Far Western University</strong><br />
            <strong>Faculty of Engineering, Dean's Office</strong><br />
            <strong>Mahendranagar, Kanchanpur</strong>
          </p>

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
            <li>B.E. Computer Program: 48 (Regular - 20, Full Fee - 28)</li>
            <li>B.E. Civil Program: 48 (Regular - 24, Full Fee - 24)</li>
            <li>B.Architecture Program: 24 (Regular - 12, Full Fee - 12)</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Admission Form Submission Date:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">From 2081/04/22 to 2081/04/25</p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Form Submission Method:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Through the Far Western University website: <a href="http://www.fwu.edu.np" className="text-blue-500 dark:text-blue-300 underline">www.fwu.edu.np</a> in the Engineering Admission Open tab, from 2081/04/22 to 2081/04/25.
          </p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Last Date for Form Submission:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">2081/04/25, by 5:00 PM</p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Entrance Examination Date and Time:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">2081/04/29, from 10:00 AM onwards</p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Examination Venue:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">Central Campus of Engineering, Bhimdatta Municipality, Mahendranagar</p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Examination Fee:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            NPR 2500/- (Nepalese Rupees Three Thousand only) payable to FWU Department of Civil Engineering's current account at Rastriya Banijya Bank, Mahendranagar branch, account no. 1110010736225000
          </p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Minimum Qualifications for Application:
          </h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
            <li>Students who have completed 10+2 in Science or A-Level or equivalent with at least 45% in Physics, Chemistry, and Mathematics or a minimum 'C' grade in each subject. For A-Level, a minimum of 'D' grade in each subject is required.</li>
            <li>Students with grades lower than mentioned above are not eligible to apply.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Required Documents for Online Application:
          </h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
            <li>Citizenship Certificate</li>
            <li>Recent passport-size photo with a plain background</li>
            <li>SEE or equivalent exam marksheet, character certificate, and transfer certificate</li>
            <li>10+2 or equivalent exam transcript, character certificate, and transfer certificate</li>
            <li>Bank voucher of NPR 2,500 deposited in account no. 1110010736225000 at Rastriya Banijya Bank, Mahendranagar branch</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            For more information:
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Visit the Faculty of Engineering website: <a href="http://www.facultyengineering.fwu.edu.np" className="text-blue-500 dark:text-blue-300 underline">www.facultyengineering.fwu.edu.np</a> or contact 099-525199.
          </p>

          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
            Note:
          </h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
            <li>Any student found to have submitted false documents will have their application and admission canceled at any stage.</li>
            <li>Students must present their original documents during the entrance examination. Those who fail to do so will be disqualified from the examination.</li>
          </ul>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionGuidelines;
