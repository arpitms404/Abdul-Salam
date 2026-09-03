import React from 'react';
import { INDIVIDUAL_SERVICES_DATA } from '../data/servicePagesData';
import { Button } from '../components/common/Button';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  HardHat,
  Layers,
  ShieldAlert,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface IndividualServicePageProps {
  slug: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const IndividualServicePage: React.FC<IndividualServicePageProps> = ({
  slug,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const service =
    INDIVIDUAL_SERVICES_DATA[slug] ||
    INDIVIDUAL_SERVICES_DATA['residential-turnkey-construction'];

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. TOP BREADCRUMB BAR */}
      <div className="bg-[#0B1B3D] text-white border-b border-[#2A2A2A] py-3 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </motion.button>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">Category:</span>
            <span className="text-[#E58A1F] font-semibold">{service.category}</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="bg-[#0B1B3D] text-white py-12 sm:py-16 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-8 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/15 border border-[#E58A1F]/40 text-[#E58A1F] text-xs font-bold uppercase tracking-wider rounded-sm">
                <HardHat className="w-3.5 h-3.5" />
                <span>{service.heroBadge}</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                {service.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
                {service.definition}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={onOpenQuoteModal}
                >
                  CALCULATE ESTIMATE
                </Button>
                <Button
                  variant="white"
                  size="sm"
                  onClick={onOpenConsultationModal}
                >
                  REQUEST SITE CONSULTATION
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('/packages')}
                >
                  VIEW TURNKEY PACKAGES
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-4"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-gray-700 bg-gray-900 shadow-xl">
                <img
                  src={service.image}
                  alt={`${service.title} execution by M/S Abdul Salam Constructions Company`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs text-gray-300 bg-[#0B1B3D]/80 backdrop-blur-sm p-2 rounded-sm border border-gray-700">
                  <span className="text-[#E58A1F] font-bold">M/S Abdul Salam Constructions Company</span>
                  <p className="text-[11px] text-gray-400">Phase-II, Rajpura Colony, Aurai Road, Bhadohi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 space-y-12">
        {/* SCOPE & DELIVERABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#0B1B3D] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E58A1F]" />
                <span>Scope of Work & Engineering Deliverables</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {service.scopeDescription}
              </p>
              <div className="space-y-2.5 pt-2">
                {service.keyDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUOTATION SPECIFICATIONS TABLE */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#0B1B3D]">
                Quotation-Verified Material & Mix Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[#0B1B3D] font-bold">
                      <th className="py-2.5 px-3">Parameter / Item</th>
                      <th className="py-2.5 px-3">Specification / Ratio</th>
                      <th className="py-2.5 px-3">Brand / Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {service.specifications.map((spec, sIdx) => (
                      <tr key={sIdx} className="hover:bg-gray-50/60">
                        <td className="py-2.5 px-3 font-semibold text-[#0B1B3D]">{spec.label}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-gray-900">{spec.specification}</td>
                        <td className="py-2.5 px-3 text-gray-600">{spec.brandOrGrade || spec.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PACKAGES & EXCLUSIONS */}
          <div className="lg:col-span-5 space-y-6">
            {/* PACKAGE SCOPE BREAKDOWN */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#0B1B3D] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#E58A1F]" />
                <span>Quotation Packages Application</span>
              </h3>
              <div className="space-y-3">
                {service.packageComparison.map((pkg, pIdx) => (
                  <div key={pIdx} className="p-3.5 bg-gray-50 border border-gray-200 rounded-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xs text-[#0B1B3D]">{pkg.packageName}</span>
                      <span className="text-[11px] font-mono font-bold text-[#E58A1F]">{pkg.rate}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{pkg.scopeSummary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* INCLUSIONS VS EXCLUSIONS */}
            <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm space-y-4">
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-green-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Standard Inclusions</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-600 pl-1">
                  {service.inclusions.map((inc, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Exclusions (Billed on actuals or Owner Scope)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-600 pl-1">
                  {service.exclusions.map((exc, eIdx) => (
                    <li key={eIdx} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4. VISIBLE SERVICE FAQS */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E58A1F]">Technical Guidance</span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[#0B1B3D]">
              Frequently Asked Questions on {service.shortTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-4 bg-[#F8FAFC] border border-gray-200 rounded-sm space-y-2">
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#0B1B3D] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TOPICAL INTERNAL LINKING: RELATED SERVICES */}
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-base text-[#0B1B3D]">
            Explore Related Construction Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.relatedServiceSlugs.map((relSlug) => {
              const rel = INDIVIDUAL_SERVICES_DATA[relSlug];
              if (!rel) return null;
              return (
                <div
                  key={relSlug}
                  onClick={() => onNavigate(`/services/${relSlug}`)}
                  className="p-4 bg-white border border-gray-200 rounded-sm hover:border-[#E58A1F] hover:shadow-md transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold uppercase text-[#E58A1F]">{rel.shortTitle}</span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#0B1B3D] mt-1 group-hover:text-[#E58A1F] transition-colors">
                    {rel.title}
                  </h4>
                  <div className="inline-flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-3 group-hover:text-[#0B1B3D]">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. BOTTOM CTA */}
        <div className="bg-[#0B1B3D] text-white p-8 sm:p-12 rounded-sm text-center space-y-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Plan Your Construction Project with M/S Abdul Salam Constructions Company
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Registered site office at Phase-II, Rajpura Colony, Opposite H.P. Petrol Pump, Aurai Road, Bhadohi (221401). Site engineers available for plot inspection and estimation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenQuoteModal}
            >
              CALCULATE ESTIMATE
            </Button>
            <Button
              variant="white"
              size="md"
              onClick={onOpenConsultationModal}
            >
              BOOK ON-SITE CONSULTATION
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('/contact')}
            >
              VIEW OFFICE LOCATION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
