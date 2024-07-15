import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamMembers = [
  {
    name: 'Pradip Bhatt',
    role: 'President',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.inXgh5O_Chd56OM6PROU1gAAAA%26pid%3DApi&f=1&ipt=123cec7b67b4e941bf4944dfdae504127a7df4fdb76ed75f92fb9f8a9c9e36ff&ipo=images', // Replace with actual image URL
    contribution: 'Lead the development and management of i-CEC club activities.',
    position: 1, // President
    contactUrl: 'https://pradipbhatt.com.np', // Replace with actual social media URL
  },
  {
    name: 'Dipak Raj Giri',
    role: 'Vice President',
    image: 'https://avatars.githubusercontent.com/u/93638459?v=4', // Replace with actual image URL
    contribution: 'Assisted in organizing club events and managing club activities.',
    position: 2, // Vice President
    contactUrl: 'https://github.com/Dipakrajgiri', // Replace with actual social media URL
  },
  {
    name: 'Kamal Raj Giri',
    role: 'Treasurer',
    image: 'https://avatars.githubusercontent.com/u/157484491?v=4', // Replace with actual image URL
    contribution: 'Managed club finances and budgeting for events and activities.',
    position: 3, // Treasurer
    contactUrl: 'https://github.com/kamalrajgiri', // Replace with actual social media URL
  },
  {
    name: 'Ram Bhatta',
    role: 'Secretary',
    image: 'https://example.com/ram.jpg', // Replace with actual image URL
    contribution: 'Handled administrative tasks and communication within the club.',
    position: 4, // Secretary
    contactUrl: 'https://example.com/ram_social', // Replace with actual social media URL
  },
  {
    name: 'Bipesh Khadka',
    role: 'General Secretary',
    image: 'https://avatars.githubusercontent.com/u/106030583?v=4', // Replace with actual image URL
    contribution: 'Assisted in organizing club activities and maintaining club records.',
    position: 5, // General Secretary
    contactUrl: 'https://github.com/Bipeshkhadka10', // Replace with actual social media URL
  },
  {
    name: 'Santosh Upadhyay',
    role: 'Tech Lead',
    image: 'https://avatars.githubusercontent.com/u/101114463?v=4', // Replace with actual image URL
    contribution: 'Led technical projects and initiatives within the club.',
    position: 6, // Tech Lead
    contactUrl: 'https://github.com/santosupadhyay', // Replace with actual social media URL
  },
  {
    name: 'Bhupendra',
    role: 'Tech Lead',
    image: 'https://avatars.githubusercontent.com/u/121709397?v=4', // Replace with actual image URL
    contribution: 'Contributed to technical developments and club projects.',
    position: 6, // Tech Lead
    contactUrl: 'https://github.com/Bhupendra143', // Replace with actual social media URL
  },
  {
    name: 'Adarsh Joshi',
    role: 'Tech Lead',
    image: 'https://example.com/adarsh.jpg', // Replace with actual image URL
    contribution: 'Led technical workshops and mentored junior members.',
    position: 6, // Tech Lead
    contactUrl: 'https://github.com/adarshherohoo', // Replace with actual social media URL
  },
  {
    name: 'Dikshya Bam',
    role: 'Social Media Handler',
    image: 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-1/437539765_1141427470638153_8054301702184650461_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=c0RpVMcwVqoQ7kNvgF64Y8F&_nc_ht=scontent.fktm1-1.fna&oh=00_AYApe-3-RDcdsddtAO3r20d5iuhXmNZ0hJox8M7itlYJyg&oe=6699EFE6', // Replace with actual image URL
    contribution: 'Managed social media presence and engagement for the club.',
    position: 7, // Social Media Handler
    contactUrl: 'https://www.facebook.com/dikshyathakuri13?comment_id=Y29tbWVudDoxMjIxMzM4OTgxMjQwNTEyNzFfMjgwNDk1NTA1MTAyNTAw', // Replace with actual social media URL
  },
  {
    name: 'Dileep Pant',
    role: 'Event Organizer',
    image: 'https://example.com/dileep.jpg', // Replace with actual image URL
    contribution: 'Organized club events and coordinated event logistics.',
    position: 8, // Event Organizer
    contactUrl: 'https://example.com/dileep_social', // Replace with actual social media URL
  },
  {
    name: 'Saraswoti Bhandari',
    role: 'Event Organizer',
    image: 'https://avatars.githubusercontent.com/u/143866362?v=4', // Replace with actual image URL
    contribution: 'Assisted in planning and executing club events.',
    position: 8, // Event Organizer
    contactUrl: 'https://github.com/sarswotibhandari', // Replace with actual social media URL
  },
  {
    name: 'Deepa Joshi',
    role: 'Event Organizer',
    image: 'https://avatars.githubusercontent.com/u/100353866?v=4', // Replace with actual image URL
    contribution: 'Contributed to event management and coordination.',
    position: 8, // Event Organizer
    contactUrl: 'https://github.com/Dipajoshi', // Replace with actual social media URL
  },
  {
    name: 'Hema Dhami',
    role: 'Member',
    image: 'https://example.com/hema.jpg', // Replace with actual image URL
    contribution: 'Participated in club activities and supported club initiatives.',
    position: 9, // Member
    contactUrl: 'https://example.com/hema_social', // Replace with actual social media URL
  },
  {
    name: 'Anuradha Bhatta',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/110050148?v=4', // Replace with actual image URL
    contribution: 'Engaged in club events and activities as a supporting member.',
    position: 9, // Member
    contactUrl: 'https://github.com/Anubhatta', // Replace with actual social media URL
  },
  {
    name: 'Babita Bhatta',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/109867371?v=4', // Replace with actual image URL
    contribution: 'Contributed to club activities and supported club initiatives.',
    position: 9, // Member
    contactUrl: 'https://github.com/BabitaBhatt2059', // Replace with actual social media URL
  },
  {
    name: 'Yogesh Awasthi',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/121468998?v=4', // Replace with actual image URL
    contribution: 'Participated in club events and supported club initiatives.',
    position: 9, // Member
    contactUrl: 'https://github.com/suddhababa', // Replace with actual social media URL
  },
];

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  const handleContactClick = (url) => {
    window.open(url, '_blank'); // Open the provided URL in a new tab
  };

  // Sorting teamMembers by position (ascending)
  teamMembers.sort((a, b) => a.position - b.position);

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
            <div className="timeline-start mb-10 bg-gray-100 p-4 rounded-md">
              <time className="font-mono italic">2020-2021</time>
              <div className="text-lg font-black">Continuous Growth</div>
              <p className="max-w-md">During this period, we expanded our website features, adding a cloud integration for file storage and management using MongoDB and Cloudinary. We also added more resources and sections for notes, question papers, and mock tests for engineering students.</p>
            </div>
            <hr />
          </li>
          <li className="flex" data-aos="fade-right">
            <div className="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
            </div>
            <div className="timeline-start md:text-end mb-10 bg-gray-100 p-4 rounded-md">
              <time className="font-mono italic">2021-2022</time>
              <div className="text-lg font-black">Future Expansion</div>
              <p className="max-w-md">Looking forward, we aim to expand our platform further, introducing new features and resources to support the academic journey of engineering students in our college. We plan to enhance user experience and engagement through continuous improvement and feedback.</p>
            </div>
            <hr />
          </li>
        </ul>
      </div>

      <section className="bg-gray-900 py-20 mt-16 dark:bg-gray-100">
  <div className="w-full flex flex-col items-center">
    <h2 className="text-3xl font-bold mb-8 text-gray-100 dark:text-gray-900">
      Executive Committee - 2080/81
    </h2>
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-8 w-full md:w-4/5 lg:w-4/5">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="bg-gray-700 dark:bg-gray-100 p-6 rounded-lg shadow-lg w-full sm:w-full lg:mx-5"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4"
            src={member.image}
            alt={member.name}
          />
          <h3 className="text-lg font-semibold text-center text-gray-100 dark:text-gray-900 mb-2">
            {member.name}
          </h3>
          <p className="text-center text-gray-100 dark:text-gray-900  mb-4">
            {member.role}
          </p>
          <p className="text-center text-gray-100 dark:text-gray-900  text-sm">
            {member.contribution}
          </p>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-200 text-xs md:text-sm hover:bg-blue-600 transform hover:scale-110"
            style={{
              height: '32px',
              padding: '0 10px',
              backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'background-image 1s ease, transform 1s ease',
            }}
            onClick={() => handleContactClick(member.contactUrl)}
          >
            Contact
          </button>
        </div>
      ))}
    </div>
  </div>
</section>


      <Footer />
    </>
  );
}

export default About;
