import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Doctors from '../components/Doctors';
import WhyChooseUs from '../components/WhyChooseUs';
import BookingWizard from '../components/BookingWizard';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function HomePage() {
  const navigate = useNavigate();

  const handleBookClick = (docId = null) => {
    if (docId) {
      navigate(`/book-appointment?doctor_id=${docId}`);
    } else {
      const elem = document.getElementById('booking-wizard');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/book-appointment');
      }
    }
  };

  return (
    <div>
      <Hero onBookClick={() => handleBookClick()} />
      <About />
      <Services onBookClick={() => handleBookClick()} />
      <Doctors onSelectDoctorForBooking={(docId) => handleBookClick(docId)} />
      <WhyChooseUs onBookClick={() => handleBookClick()} />
      <BookingWizard />
      <Testimonials />
      <Gallery />
      <Blog />
      <Contact />
    </div>
  );
}
