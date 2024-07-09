import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // Whether animation should happen only once while scrolling down
      mirror: false, // Whether elements should animate out while scrolling up
    });
  }, []);

  const handleContactClick = () => {
    window.open('https://pradipbhatt.com.np', '_blank');
  };

  return (
    <>
      <Navbar />

      <div className="w-full flex flex-col items-center mt-12">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-10 w-full md:w-3/4">
          <li className="flex" data-aos="fade-right">
            <div className="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            </div>
            <div className="timeline-start md:text-end mb-10 bg-gray-100 p-4 rounded-md">
              <time className="font-mono italic">2020</time>
              <div className="text-lg font-black">Our Journey Begins</div>
              <p className="max-w-md">Our journey began in the first semester of our college in 2020. Initially, we started with a simple HTML and CSS website to support college students by providing necessary notes, tutorials, old question collections, and other resources. We collaborated with our juniors and added them as drive maintainers to share their resources with fellow juniors, creating a learning environment within the college.</p>
            </div>
            <hr />
          </li>
          <li className="flex justify-center" data-aos="fade-left">
            <div className="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            </div>
            <div className="timeline-end mb-10 bg-gray-100 p-4 rounded-md">
              <time className="font-mono italic">2023</time>
              <div className="text-lg font-black">iCEC Club Established</div>
              <p className="max-w-md">In 2023, we established the iCEC Club, through which we organized various events including Figma and Canva training workshops, Git and GitHub workshops, AI talk shows, and research talk shows. These events were organized in series to foster learning and skill development among the students.</p>
            </div>
            <hr />
          </li>
        </ul>

        <h2 className='flex justify-center items-center text-lg font-black mt-10' data-aos="fade-right">About Developer</h2>
        <div className="flex justify-center items-center mt-4" data-aos="fade-right">
          <div className="card w-96 bg-base-800 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://pradipbhatt.com.np/medias/parry.jpg" alt="Pradip Bhatt" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Pradip Bhatt</h2>
              <p>A passionate Computer Engineer From Far West Nepal.</p>
              <div className="card-actions">
                <button className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-700 duration-300 cursor-pointer" onClick={handleContactClick}>Contact Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
