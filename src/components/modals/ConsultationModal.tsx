import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [projectType, setProjectType] = useState('New Home Construction');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-[#0B1B3D] text-white p-5 flex items-center justify-between border-b border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#E58A1F]/20 border border-[#E58A1F]/40 text-[#E58A1F]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg tracking-tight">
                  Schedule a Site Consultation
                </h3>
                <p className="text-xs text-gray-400">
                  Expert On-Site Evaluation & Soil / Layout Assessment
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-black text-xl text-[#0B1B3D]">
                Consultation Request Confirmed!
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Thank you, <span className="font-bold text-[#0B1B3D]">{name}</span>. An engineer from our Bhadohi office will call your number (<span className="font-semibold">{phone}</span>) to verify the site address and schedule the inspection.
              </p>
              <div className="p-3 bg-gray-50 border border-gray-200 text-left text-xs space-y-1">
                <p><span className="font-bold text-gray-700">Office Location:</span> Opposite H.P. Petrol Pump, Aurai Road, Bhadohi</p>
                <p><span className="font-bold text-gray-700">Service Area:</span> Harirampur, Gyanpur, Gopiganj, Suriyawan</p>
              </div>
              <Button variant="primary" size="md" onClick={handleReset} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 text-xs font-medium focus:border-[#E58A1F] focus:outline-none bg-white"
                  >
                    <option value="New Home Construction">New Home Construction</option>
                    <option value="Residential Villa / Duplex">Residential Villa / Duplex</option>
                    <option value="Renovation & Floor Addition">Renovation & Floor Addition</option>
                    <option value="Commercial Complex / Shop">Commercial Complex / Shop</option>
                    <option value="RCC Structural Framework">RCC Structural Framework</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Site Address / Landmark in Bhadohi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Harirampur Mandir, Aurai Road, Bhadohi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                <span>Our structural civil engineer will visit the site with soil guidance and boundary layout verification.</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full justify-center"
              >
                Confirm Site Visit Request
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
