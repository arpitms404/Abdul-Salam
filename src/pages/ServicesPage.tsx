import React from 'react';
import {
  SERVICES_DATA,
  FAQ_DATA
} from '../data/companyData';
import { INDIVIDUAL_SERVICES_DATA } from '../data/servicePagesData';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import {
  Check,
  Clock,
  HelpCircle,
  HardHat,
  ArrowRight,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. PAGE HEADER */}
      <section className="bg-[#0B1B3D] text-white py-14 sm:py-20 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>End-to-End Construction Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            Our Construction Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed"
          >
            From preliminary architectural 2D/3D floor layouts and deep foundation RCC civil framework to turnkey interior finishes and renovations across Bhadohi, Harirampur, and Aurai Road.
          </motion.p>
        </div>
      </section>

      {/* 1.5 TECHNICAL BREAKDOWN DIRECTORY (10 QUOTATION WORKS + 2 COMMERCIAL ENTITIES) */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E58A1F]">
              <Layers className="w-3.5 h-3.5" />
              <span>Quotation-Verified Technical Workscopes</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D]">
              Individual Construction Works & Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Explore itemized engineering scopes, mix ratios, approved brands, package comparisons, and exclusions for each specific civil and finishing work derived directly from our official construction quotations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(INDIVIDUAL_SERVICES_DATA).map((serv) => (
              <motion.div
                key={serv.slug}
                whileHover={{ y: -3 }}
                onClick={() => onNavigate(`/services/${serv.slug}`)}
                className="p-4 bg-[#F8FAFC] border border-gray-200 rounded-sm hover:border-[#E58A1F] hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-white border border-gray-200 text-gray-600 rounded-xs">
                      {serv.shortTitle}
                    </span>
                    <span className="text-[10px] font-bold text-[#E58A1F]">
                      Detailed Specs
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors leading-snug">
                    {serv.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {serv.definition}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#0B1B3D] font-bold">
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E58A1F] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SERVICES DETAILED SECTIONS */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-16">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={service.id}
              id={service.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`bg-white border border-gray-200 p-6 sm:p-10 scroll-mt-24 transition-shadow duration-300 rounded-sm shadow-sm hover:shadow-xl hover:shadow-[#0B1B3D]/5 ${
                index === 0 ? 'ring-1 ring-[#E58A1F]/30' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left/Right Media Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-900 border border-gray-200 rounded-sm group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1B3D] text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-wider rounded-sm">
                      Service 0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 space-y-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                      Comprehensive Scope
                    </span>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D]">
                      {service.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1B3D]">
                      Deliverables & Scope of Work:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {service.keyFeatures.map((feat, fIdx) => (
                      <motion.div
                        key={fIdx}
                        whileHover={{ y: -2 }}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-sm hover:border-[#E58A1F] transition-colors"
                      >
                        <p className="font-heading font-extrabold text-xs text-[#0B1B3D]">
                          {feat.title}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                          {feat.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4 text-[#E58A1F]" />
                      <span>Typical Timeline: <strong>{service.timeline}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        showArrow
                        onClick={onOpenQuoteModal}
                      >
                        Get Quote For This Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. RELEVANT FAQ SNIPPET */}
      <section className="bg-white py-16 sm:py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Questions Regarding Our Services"
            highlightWords={['Services']}
            description="Clear answers on our construction methodology, materials, and consultation steps."
          />

          <div className="space-y-4">
            {FAQ_DATA.slice(0, 5).map((faq, fIdx) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: fIdx * 0.08 }}
                whileHover={{ y: -2 }}
                className="p-5 bg-[#F8FAFC] border border-gray-200 rounded-sm hover:border-[#E58A1F] transition-all"
              >
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#0B1B3D] flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('/faq')}
            >
              READ FULL FAQ DIRECTORY
            </Button>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="bg-[#0B1B3D] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Have a Specific Project or Blueprint in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our site engineers are available for direct consultations in Bhadohi to evaluate your drawings and plot dimensions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenQuoteModal}
            >
              CALCULATE DETAILED ESTIMATE
            </Button>
            <Button
              variant="white"
              size="md"
              onClick={onOpenConsultationModal}
            >
              REQUEST SITE INSPECTION
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
