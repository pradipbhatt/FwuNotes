import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Shadharan = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('/Teachers.json')
      .then(response => response.json())
      .then(data => setTeachers(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <img
              src="https://scontent.fktm19-1.fna.fbcdn.net/v/t1.6435-9/65503003_1321927047974642_5826116552839135232_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mYWvICQGEx0Q7kNvgGRLgbd&_nc_ht=scontent.fktm19-1.fna&oh=00_AYBduhmyJBTusBzkGb4QMiJod8MqXdbOZ0aA0XSOqrU5Rg&oe=668A3A7C"
              alt="Shree Mahendranagar Secondary School"
              className="w-full h-80 object-cover"
            />
            <div className="p-6 md:p-8 lg:p-10">
              <h1 className="text-3xl font-bold mb-4">Shree Mahendranagar Secondary School</h1>
              <p className="text-xl mb-4">
                Mahendranagar Model Secondary School (Sadharan) is one of the fastest growing co-educational institutes dedicated for educational excellence. This school is established in 2033B.S. Mahendranagar model secondary school (Sadharan) has been successful to institutionalize itself imparting quality education to its students of secondary level in a peaceful, harmonious and competitive environment. Due to the tireless efforts of our team of dedicated and competent teachers and staff it has always been able to obtain flying colors in the SEE Board Examination.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Admissions Information:</h2>
              <p className="mb-4">
                Registered candidates have to appear in entrance test conducted by the school management. The format of entrance test will be as shown.
                <br />
                <strong>Science Stream:</strong> Comp.Math 30, English 25, Science 40
                <br />
                <strong>Management Stream:</strong> Comp.Math 40, English 40, Interview 20
                <br />
                <strong>Law Stream:</strong> English 50, Social St. 30, Interview 20
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Academic Programs:</h2>
              <p className="mb-4">
                Mahendranagar Secondary School (Sadharan) in Mahendranagar, Kanchanpur, Nepal, offers a variety of academic programs catering to different educational streams. The school provides Science and Management streams at the +2 level, affiliated with the National Examination Board (NEB). In the Science stream, students focus on core subjects such as Compulsory Mathematics, English, and Science, with a small portion allocated for an interview process. The Management stream also emphasizes Compulsory Mathematics and English, along with an interview to gauge student potential. Additionally, the school offers technical education programs, including a Diploma in Agriculture (Plant Science) and a Diploma in Civil Engineering, with limited seats available for each program. These diverse programs are designed to meet the educational needs and career aspirations of students in the region.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Extracurricular Activities:</h2>
              <p className="mb-4">
                Mahendranagar Secondary School (Sadharan) in Mahendranagar, Kanchanpur, Nepal, offers a robust extracurricular activities (ECA) program designed to complement its academic curriculum and foster holistic student development. The school encourages participation in a wide range of sports, including table tennis, basketball, badminton, volleyball, cricket, football, and athletics, promoting physical fitness and teamwork. Additionally, cultural programs nurture talents in acting, poetry, and painting, allowing students to explore and develop their artistic skills. These activities aim to cultivate well-rounded individuals by providing opportunities for personal growth, creativity, and social interaction beyond the classroom.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Student Support Services:</h2>
              <p className="mb-4">
                Mahendranagar Secondary School (Sadharan) in Mahendranagar, Kanchanpur, Nepal, is dedicated to providing comprehensive student support services to ensure academic success and personal development. The school offers a range of scholarships and financial aid programs to assist meritorious and financially disadvantaged students, making education accessible to all. It employs a student-centered teaching methodology, incorporating interactive and practical learning approaches such as case studies, group discussions, project assignments, and field trips. To promote discipline and equality, the school enforces a strict uniform policy and a code of conduct, fostering a respectful and orderly learning environment. These support services are designed to create a nurturing atmosphere that helps students achieve their full potential.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Facilities and Resources:</h2>
              <p className="mb-4">
                Mahendranagar Secondary School (Sadharan) in Mahendranagar, Kanchanpur, Nepal, is equipped with modern facilities and resources to support a holistic educational experience. The school boasts a well-stocked library providing access to a wide range of books and learning materials. Sporting enthusiasts can benefit from various sports facilities, including table tennis, basketball, badminton, volleyball, cricket, football, and athletics. Additionally, the school promotes talents in acting, poetry, and painting through cultural programs. A computer lab with high-speed connectivity enables students to access the digital world for advanced learning. Educational tours and seminars further enhance practical knowledge and exposure. These facilities and resources contribute significantly to creating a conducive environment for academic excellence and overall student development at Mahendranagar Secondary School.
              </p>

              <h2 className="text-2xl font-bold mt-6 mb-2">Teachers Information:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {teachers.map((teacher, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="w-full h-40 flex justify-center items-center overflow-hidden">
                      <img
                        src={teacher.image}
                        alt={`${teacher.name}`}
                        className="object-cover h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{teacher.name}</h3>
                      <p className="text-sm">{teacher.qualification}</p>
                      <p className="text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-6 mb-2">Contact Details of Radiant Secondary School Mahendranagar, Kanchanpur</h2>
              <p className="mb-4">
                <strong>Address:</strong> Science Campus Road, Bhimdutt Municipality-18, Mahendranagar, Kanchanpur, Sudurpaschim Province, Nepal
                <br />
                <strong>Email:</strong> radianths.edu.np@gmail.com
                <br />
                <strong>Website:</strong> <a href="http://radianths.edu.np" className="text-blue-500" target="_blank" rel="noopener noreferrer">http://radianths.edu.np</a>
                <br />
                <strong>Contact:</strong> +977-99-525169
              </p>

              <div className="w-full h-64">
                <iframe
                  src="https://maps.google.com/maps?q=28.9716,80.1776&z=15&output=embed"
                  className="w-full h-full"
                  allowFullScreen=""
                  loading="lazy"
                  title="School Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shadharan;
