import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldAlert, Sparkles, UserCheck, Stethoscope, ChevronRight } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: '20-20-20 Rule for Digital Eye Strain & Screen Fatigue',
      author: 'Dr. Rekha Sisodiya',
      role: 'Founder & Chief Surgeon (AIIMS)',
      category: 'Preventative Eye Care',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Staring at digital screens causes dry eye syndrome and ocular muscle fatigue. Discover Dr. Rekha Sisodiya’s recommended clinical exercises to maintain healthy tear film stability.'
    },
    {
      id: 2,
      title: 'Top 5 Clinical Facts About Blade-Free Femto LASIK & Contoura',
      author: 'Dr. Kush',
      role: 'Consultant Refractive Surgeon',
      category: 'Refractive Surgery',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Is laser surgery painful? Can spectacle power recur? Discover why customized 100% blade-free laser mapping delivers superior 6/6 HD vision clarity in 24 hours.'
    },
    {
      id: 3,
      title: 'Cataract Progression: When is the Right Time for Micro-Surgery?',
      author: 'Dr. Rekha Sisodiya',
      role: 'Founder & Chief Surgeon (AIIMS)',
      category: 'Cataract Care',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Cloudy vision, halos around headlights, and frequent power shifts indicate lens opacity. Learn why micro-incision phaco procedures with multifocal IOLs restore glass-free vision.'
    }
  ];

  return (
    <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-200">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical Knowledge &amp; Vision Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Doctor-Approved Eye Health Guides
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Curated clinical articles and eye care guidelines authored by Hospital Founder <strong>Dr. Rekha Sisodiya</strong> and her senior surgical team.
          </p>
        </div>

        {/* Featured Founder Banner */}
        <div className="mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <img
              src="/dr-rekha-sisodiya.jpg"
              alt="Dr. Rekha Sisodiya - Medical Director"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-white shadow-lg bg-slate-100"
            />
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-teal-600 text-white text-[9px] font-black uppercase shadow">
              Founder
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Founder &amp; Chief Surgeon's Clinical Advisory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              "Preventative eye checkups can save up to 80% of preventable vision loss."
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              — <strong>Dr. Rekha Sisodiya</strong> (MS AIIMS, Refractive Fellow London &bull; Founder, Rekha Eye Hospital)
            </p>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="text-teal-700 font-bold">{art.author}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-heading leading-snug group-hover:text-teal-700 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/eye-health"
                  className="inline-flex items-center space-x-1.5 text-xs font-black text-teal-700 hover:text-teal-800 transition-colors group/link"
                >
                  <span>Explore Interactive Eye Health Hub</span>
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
