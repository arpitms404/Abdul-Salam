import React from 'react';
import {
  ShieldCheck,
  Award,
  HardHat,
  CheckCircle2,
  Users,
  Compass,
  Building2,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  FileCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DATA, WHY_CHOOSE_US, PROCESS_STEPS } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Logo } from '../components/common/Logo';

interface AboutPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1B3D] text-white py-16 sm:py-20 border-b border-[#2A2A2A] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
            >
              <span>About Abdul Salam Construction Company</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Quality Construction. Built Around Your Vision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans"
            >
              Headquartered at Harirampur, Aurai Road, Bhadohi, we are dedicated to transforming architectural blueprints into structurally resilient homes, commercial centers, and community landmarks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="pt-2"
            >
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={onOpenConsultationModal}
              >
                REQUEST OFFICE CONSULTATION
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY PROFILE & ETHOS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
              Our Foundation
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1B3D] leading-tight">
              Engineering Precision Meets Transparent Construction in Bhadohi
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Founded on the principles of engineering honesty and craftsmanship, <strong>Abdul Salam Construction Company</strong> has established itself as the go-to builder for families and businesses in Bhadohi.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We manage all dimensions of the construction lifecycle: structural soil load testing, architectural CAD drafting, sanctioning approvals, cement hydration monitoring, shuttering safety, and turnkey interior joinery.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <motion.div whileHover={{ y: -2 }} className="p-4 bg-white border border-gray-200 rounded-sm">
                <span className="text-2xl font-black text-[#0B1B3D] block font-heading">
                  100%
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Material Verification & BOQ Adherence
                </span>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="p-4 bg-white border border-gray-200 rounded-sm">
                <span className="text-2xl font-black text-[#E58A1F] block font-heading">
                  Milestone
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  Stage-Wise Escrow & Site Sign-Off
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-[#0B1B3D] text-white p-8 sm:p-10 border border-[#2A2A2A] relative overflow-hidden rounded-sm shadow-xl"
          >
            <div className="relative z-10 space-y-6">
              <Logo variant="light" size="lg" />

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                <p>
                  <strong>Office Location:</strong> Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi, Uttar Pradesh – 221401
                </p>
                <p>
                  <strong>Core Specializations:</strong> RCC Civil Structure, Residential Duplex Homes, Commercial Complexes, Turnkey Interior Joinery.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={onOpenQuoteModal}
                >
                  START YOUR PROJECT WITH US
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES & VALUES */}
      <section className="bg-white py-16 sm:py-20 border-y border-gray-200 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="Our Guiding Principles"
            title="Core Values That Drive Every Foundation We Cast"
            highlightWords={['Core Values', 'Foundation']}
            description="We believe in complete transparency, rigorous safety protocols, and enduring structural stability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-50 border border-gray-200 hover:border-[#E58A1F] transition-all rounded-sm shadow-sm group"
              >
                <div className="w-10 h-10 bg-white group-hover:bg-[#E58A1F] text-[#0B1B3D] group-hover:text-white flex items-center justify-center border border-gray-200 group-hover:border-[#E58A1F] mb-4 transition-colors rounded-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-base text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OFFICE & HEADQUARTERS DIRECTORY */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto bg-white border border-gray-200 p-8 sm:p-10 shadow-sm rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                Direct Consultation
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D]">
                Visit Our Office at Harirampur, Aurai Road
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Meet our senior project managers and structural civil engineers to inspect 3D floor models, material samples (cement grades, TMT steel, tile catalogs), and draft project timelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0B1B3D]">Address:</strong>
                    <span className="text-gray-600">Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi – 221401</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0B1B3D]">Working Hours:</strong>
                    <span className="text-gray-600">Monday – Sunday: 8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={onOpenConsultationModal}
              >
                SCHEDULE SITE / OFFICE VISIT
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/contact')}
              >
                CONTACT & INQUIRY CHANNELS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
