import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      title: 'Class-100 Modular Operation Theater',
      category: 'Surgical Suite'
    },
    {
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      title: 'Schwind Amaris Femto LASIK Suite',
      category: 'Refractive Surgery'
    },
    {
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      title: 'Zeiss Lumera 700 Surgical Microscope',
      category: 'Diagnostic Lab'
    },
    {
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      title: 'Super-Specialty Consultation Suite',
      category: 'OPD Clinics'
    },
    {
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
      title: 'Digital Refraction & Biometry Station',
      category: 'Vision Diagnostics'
    },
    {
      url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      title: 'Premium Optical & Spectacle Lounge',
      category: 'Optical Store'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Hospital Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-heading">
            State-of-the-Art Ophthalmic Infrastructure
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 h-64"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                  {img.category}
                </span>
                <h4 className="text-base font-bold font-heading">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
