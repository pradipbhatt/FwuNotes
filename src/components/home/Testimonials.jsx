import React, { useState } from 'react';
import jelina from '../../../public/u.jpg';
import pradip from '../../../public/pradip.jpg';

const TESTIMONIALS = [
  {
    name: 'Pradip Bhatt',
    role: 'President, i-CEC',
    batch: '4th Batch · CSE',
    img: pradip,
    quote: 'SOE Notes is a testament to our commitment to excellence and innovation in education. It brings everything a student needs — notes, mock tests, AI tools — into one place.',
    rating: 5,
    initials: 'PB',
  },
  {
    name: 'Jelina Bhatt',
    role: 'Contributor',
    batch: '4th Batch · CSE',
    img: jelina,
    quote: 'SOE Notes brings a fresh perspective to education by providing essential resources exactly when students need them most. It has made learning so much more accessible.',
    rating: 4,
    initials: 'JB',
  },
  {
    name: 'Bijay Saud',
    role: 'Notes Provider',
    batch: '2nd Batch · CSE',
    img: null,
    quote: 'The handwritten notes I contributed have helped countless students. Seeing them reach so many learners through this platform is incredibly rewarding.',
    rating: 5,
    initials: 'BS',
  },
  {
    name: 'Mukul Bhatt',
    role: 'Notes Provider',
    batch: '2nd Batch · CSE',
    img: null,
    quote: 'Contributing my notes to SOE Notes has been a fulfilling experience. The platform makes quality resources freely accessible to everyone — exactly what education should be.',
    rating: 5,
    initials: 'MB',
  },
];

const INITIALS_BG = [
  'bg-stone-600',
  'bg-neutral-600',
  'bg-slate-600',
  'bg-zinc-600',
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-amber-500' : 'text-gray-200 dark:text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [imgErrors, setImgErrors] = useState({});

  return (
    <section className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            Community Voices
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            What Students Say
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
            From the people who built and use SOE Notes every day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => {
            const showPhoto = t.img && !imgErrors[t.name];
            return (
              <div
                key={t.name}
                className="bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col gap-5 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                {/* Top: stars + quote mark */}
                <div className="flex items-start justify-between">
                  <Stars count={t.rating} />
                  <span className="text-4xl font-serif leading-none text-gray-200 dark:text-gray-700 select-none -mt-1" aria-hidden>
                    "
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* Person row */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {showPhoto ? (
                    <img
                      src={t.img}
                      alt={t.name}
                      onError={() => setImgErrors(e => ({ ...e, [t.name]: true }))}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 shrink-0"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-full ${INITIALS_BG[i % INITIALS_BG.length]} flex items-center justify-center text-white text-base font-semibold ring-2 ring-gray-100 dark:ring-gray-700 shrink-0`}>
                      {t.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.role}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{t.batch}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
