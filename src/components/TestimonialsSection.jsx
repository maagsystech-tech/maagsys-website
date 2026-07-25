import React from 'react';
import { useCollection } from '../hooks/useFirestore';
import { FiStar, FiUser } from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';

export const fallbackTestimonials = [
  {
    id: 'f1',
    name: 'Sathish Kumar',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'I had an excellent experience with the MAAGSYS team. They were in constant touch with me throughout the process, ensuring everything went smoothly and as expected. I am completely satisfied with the service provided!',
    rating: 5,
  },
  {
    id: 'f2',
    name: 'Kirubavathi',
    role: 'Healthcare',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    quote: 'My experience with MAAGSYS, guided by the consultant team, is that I am an experienced AR caller. Recently, I got an offer from Ventra Healthcare. The HR department is friendly and you can talk freely without hesitation.',
    rating: 5,
  },
  {
    id: 'f3',
    name: 'Kiran Sunny',
    role: 'Finance Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    quote: 'I must thank MAAGSYS for helping me secure the job in one of the top financial firms. They guided me throughout the selection and interview process and were very genuine and supportive.',
    rating: 5,
  },
  {
    id: 'f4',
    name: 'Rajesh Gajendran',
    role: 'Cyber Security',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'Excellent in coordinating with candidates and very kind as well. The technical specialists were very supportive during the interview process and all the way till onboarding.',
    rating: 5,
  },
  {
    id: 'f5',
    name: 'Dileep Dill',
    role: 'Graphic Designer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    quote: 'Thank you for helping me get a job at a top company. I want to thank the MAAGSYS team for supporting me until I joined the company with complete satisfaction.',
    rating: 5,
  },
  {
    id: 'f6',
    name: 'Ankur Devadhayavu',
    role: 'Cloud Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    quote: 'Their systematic way of helping me to get placed is awesome. Especially, I want to thank the team for their continuous support in my career journey! Thank you!',
    rating: 5,
  },
];

// OLD TestimonialCard implementation (commented out as requested)
// function TestimonialCard({ item }) {
//   const [imgError, setImgError] = React.useState(false);
// 
//   return (
//     <div className="w-[270px] sm:w-[295px] h-[340px] sm:h-[355px] shrink-0 bg-white rounded-sm border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-brand-400 hover:shadow-xl transition-all duration-300 select-none shadow-sm">
//       <div className="space-y-3.5 flex-1 flex flex-col min-h-0">
//         {/* Header: Avatar + Name + Role */}
//         <div className="flex items-center gap-3 shrink-0">
//           {item.avatar && !imgError ? (
//             <img
//               src={item.avatar}
//               alt={item.name}
//               onError={() => setImgError(true)}
//               className="w-11 h-11 rounded-full object-cover border border-gray-100 shrink-0 shadow-sm"
//             />
//           ) : (
//             <div className="w-11 h-11 rounded-full bg-brand-50 text-brand-600 font-medium text-sm flex items-center justify-center shrink-0 border border-brand-100 shadow-sm">
//               {(item.name || 'C').charAt(0).toUpperCase()}
//             </div>
//           )}
//           <div className="min-w-0">
//             <h4 className="font-medium text-gray-900 text-[11px] sm:text-[13px] leading-snug truncate">{item.name}</h4>
//             <p className="text-[11px] sm:text-[13px] text-gray-500 font-normal truncate">{item.role || 'Client'}</p>
//           </div>
//         </div>
// 
//         {/* Quote text */}
//         <p className="text-gray-600 text-[11px] sm:text-[13px] leading-relaxed font-normal overflow-y-auto flex-1 scrollbar-none pr-1">
//           {item.quote}
//         </p>
//       </div>
// 
//       {/* 5 Stars Rating at bottom right */}
//       <div className="pt-3 shrink-0 flex items-center justify-end border-t border-gray-50">
//         <div className="flex items-center gap-1 text-amber-400">
//           {Array.from({ length: 5 }).map((_, idx) => (
//             <FiStar
//               key={idx}
//               className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${idx < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// NEW TestimonialCard implementation (rating section is directly below quote at the right side)
function TestimonialCard({ item }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="w-[270px] sm:w-[295px] h-[340px] sm:h-[355px] shrink-0 bg-white rounded-sm border border-gray-200/90 p-5 sm:p-6 flex flex-col hover:border-brand-400 hover:shadow-xl transition-all duration-300 select-none shadow-sm">
      <div className="space-y-3.5 flex-1 flex flex-col min-h-0">
        {/* Header: Avatar + Name + Role */}
        <div className="flex items-center gap-3 shrink-0">
          {item.avatar && !imgError ? (
            <img
              src={item.avatar}
              alt={item.name}
              onError={() => setImgError(true)}
              className="w-11 h-11 rounded-full object-cover border border-gray-100 shrink-0 shadow-sm"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-brand-50 text-brand-600 font-medium text-sm flex items-center justify-center shrink-0 border border-brand-100 shadow-sm">
              {(item.name || 'C').charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-medium text-gray-900 text-[11px] sm:text-[13px] leading-snug truncate">{item.name}</h4>
            <p className="text-[11px] sm:text-[13px] text-gray-500 font-normal truncate">{item.role || 'Client'}</p>
          </div>
        </div>

        {/* Grouped Quote and Rating (no vertical stretching between them) */}
        <div className="flex-1 min-h-0 flex flex-col justify-start">
          {/* Quote text */}
          <p className="text-gray-600 text-[11px] sm:text-[13px] leading-relaxed font-normal overflow-y-auto scrollbar-none pr-1 mb-2">
            {item.quote}
          </p>

          {/* Stars rating section placed just below the quote at the right side */}
          <div className="shrink-0 flex items-center justify-end mt-1">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FiStar
                  key={idx}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${idx < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: dbItems } = useCollection('testimonials');

  // Filter published items
  const publishedItems = (dbItems || []).filter(item => item.published !== false && item.name && item.quote);

  // Use DB items if present, otherwise fallback array
  const displayItems = publishedItems.length > 0 ? publishedItems : fallbackTestimonials;

  // Duplicate list to achieve continuous infinite marquee loop
  const marqueeItems = [...displayItems, ...displayItems, ...displayItems];

  return (
    <section className="py-14 sm:py-20 bg-surface-50 border-t border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <AnimatedSection>
          <h2 className="section-title">What Our Clients & Candidates Say</h2>
          <p className="section-subtitle mt-3 mx-auto max-w-2xl">
            Real stories and reviews from professionals and companies who have transformed their technology and careers with MAAGSYS.
          </p>
        </AnimatedSection>
      </div>

      {/* Marquee Infinite Loop Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Left/Right Fading Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-surface-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-surface-50 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-2 sm:gap-4 animate-marquee group-hover:[animation-play-state:paused] w-max py-4">
          {marqueeItems.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
