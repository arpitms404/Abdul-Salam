import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, COMPANY_DATA } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';

interface FAQPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({
    faq1: true,
    faq2: true
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Pricing & Contracts', label: 'Pricing & BOQ' },
    { id: 'Quality & Process', label: 'Quality & Material' },
    { id: 'Site & Planning', label: 'Site Planning & Timelines' }
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;

    const matchSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1B3D] text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
            >
              <span>Client Knowledge Base</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Frequently Asked Questions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans"
            >
              Get direct answers regarding construction rates, concrete grades, stage-wise billing schedules, material brands, and architectural workflow in Bhadohi.
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
                onClick={onOpenQuoteModal}
              >
                CALCULATE YOUR PROJECT COST
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORY FILTER */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer rounded-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1B3D] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 text-xs text-[#0B1B3D] focus:outline-none focus:border-[#E58A1F] transition-colors rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION LIST */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = !!openFaqs[faq.id];
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white border border-gray-200 hover:border-[#E58A1F] transition-colors overflow-hidden rounded-sm shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E58A1F]/10 text-[#E58A1F] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                        ?
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E58A1F] block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="font-heading font-black text-base sm:text-lg text-[#0B1B3D]">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1 bg-gray-100 text-gray-500 rounded-sm flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed pl-14">
                          <p className="pt-3">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white border border-gray-200 p-8 rounded-sm">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-base text-[#0B1B3D]">
                No questions found matching your search
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for different terms like "cement", "rate", "milestone", or "warranty".
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. DIRECT CONTACT CTA */}
      <section className="bg-[#0B1B3D] text-white py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Have a Question Not Listed Here?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Reach out directly to our engineering office. We are happy to review your plot layout, structural queries, and provide cost breakdowns.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              BOOK DIRECT CONSULTATION
            </Button>
            <Button
              variant="white"
              size="md"
              onClick={() => onNavigate('/contact')}
            >
              CONTACT PAGE & PHONE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
