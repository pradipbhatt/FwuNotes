import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AdmissionGuidelines = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl">
        <section className="mb-10 mt-10">
          <h1 className="text-center text-2xl font-bold mb-6 mt-20">
            Far Western University Faculty of Engineering: BE Entrance Examination Guidelines (2079/80)
          </h1>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Far Western University (FWU) was established in 2010 through an Act of Parliament as a government-funded university. It aims to become a leading academic institution in Nepal, focusing on academic excellence, creative innovation, and research-based education. The university is strategically located in Sudurpaschim Province, with its central office in Bheemdatta Municipality, Kanchanpur district. Since its inception, FWU has been dedicated to making higher education accessible to the people of this province and the nation.
          </p>
          <p className="mb-4">
            FWU started its Bachelor of Civil Engineering Program (4-year program) in 2014 and launched the Bachelor of Computer Engineering program in the academic year 2077/78. All engineering programs are managed under the Faculty of Engineering (FOE).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">2. Academic Programs at Faculty of Engineering</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 font-semibold">SN</th>
                  <th className="px-4 py-2 font-semibold">Programme</th>
                  <th className="px-4 py-2 font-semibold">Duration (Years)</th>
                  <th className="px-4 py-2 font-semibold">Semesters</th>
                  <th className="px-4 py-2 font-semibold">Number of Students (Regular)</th>
                  <th className="px-4 py-2 font-semibold">Number of Students (Full-Pay)</th>
                  <th className="px-4 py-2 font-semibold">Total Students</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Bachelor of Civil Engineering</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">24</td>
                  <td className="border px-4 py-2">24</td>
                  <td className="border px-4 py-2">48</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Bachelor of Computer Engineering</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">24</td>
                  <td className="border px-4 py-2">24</td>
                  <td className="border px-4 py-2">48</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">3. Entry Requirements</h2>
          <h3 className="text-lg font-semibold mb-2">3.1 Requirements for National Examination Board (NEB) or equivalent:</h3>
          <p className="mb-4">
            - Candidates must have studied Physics (P), Chemistry (C), and Mathematics (M), and passed SLC (class 12) or equivalent from a recognized institution.<br />
            - Candidates must have scored at least 45% or a CGPA of 2 (on a scale of 4), and at least Grade C (or Grade D for A-level) in each subject (P, C, M). The Grade C minimum does not apply to other courses.
          </p>
          <h3 className="text-lg font-semibold mb-2">3.2 Mathematics Requirement:</h3>
          <p className="mb-4">
            - Candidates must have studied at least 100 marks of mathematics in SLC (class 12) or equivalent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">4. Syllabus Structure and Contents</h2>
          <p className="mb-4">
            <strong>Weightage:</strong> Mathematics (M) - 40%, Physics (P) - 30%, Chemistry (C) - 20%, English (E) - 10%<br />
            <strong>Contents:</strong> Detailed syllabus for M, P, C, and E is provided in Section 11 of the guideline.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">5. Application Submission Process</h2>
          <h3 className="text-lg font-semibold mb-2">5.1 Publication of Entrance Notice:</h3>
          <p className="mb-4">
            - Published 35 days before the entrance exam date.
          </p>
          <h3 className="text-lg font-semibold mb-2">5.2 Mode of Submission:</h3>
          <p className="mb-4">
            - Applications must be submitted online.
          </p>
          <h3 className="text-lg font-semibold mb-2">5.3 Application Fee:</h3>
          <p className="mb-4">
            - NRs 2500, with a possible annual increase of up to 10%.
          </p>
          <h3 className="text-lg font-semibold mb-2">5.4 Required Documents:</h3>
          <p className="mb-4">
            - Citizenship certificate or passport/national ID for foreign students.<br />
            - Copies of certificates (transcripts, provisional, transfer, character certificates) for SEE (or equivalent) and SLC (class 12).<br />
            - Required certificates/documents for inclusive scholarship applicants.<br />
            - Equivalence certificate for exams other than NEB/CTEVT.<br />
            - Provisional applications are accepted for students awaiting results, but complete documents must be submitted at admission time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">6. Scholarship Provision</h2>
          <p className="mb-4">
            FWU offers scholarships to 24 students in each engineering program across various categories: merit-based, inclusive, district-wise, backward region, and staff quota.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">7. Scholarship Categories and Selection Criteria</h2>
          <h3 className="text-lg font-semibold mb-2">7.1 Merit-based Scholarship:</h3>
          <p className="mb-4">
            - Top seven rank holders (including 1 woman) in the entrance exam.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.2 Inclusive Scholarship:</h3>
          <p className="mb-4">
            - Six students from categories: Women, Madhesi, Dalit, Aadibasi/Janjati, Disabled, Backward region.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.3 District-wise Scholarship:</h3>
          <p className="mb-4">
            - Nine students from each district of Sudurpaschim Province.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.4 Staff Quota:</h3>
          <p className="mb-4">
            - Two students, must be a permanent staff/teacher of FWU or their child, with the staff having completed a one-year provisional period.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.5 Application Form:</h3>
          <p className="mb-4">
            - Must be appropriately filled and readable.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.6 Disable Category:</h3>
          <p className="mb-4">
            - Priority based on type of disability and entrance score.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.7 District-wise and Backward Region Quota:</h3>
          <p className="mb-4">
            - Must be permanent residents and have completed SEE from a government-funded community school in the district.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.8 Scholarship Criteria:</h3>
          <p className="mb-4">
            - Must meet criteria; if vacant, scholarships are not transferred.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.9 Full-Pay Category:</h3>
          <p className="mb-4">
            - Merit list based on entrance exam scores.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.10 Tie-breaker:</h3>
          <p className="mb-4">
            - Based on average score in Mathematics, Physics, and Chemistry in class 12 or equivalent.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.11 Vacant Scholarships:</h3>
          <p className="mb-4">
            - Added to Full-Pay category if no eligible candidates.
          </p>
          <h3 className="text-lg font-semibold mb-2">7.12 Admission Deadline:</h3>
          <p className="mb-4">
            - Waiting list candidates admitted if first list students do not respond.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">8. Admission Cancellation and Refund of Deposits</h2>
          <p className="mb-4">
            - A student can apply for cancellation within the designated period with valid reasons.<br />
            - 50% of the tuition fee is refunded if canceled within the period.<br />
            - Applications after the designated time are not considered.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">9. Entrance Exam Schedule</h2>
          <h3 className="text-lg font-semibold mb-2">9.1 Examination Date:</h3>
          <p className="mb-4">
            - To be fixed by the FOE.
          </p>
          <h3 className="text-lg font-semibold mb-2">9.2 Examination Centers:</h3>
          <p className="mb-4">
            - FWU Central Campus (Mahendranagar, Kanchanpur).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">10. Evaluation and Result Publication Process</h2>
          <h3 className="text-lg font-semibold mb-2">10.1 Merit List:</h3>
          <p className="mb-4">
            - 100% weightage to entrance exam score.
          </p>
          <h3 className="text-lg font-semibold mb-2">10.2 Threshold:</h3>
          <p className="mb-4">
            - Minimum 40% to be included in the merit list.
          </p>
          <h3 className="text-lg font-semibold mb-2">10.3 Timeline:</h3>
          <p className="mb-4">
            - Results published within 7 working days after the exam.
          </p>
          <h3 className="text-lg font-semibold mb-2">10.4 Medium:</h3>
          <p className="mb-4">
            - University website and School of Engineering notice board.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">11. Syllabus Framework and Contents</h2>
          <h3 className="text-lg font-semibold mb-2">Mathematics [40%]</h3>
          <p className="mb-4">
            1. Set, Logic and Functions<br />
            2. Algebra<br />
            3. Trigonometry<br />
            4. Coordinate Geometry<br />
            5. Calculus<br />
            6. Vectors and their Products<br />
            7. Statistics and Probability
          </p>
          <h3 className="text-lg font-semibold mb-2">Physics [30%]</h3>
          <p className="mb-4">
            1. Mechanics<br />
            2. Heat and Thermodynamics<br />
            3. Geometric and Physical Optics<br />
            4. Waves and Sound<br />
            5. Electricity and Magnetism
          </p>
          <h3 className="text-lg font-semibold mb-2">Chemistry [20%]</h3>
          <h3 className="text-lg font-semibold mb-2">English [10%]</h3>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AdmissionGuidelines;
