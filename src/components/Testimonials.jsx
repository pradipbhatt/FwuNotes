import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const testimonials = [
    {
      name: 'Pradip Bhatt',
      title: 'CSE Student & Backend Developer',
      company: 'Far Western University',
      img: 'https://pradipbhatt.com.np/medias/parry.jpg',
      quoteTitle: 'Dedicated Developer',
      quote: 'SOE Notes is a testament to our commitment to excellence and innovation in education.',
      rating: 5
    },
    {
      name: 'Jelina Bhatt',
      title: 'CSE Student 4th Batch',
      company: 'Far Western University',
      img: 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/291759961_587583433092843_1552650560748294747_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=jk2bvqPuHsQQ7kNvgHg60Bc&_nc_ht=scontent.fktm1-1.fna&gid=A_S5Xw_pQapORxRIjiu0SXU&oh=00_AYBjN3x7PHr0une2QYBy9-adrXjDlm4H7qY8_-VsOaXyGA&oe=668B591B',
      quoteTitle: 'Resourceful Support',
      quote: 'SOE Notes brings a new perspective to comparing educational institutions and providing essential resources.',
      rating: 4
    },
    {
      name: 'Bijay Saud',
      title: 'CSE Student',
      company: 'Far Western University',
      img: 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/341151557_101011719647949_7538820499509787011_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=tIWHbf3-jPcQ7kNvgHg6z3Z&_nc_ht=scontent.fktm1-1.fna&oh=00_AYBiSGMcJ8MK8Uqzdaxk2YXl10ES95S68s66IBjgQA1qxg&oe=668B7696',
      quoteTitle: 'Handwritten Notes Provider',
      quote: 'The handwritten notes provided by Bijay have been crucial in supporting our education.',
      rating: 5
    },
    {
      name: 'Mukul Bhatt',
      title: 'CSE Student',
      company: 'Far Western University',
      img: '../../public/mukul.jpeg', // Replace with actual image URL
      quoteTitle: 'Handwritten Notes Provider Second Batch',
      quote: 'The handwritten notes provided by Mukul have been crucial in supporting our education.',
      rating: 5
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slide every 1 second
    slidesToShow: 1, // Show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Auto slide every 2 seconds
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
          dots: true
        }
      }
    ]
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-20 bg-transparent">
      <h1 className="text-3xl font-serif text-center mb-12">Testimonials</h1>
      <Slider {...sliderSettings} className="mx-auto max-w-9xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md mx-4 md:mx-2 my-4 lg:my-0 lg:w-full lg:mx-0"
            data-aos={index % 2 === 0 ? 'flip-left' : 'flip-right'}
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            style={{ margin: '0 15px', width: '250px' }} // Decreased width of the cards and added margin
          >
            <div className="overflow-hidden rounded-full w-24 h-24 mx-auto mb-6">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110" // Added hover zoom effect
              />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{testimonial.title} | {testimonial.company}</p>
              <h2 className="italic text-lg font-bold text-gray-800 mb-2">{testimonial.quoteTitle}</h2>
              <p className="text-sm text-gray-800 leading-relaxed">{testimonial.quote}</p>
              <div className="flex justify-center mt-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
                {[...Array(5 - testimonial.rating)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-5 h-5 fill-current text-gray-300" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
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
