import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';
import Chat from '../components/AI/Chat';
import logo from '../../public/logo-icec.png';
import {
  HiLightningBolt, HiAcademicCap, HiUserGroup, HiGlobeAlt,
  HiExternalLink, HiMail,
} from 'react-icons/hi';

/* ─── Data ──────────────────────────────────────────────────────────── */

const STATS = [
  { label: 'Club Members', value: '16+', icon: HiUserGroup },
  { label: 'Years Active', value: '5+', icon: HiLightningBolt },
  { label: 'Notes & Resources', value: '200+', icon: HiAcademicCap },
  { label: 'Students Helped', value: '1000+', icon: HiGlobeAlt },
];

const TIMELINE = [
  {
    year: '2020',
    title: 'The Beginning',
    desc: 'Our journey started in the first semester at FWU School of Engineering. We built a simple HTML/CSS site to share notes, old question papers, and tutorials with fellow students — all hosted on Google Drive with junior batch contributors.',
  },
  {
    year: '2020–21',
    title: 'Continuous Growth',
    desc: 'We expanded the platform with MongoDB and Cloudinary for cloud-based resource storage. New sections for mock tests and semester-wise materials were added as the student base grew rapidly.',
  },
  {
    year: '2021–22',
    title: 'SOE Notes Goes Modern',
    desc: 'Migrated to a full React + Vite stack with a REST API backend. Introduced user authentication, PDF viewer, AI Chat assistant, and a full entrance exam mock-test portal with real quiz data.',
  },
  {
    year: '2022+',
    title: 'Looking Ahead',
    desc: 'We continue enhancing the platform with better search, civil engineering resources, performance improvements, and richer community features — driven by student feedback from every batch.',
  },
];

const ROLE_ORDER = {
  'President': 1,
  'Vice President': 2,
  'Treasurer': 3,
  'Secretary': 4,
  'General Secretary': 5,
  'Tech Lead': 6,
  'Social Media Handler': 7,
  'Event Organizer': 8,
  'Member': 9,
};

const TEAM = [
  {
    name: 'Pradip Bhatt',
    role: 'President',
    image: 'https://avatars.githubusercontent.com/u/76877122?v=4',
    url: 'https://pradipbhatt.com.np',
  },
  {
    name: 'Dipak Raj Giri',
    role: 'Vice President',
    image: 'https://avatars.githubusercontent.com/u/93638459?v=4',
    url: 'https://github.com/Dipakrajgiri',
  },
  {
    name: 'Kamal Raj Giri',
    role: 'Treasurer',
    image: 'https://avatars.githubusercontent.com/u/157484491?v=4',
    url: 'https://github.com/kamalrajgiri',
  },
  {
    name: 'Ram Bhatta',
    role: 'Secretary',
    image: null,
    url: null,
  },
  {
    name: 'Bipesh Khadka',
    role: 'General Secretary',
    image: 'https://avatars.githubusercontent.com/u/106030583?v=4',
    url: 'https://github.com/Bipeshkhadka10',
  },
  {
    name: 'Santosh Upadhyay',
    role: 'Tech Lead',
    image: 'https://avatars.githubusercontent.com/u/101114463?v=4',
    url: 'https://github.com/santosupadhyay',
  },
  {
    name: 'Bhupendra',
    role: 'Tech Lead',
    image: 'https://avatars.githubusercontent.com/u/121709397?v=4',
    url: 'https://github.com/Bhupendra143',
  },
  {
    name: 'Adarsh Joshi',
    role: 'Tech Lead',
    image: null,
    url: 'https://github.com/adarshherohoo',
  },
  {
    name: 'Dikshya Bam',
    role: 'Social Media Handler',
    image: 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-1/437539765_1141427470638153_8054301702184650461_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=c0RpVMcwVqoQ7kNvgF64Y8F&_nc_ht=scontent.fktm1-1.fna&oh=00_AYApe-3-RDcdsddtAO3r20d5iuhXmNZ0hJox8M7itlYJyg&oe=6699EFE6',
    url: null,
  },
  {
    name: 'Dileep Pant',
    role: 'Event Organizer',
    image: null,
    url: null,
  },
  {
    name: 'Saraswoti Bhandari',
    role: 'Event Organizer',
    image: 'https://avatars.githubusercontent.com/u/143866362?v=4',
    url: 'https://github.com/sarswotibhandari',
  },
  {
    name: 'Deepa Joshi',
    role: 'Event Organizer',
    image: 'https://avatars.githubusercontent.com/u/100353866?v=4',
    url: 'https://github.com/Dipajoshi',
  },
  {
    name: 'Anuradha Bhatta',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/110050148?v=4',
    url: 'https://github.com/Anubhatta',
  },
  {
    name: 'Babita Bhatta',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/109867371?v=4',
    url: 'https://github.com/BabitaBhatta2059',
  },
  {
    name: 'Yogesh Awasthi',
    role: 'Member',
    image: 'https://avatars.githubusercontent.com/u/121468998?v=4',
    url: 'https://github.com/suddhababa',
  },
  {
    name: 'Hema Dhami',
    role: 'Member',
    image: null,
    url: null,
  },
].sort((a, b) => (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99));

const ROLE_COLORS = {
  'President': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  'Vice President': 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  'Treasurer': 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  'Secretary': 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
  'General Secretary': 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300',
  'Tech Lead': 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  'Social Media Handler': 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300',
  'Event Organizer': 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  'Member': 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
};

const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
];

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function About() {
  const [imgErrors, setImgErrors] = useState({});

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-14">

        {/* ── Hero ── */}
        <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
            <img src={logo} alt="i-CEC Logo" className="w-20 h-auto mx-auto mb-6 drop-shadow-md" />

            {/* "First" highlight badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              First Computer Engineering Club at FWU
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
              Innovative Computer Engineering Club
            </h1>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">i-CEC</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
              Far Western University · School of Engineering · Mahendranagar, Kanchanpur
            </p>

            {/* Divider */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-5 rounded-full" />

            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Founded in 2020, i-CEC is the <span className="font-semibold text-gray-700 dark:text-gray-300">first and only computer engineering club</span> at FWU School of Engineering — a student-led initiative dedicated to making quality academic resources freely accessible to every engineering student, from first semester through final year.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <HiLightningBolt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Our Mission</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                To provide free, high-quality academic resources — notes, past papers, and mock tests — to every engineering student at FWU, removing barriers to learning and supporting academic excellence.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <HiGlobeAlt className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Our Vision</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the go-to digital platform for all FWU engineering students — a collaborative hub where seniors help juniors, knowledge flows freely, and every batch leaves a resource legacy for the next.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide mb-3">
                Our Journey
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How We Got Here</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="relative flex gap-6 pl-14">
                    {/* Circle on timeline */}
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-400 dark:border-blue-500 flex items-center justify-center shrink-0 z-10">
                      <span className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400" />
                    </div>

                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
                      <time className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1 block">
                        {item.year}
                      </time>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide mb-3">
              The People Behind It
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Executive Committee 2080/81</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">The dedicated team that built and runs SOE Notes.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TEAM.map((member, i) => {
              const showAvatar = member.image && !imgErrors[member.name];
              return (
                <div
                  key={member.name}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
                >
                  {/* Avatar */}
                  {showAvatar ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={() => setImgErrors(e => ({ ...e, [member.name]: true }))}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 mb-3 group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg ring-2 ring-white dark:ring-gray-700 mb-3 shrink-0`}>
                      {initials(member.name)}
                    </div>
                  )}

                  {/* Name */}
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1">
                    {member.name}
                  </p>

                  {/* Role badge */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[member.role] ?? ROLE_COLORS['Member']}`}>
                    {member.role}
                  </span>

                  {/* Link */}
                  {member.url && (
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      <HiExternalLink className="w-3.5 h-3.5" /> Profile
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-14">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-4">
              <HiMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Want to Contribute?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Have notes, past papers, or ideas to improve SOE Notes? We welcome contributions from every batch of FWU engineering students.
            </p>
            <a
              href="mailto:pradip.bhatt@securitypalhq.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              <HiMail className="w-4 h-4" /> Get in Touch
            </a>
          </div>
        </section>

      </div>
      <Chat />
      <Footer />
    </>
  );
}
