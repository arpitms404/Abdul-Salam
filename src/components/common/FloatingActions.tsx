import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '../../data/companyData';

interface FloatingActionsProps {
  onOpenConsultationModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenConsultationModal
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleWhatsAppClick = () => {
    if (COMPANY_DATA.contact.whatsapp) {
      const message = encodeURIComponent(
        `Hello Abdul Salam Construction Company, I would like to discuss a construction project in Bhadohi.`
      );
      window.open(
        `https://wa.me/${COMPANY_DATA.contact.whatsapp}?text=${message}`,
        '_blank'
      );
    } else {
      // Fallback to consultation dialog
      onOpenConsultationModal();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Action */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={handleWhatsAppClick}
        className="pointer-events-auto flex items-center gap-2 bg-[#0B1B3D] hover:bg-[#E58A1F] text-white p-3 sm:px-4 sm:py-3 border border-[#1E3A5F] shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#E58A1F]"
        aria-label="Contact or Request Site Consultation"
      >
        <MessageCircle className="w-5 h-5 text-[#E58A1F] group-hover:text-white" />
        <span className="hidden sm:inline font-heading font-bold text-xs uppercase tracking-wider pr-1">
          Quick Enquiry
        </span>
      </motion.button>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="pointer-events-auto p-3 bg-[#0B1B3D] hover:bg-[#E58A1F] text-white border border-[#1E3A5F] shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E58A1F]"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
