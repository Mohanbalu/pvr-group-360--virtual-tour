import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  Download, 
  Calendar, 
  ArrowRight,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  GraduationCap,
  Building2
} from 'lucide-react';
import { cn } from './utils';
import { 
  COMPANY_NAME, 
  TAGLINE, 
  STATS, 
  INDOOR_AMENITIES, 
  OUTDOOR_AMENITIES, 
  NEARBY_LOCATIONS, 
  FLOOR_PLANS, 
  TESTIMONIALS, 
  GALLERY_IMAGES 
} from './constants';

// --- Components ---

const Counter = ({ value, suffix = "" }: { value: number | string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {typeof value === 'number' ? count : value}{suffix}
    </span>
  );
};

const BookVisitModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-pvr-blue/80 backdrop-blur-md" onClick={onClose}></div>
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-pvr-blue/40 hover:text-pvr-blue transition-colors"
            >
              <X size={32} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="bg-pvr-blue p-10 text-white hidden md:block">
                <h3 className="text-3xl font-bold mb-6">Book a Private Site Visit</h3>
                <p className="text-white/60 mb-10">Experience the luxury firsthand. Our relationship manager will guide you through the project.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-pvr-gold">
                      <Calendar size={20} />
                    </div>
                    <span className="font-medium">Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-pvr-gold">
                      <ArrowRight size={20} />
                    </div>
                    <span className="font-medium">Guided Tour</span>
                  </div>
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-pvr-blue mb-8 md:hidden">Book Site Visit</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-pvr-blue/5 border border-pvr-blue/10 rounded-xl px-6 py-4 focus:outline-none focus:border-pvr-gold transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full bg-pvr-blue/5 border border-pvr-blue/10 rounded-xl px-6 py-4 focus:outline-none focus:border-pvr-gold transition-all"
                  />
                  <input 
                    type="date" 
                    className="w-full bg-pvr-blue/5 border border-pvr-blue/10 rounded-xl px-6 py-4 focus:outline-none focus:border-pvr-gold transition-all"
                  />
                  <button className="w-full bg-pvr-gold text-pvr-blue py-4 rounded-xl font-bold text-lg mt-4 shadow-lg shadow-pvr-gold/20">
                    Confirm Visit
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Floor Plans', href: '#floor-plans' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-pvr-blue/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pvr-gold flex items-center justify-center rounded-lg font-bold text-pvr-blue text-xl">P</div>
          <span className="font-display font-bold text-2xl tracking-tighter text-white">
            PVR <span className="text-pvr-gold">GROUP</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-pvr-gold transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenModal}
            className="bg-pvr-gold hover:bg-pvr-gold-light text-pvr-blue px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
          >
            BOOK VISIT
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-pvr-blue border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-white/80 hover:text-pvr-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="bg-pvr-gold text-pvr-blue px-6 py-3 rounded-xl font-bold mt-4"
              >
                BOOK VISIT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Apartment" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-pvr-blue/60 backdrop-brightness-75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-pvr-gold/20 text-pvr-gold border border-pvr-gold/30 px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-6">
            Premium Gated Community
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Premium Gated <br />
            <span className="text-gradient-gold">Community Living</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
            Luxury 2, 3 & 4 BHK Homes in a Future Education Zone. Experience the pinnacle of modern architecture and sustainable living.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#about" className="w-full sm:w-auto bg-pvr-gold hover:bg-pvr-gold-light text-pvr-blue px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
              View Project <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onOpenModal}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={20} /> Book Site Visit
            </button>
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto text-white hover:text-pvr-gold font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={20} /> Download Brochure
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-white relative z-10 -mt-20 rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-pvr-blue/5 border border-pvr-blue/5 flex flex-col items-center text-center group hover:border-pvr-gold/30 transition-all"
            >
              <div className="w-16 h-16 bg-pvr-blue/5 rounded-2xl flex items-center justify-center text-pvr-gold mb-6 group-hover:bg-pvr-gold group-hover:text-white transition-all">
                <stat.icon size={32} />
              </div>
              <h3 className="text-4xl font-bold text-pvr-blue mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-pvr-blue/60 font-medium uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="PVR Group Construction" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pvr-gold/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-pvr-blue/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl border border-pvr-blue/5 flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 bg-pvr-gold rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-pvr-blue font-bold">Trusted Developer</p>
                <p className="text-pvr-blue/60 text-sm">10+ Years of Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">About PVR Group</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-pvr-blue mb-8 leading-tight">
              Building Tomorrow's <br />
              <span className="text-pvr-gold">Legacy Today</span>
            </h2>
            <p className="text-lg text-pvr-blue/70 mb-8 leading-relaxed">
              PVR Group is a trusted real estate developer committed to building premium residential communities with modern design, quality construction, and sustainable living environments.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                "Trusted Developer",
                "Modern Architecture",
                "Prime Locations",
                "Quality Construction"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pvr-gold/10 rounded-full flex items-center justify-center text-pvr-gold">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-semibold text-pvr-blue">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-pvr-blue text-white px-8 py-4 rounded-full font-bold hover:bg-pvr-accent transition-all">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-24 bg-pvr-blue text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pvr-gold rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pvr-gold rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">World-Class Lifestyle</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Premium Amenities</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experience a curated selection of 15+ premium indoor and outdoor amenities designed for your well-being and leisure.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
            <span className="w-12 h-0.5 bg-pvr-gold"></span>
            Indoor Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDOOR_AMENITIES.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-pvr-gold/30 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-pvr-gold/10 rounded-2xl flex items-center justify-center text-pvr-gold mx-auto mb-6 group-hover:bg-pvr-gold group-hover:text-pvr-blue transition-all">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold text-lg">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
            <span className="w-12 h-0.5 bg-pvr-gold"></span>
            Outdoor Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {OUTDOOR_AMENITIES.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-pvr-gold/30 transition-all text-center group"
              >
                <div className="w-10 h-10 bg-pvr-gold/10 rounded-xl flex items-center justify-center text-pvr-gold mx-auto mb-4 group-hover:bg-pvr-gold group-hover:text-pvr-blue transition-all">
                  <item.icon size={20} />
                </div>
                <h4 className="font-bold text-sm">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">Visual Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-pvr-blue">Project Gallery</h2>
          </div>
          <button className="text-pvr-blue font-bold flex items-center gap-2 hover:text-pvr-gold transition-colors">
            View All Images <ArrowRight size={20} />
          </button>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl"
              onClick={() => setSelectedImage(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-pvr-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <p className="text-pvr-gold font-bold tracking-widest uppercase text-xs mb-2">{img.title}</p>
                <h4 className="text-white font-bold text-xl">Premium Living</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-pvr-blue/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-pvr-gold transition-colors">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const EducationZoneSection = () => {
  return (
    <section className="py-24 bg-gradient-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" 
          alt="Education Campus" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-pvr-gold/20 rounded-3xl flex items-center justify-center text-pvr-gold mb-8">
              <GraduationCap size={40} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Future <span className="text-pvr-gold">Education Zone</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              This project is located in a rapidly developing education zone with upcoming universities and institutions, making it ideal for families and long-term investment.
            </p>
            
            <div className="space-y-6">
              {[
                "Proximity to upcoming Top Universities",
                "Ideal for families with students",
                "High rental yield potential",
                "Rapidly developing infrastructure"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-pvr-gold rounded-full flex items-center justify-center text-pvr-blue">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] relative"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
              <Clock className="text-pvr-gold" />
              Location Advantage
            </h3>
            <div className="space-y-8">
              {NEARBY_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-pvr-gold group-hover:bg-pvr-gold group-hover:text-pvr-blue transition-all">
                      <loc.icon size={24} />
                    </div>
                    <span className="font-bold text-lg">{loc.name}</span>
                  </div>
                  <span className="text-pvr-gold font-bold">{loc.distance}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FloorPlansSection = () => {
  return (
    <section id="floor-plans" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">Spacious Living</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pvr-blue mb-6">Floor Plans</h2>
          <p className="text-pvr-blue/60 max-w-2xl mx-auto">
            Choose from our meticulously designed 2, 3, and 4 BHK apartments, crafted to maximize space, light, and ventilation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {FLOOR_PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pvr-blue/5 border border-pvr-blue/5 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.type} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-pvr-blue text-white px-4 py-2 rounded-full font-bold text-sm">
                  {plan.type}
                </div>
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-bold text-pvr-blue mb-2">{plan.type} Apartment</h4>
                <p className="text-pvr-blue/60 mb-8 flex items-center gap-2">
                  <Building2 size={18} className="text-pvr-gold" />
                  Area: {plan.area}
                </p>
                <button className="w-full py-4 rounded-2xl border-2 border-pvr-blue text-pvr-blue font-bold hover:bg-pvr-blue hover:text-white transition-all">
                  View Full Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-pvr-blue/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">Happy Families</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pvr-blue mb-6">Testimonials</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-pvr-blue/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={cn(i < t.rating ? "text-pvr-gold fill-pvr-gold" : "text-gray-300")} />
                ))}
              </div>
              <p className="text-lg text-pvr-blue/70 italic mb-8 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pvr-blue/10 rounded-full flex items-center justify-center font-bold text-pvr-blue">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-pvr-blue">{t.name}</h4>
                  <p className="text-sm text-pvr-blue/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-pvr-blue rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 relative z-10">
            <div className="p-10 md:p-20 text-white">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">Get In Touch</h2>
              <p className="text-white/60 mb-12 text-lg">
                Have questions about our project? Our team is here to help you find your dream home.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-pvr-gold">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-xl font-bold">8977733623 / 8977733663</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-pvr-gold">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-xl font-bold">PVR Group, Future Education Zone, Hyderabad</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all">
                  <MessageCircle size={24} /> WhatsApp Inquiry
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 md:p-20 border-l border-white/10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pvr-gold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pvr-gold transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pvr-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="I'm interested in the 3 BHK apartments..." 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-pvr-gold transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-pvr-gold hover:bg-pvr-gold-light text-pvr-blue py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-pvr-gold/20">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-pvr-blue text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-pvr-gold flex items-center justify-center rounded-lg font-bold text-pvr-blue text-xl">P</div>
              <span className="font-display font-bold text-2xl tracking-tighter text-white">
                PVR <span className="text-pvr-gold">GROUP</span>
              </span>
            </a>
            <p className="text-white/50 leading-relaxed">
              PVR Group is a trusted real estate developer committed to building premium residential communities with modern design and quality construction.
            </p>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-pvr-gold hover:text-pvr-blue transition-all cursor-pointer">
                  <Star size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 text-pvr-gold uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Amenities', 'Gallery', 'Floor Plans', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/50 hover:text-pvr-gold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 text-pvr-gold uppercase tracking-widest">Services</h4>
            <ul className="space-y-4">
              {['Apartments', 'Villas', 'Individual Floors', 'Gated Communities'].map((item) => (
                <li key={item} className="text-white/50">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 text-pvr-gold uppercase tracking-widest">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-pvr-gold shrink-0" />
                <span className="text-white/50">Future Education Zone, Hyderabad, Telangana</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-pvr-gold shrink-0" />
                <span className="text-white/50">8977733623 / 8977733663</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm">
          <p>© 2026 PVR Group. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/8977733623" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce-slow"
    >
      <MessageCircle size={32} />
    </a>
  );
};

// --- Main App ---

declare global {
  interface Window {
    pannellum: any;
  }
}

const VirtualTourSection = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.pannellum && viewerRef.current) {
      window.pannellum.viewer(viewerRef.current, {
        type: "equirectangular",
        // Using a high-quality real estate placeholder image
        // The user can replace this with their "room360.jpg" or any URL
        panorama: "https://pannellum.org/images/alma.jpg", 
        autoLoad: true,
        showControls: true,
        compass: true,
        northOffset: 247,
      });
    }
  }, []);

  return (
    <section id="tour" className="py-24 bg-white tour360">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-pvr-gold font-bold tracking-widest uppercase text-sm mb-4 block">Immersive Experience</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-pvr-blue">360° Virtual Tour</h2>
          <div className="w-24 h-1 bg-pvr-gold mx-auto mt-6"></div>
        </div>

        <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-pvr-blue/5 bg-pvr-accent">
          <div 
            ref={viewerRef} 
            id="panorama" 
            className="w-full h-full"
            style={{ width: '100%', height: '600px' }}
          ></div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-pvr-blue/60 max-w-2xl mx-auto">
            Experience the luxury of PVR Group from the comfort of your home. Use your mouse or touch to navigate through the premium gated community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <StatsSection />
        <AboutSection />
        <AmenitiesSection />
        <VirtualTourSection />
        <GallerySection />
        <EducationZoneSection />
        <FloorPlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BookVisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
