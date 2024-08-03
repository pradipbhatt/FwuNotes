import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const testimonials = [
    {
      name: 'Pradip Bhatt',
      title: 'CSE Student & Backend Developer || President:i-CEC',
      company: 'Far Western University',
      img: 'https://pradipbhatt.com.np/medias/parry.jpg',
      quoteTitle: 'Software Developer ',
      quote: 'SOE Notes is a testament to our commitment to excellence and innovation in education.',
      rating: 5
    },
    {
      name: 'Jelina Bhatt',
      title: 'CSE Student 4th Batch',
      company: 'Far Western University',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0LvP1YUJ2stgbrp2srwnFQHaHa%26pid%3DApi&f=1&ipt=ddf716b3788446dcbd7f45a2832d3cc0fe2b87706fadfd17cc54c66862cbd968&ipo=images',
      quoteTitle: 'Resourceful Support',
      quote: 'SOE Notes brings a new perspective to comparing educational institutions and providing essential resources.',
      rating: 4
    },
    {
      name: 'Bijay Saud',
      title: 'CSE Student',
      company: 'Far Western University',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0LvP1YUJ2stgbrp2srwnFQHaHa%26pid%3DApi&f=1&ipt=ddf716b3788446dcbd7f45a2832d3cc0fe2b87706fadfd17cc54c66862cbd968&ipo=images',
      quote: 'The handwritten notes provided by Bijay have been crucial in supporting our education.',
      rating: 5
    },
    {
      name: 'Mukul Bhatt',
      title: 'CSE Student',
      company: 'Far Western University',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.0LvP1YUJ2stgbrp2srwnFQHaHa%26pid%3DApi&f=1&ipt=ddf716b3788446dcbd7f45a2832d3cc0fe2b87706fadfd17cc54c66862cbd968&ipo=images',
      quoteTitle: 'Handwritten Notes Provider Second Batch',
      quote: 'The handwritten notes provided by Mukul have been crucial in supporting our education.',
      rating: 5
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000, // Slide every 1 second
    slidesToShow: 1, // Show 1 card at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Auto slide every 2 seconds
    responsive: [
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
          arrows: false // Hide arrows on mobile
        }
      }
    ]
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-20 bg-transparent overflow-hidden bg-white dark:bg-gray-800">
      <h1 className="text-4xl font-serif text-center mb-12 text-gray-900 dark:text-gray-100">Testimonials</h1>
      <Slider {...sliderSettings} className="mx-auto max-w-9xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-6 shadow-lg mx-4 my-8 lg:my-12 transition-transform transform hover:scale-105"
            data-aos={index % 2 === 0 ? 'flip-left' : 'flip-right'}
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} // Set max width for mobile and center align
          >
            <div className="overflow-hidden rounded-full w-24 h-24 mx-auto mb-6">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110" // Added hover zoom effect
              />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-bringal transition-colors duration-300">{testimonial.name}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{testimonial.title} | {testimonial.company}</p>
              <h2 className="italic text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{testimonial.quoteTitle}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed">{testimonial.quote}</p>
              <div className="flex justify-center mt-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
                {[...Array(5 - testimonial.rating)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-5 h-5 fill-current text-gray-500 dark:text-gray-600" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
