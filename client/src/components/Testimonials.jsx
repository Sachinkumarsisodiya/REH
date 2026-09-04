import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Ritu Rajvanshi',
      procedure: 'Contoura Vision Blade-Free LASIK',
      stars: 5,
      comment: 'I had -6.5 D power in both eyes since high school. Dr. Rekha Sisodiya performed Contoura LASIK at REH. The next morning I woke up with 6/6 crystal clear vision! No pain at all. Truly life-changing experience!',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Vikramaditya Rao',
      procedure: 'Micro-Incision Cataract with Multifocal IOL',
      stars: 5,
      comment: 'My father was hesitant about cataract surgery. But Dr. Ananya Verma explained everything with immense patience. The stitchless surgery took barely 12 minutes! He can now read newspapers without glasses.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      name: 'Sneha Kulkarni',
      procedure: 'Pediatric Squint Correction',
      stars: 5,
      comment: 'Dr. Rajesh Kumar handled my 6-year-old son’s eye examination so lovingly. The squint correction surgery was completely successful and gave him immense confidence in school. Thank you REH team!',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const next = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const curr = reviews[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Patient Stories &amp; Vision Recovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-heading">
            Over 50,000 Lives Transformed with Clear Vision
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
            
            <Quote className="w-20 h-20 text-teal-500/10 absolute top-4 right-4 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(curr.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 italic leading-relaxed">
              "{curr.comment}"
            </p>

            {/* Author */}
            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src={curr.photo}
                alt={curr.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">{curr.name}</h4>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{curr.procedure}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-teal-600 hover:text-white border border-slate-200 dark:border-slate-700 shadow transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-teal-600 hover:text-white border border-slate-200 dark:border-slate-700 shadow transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
