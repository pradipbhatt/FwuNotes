import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Pradip Bhatt',
      title: 'CSE Student & Backend Developer',
      company: 'Far Western University',
      img: 'https://pradipbhatt.com.np/medias/parry.jpg', // Replace with actual image URL
      quoteTitle: 'Dedicated Developer',
      quote: 'SOE Notes is a testament to our commitment to excellence and innovation in education.',
      rating: 5
    },
    {
      name: 'Jelina Bhatt',
      title: 'CSE Student',
      company: 'Far Western University',
      img: 'https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/319815297_3320856574854383_2441959363397401367_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=A25eu2uw0c4Q7kNvgHfO8QI&_nc_ht=scontent.fktm19-1.fna&oh=00_AYCTH5BzDu1pqUcnBezA39-rY9k8Hv4eC29hHOHT__Kpbw&oe=6679EA52', // Replace with actual image URL
      quoteTitle: 'Resourceful Support',
      quote: 'SOE Notes brings a new perspective to comparing educational institutions and providing essential resources.',
      rating: 4
    },
    {
      name: 'Bijay Saud',
      title: 'CSE Student',
      company: 'Far Western University',
      img: 'https://scontent.fktm19-1.fna.fbcdn.net/v/t39.30808-6/341151557_101011719647949_7538820499509787011_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ur8vr9aVQI8Q7kNvgEsyuHb&_nc_ht=scontent.fktm19-1.fna&oh=00_AYDEh3F2oz2AlhRXnpWpAfo-qVw1D7sfLbC1o4v2yC-yPQ&oe=6679E296', // Replace with actual image URL
      quoteTitle: 'Handwritten Notes Provider',
      quote: 'The handwritten notes provided by Bijay have been crucial in supporting our education.',
      rating: 5
    }
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-20">
      <h1 className="text-3xl font-serif text-center mb-12">Testimonials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md">
            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <div className="text-center mt-6">
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
      </div>
    </div>
  );
};

export default Testimonials;
