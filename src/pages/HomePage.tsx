import React, { useState } from 'react';
import {
  HardHat,
  ShieldCheck,
  Clock,
  Building2,
  Check,
  ArrowRight,
  Star,
  MapPin,
  FileText,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { MasterConstructionHero } from '../components/hero/MasterConstructionHero';
import { PackageCard } from '../components/packages/PackageCard';
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  PACKAGES_DATA,
  TESTIMONIALS_DATA,
  SERVICE_AREAS_DATA,
  PROCESS_STEPS,
  WHY_CHOOSE_US
} from '../data/companyData';

interface HomePageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeProjectTab, setActiveProjectTab] = useState<'all' | 'residential' | 'commercial' | 'villas'>('all');

  const filteredProjects = activeProjectTab === 'all'
    ? PROJECTS_DATA.slice(0, 4)
    : PROJECTS_DATA.filter((p) => {
        if (activeProjectTab === 'residential') return p.category.toLowerCase().includes('residential');
        if (activeProjectTab === 'commercial') return p.category.toLowerCase().includes('commercial');
        if (activeProjectTab === 'villas') return p.category.toLowerCase().includes('villa') || p.category.toLowerCase().includes('renovation');
        return true;
      }).slice(0, 4);

  return (
    <div className="space-y-0 w-full overflow-x-hidden">
      {/* 1. MASTER CONSTRUCTION HERO SECTION */}
      <MasterConstructionHero
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenConsultationModal={onOpenConsultationModal}
      />

      {/* 2. TRUST PILLARS BAR (Edge-to-Edge Animated Clean Grid) */}
      <section className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: HardHat,
                title: 'Quality Materials',
                desc: 'Tested cement, Fe-550 TMT steel, and grade-A bricks.'
              },
              {
                icon: FileText,
                title: 'Transparent BOQ',
                desc: 'Itemized specifications with zero hidden surcharges.'
              },
              {
                icon: Clock,
                title: 'On-Time Handover',
                desc: 'Milestone-based project scheduling & daily reporting.'
              },
              {
                icon: ShieldCheck,
                title: 'Structural Warranty',
                desc: 'Engineered foundation and RCC core longevity guarantee.'
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex items-start gap-3.5 p-2 rounded-sm group transition-colors hover:bg-slate-50/80"
              >
                <div className="p-2.5 bg-[#E58A1F]/10 text-[#E58A1F] flex-shrink-0 rounded-sm group-hover:bg-[#E58A1F] group-hover:text-white transition-colors duration-300">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-[#0B1B3D] uppercase tracking-wider group-hover:text-[#E58A1F] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE (Edge-to-Edge Geometric Bento Grid with Interactive Card Motion) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[#F8FAFC]">
        <div className="w-full max-w-[1920px] mx-auto">
          <SectionHeading
            badge="Our Construction Services"
            title="Engineered for Strength. Finished with Elegance."
            highlightWords={['Strength.', 'Elegance.']}
            description="We provide comprehensive end-to-end building services across Bhadohi district, ensuring structural rigor and architectural refinement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="bg-white border border-gray-200 hover:border-[#E58A1F] p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-300 group shadow-sm hover:shadow-xl hover:shadow-[#0B1B3D]/5 relative overflow-hidden"
              >
                {/* Accent top border highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#E58A1F] transition-colors duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-gray-300 group-hover:text-[#E58A1F] transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="w-9 h-9 bg-gray-100 group-hover:bg-[#E58A1F]/15 text-[#0B1B3D] group-hover:text-[#E58A1F] flex items-center justify-center transition-all duration-300 rounded-sm group-hover:scale-110">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {srv.shortDescription}
                  </p>

                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    {srv.keyFeatures.slice(0, 3).map((kf, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0" />
                        <span>{kf.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={`/services#${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/services#${srv.slug}`);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#0B1B3D] group-hover:text-[#E58A1F] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </a>

                  <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 group-hover:bg-[#E58A1F]/10 group-hover:text-[#E58A1F] text-gray-600 rounded-sm transition-colors">
                    {srv.timeline}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="md"
              showArrow
              onClick={() => onNavigate('/services')}
            >
              VIEW ALL CONSTRUCTION SERVICES
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS CAROUSEL / GRID (Edge-to-Edge Interactive Showcase) */}
      <section className="bg-[#0B1B3D] text-white py-16 sm:py-24 border-y border-[#2A2A2A] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-[11px] font-bold uppercase tracking-wider mb-2">
                <HardHat className="w-3.5 h-3.5" />
                <span>Our Track Record</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
                Featured Projects in Bhadohi
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl">
                Explore real ongoing sites and completed architectural residential & commercial builds across Harirampur, Aurai Road, and Gyanpur.
              </p>
            </div>

            {/* Filter Tabs with Active Motion Background */}
            <div className="flex items-center gap-1.5 bg-[#070F1E] p-1.5 border border-[#1E3A5F] self-start md:self-auto flex-wrap">
              {[
                { key: 'all', label: 'All Projects' },
                { key: 'residential', label: 'Residential' },
                { key: 'commercial', label: 'Commercial' },
                { key: 'villas', label: 'Villas & Renovation' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveProjectTab(tab.key as any)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-sm relative ${
                    activeProjectTab === tab.key
                      ? 'bg-[#E58A1F] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with Smooth AnimatePresence */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, i) => {
                const isOngoing = proj.stage === 'In Progress';
                return (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="bg-[#070F1E] border border-[#1E3A5F] overflow-hidden flex flex-col justify-between group hover:border-[#E58A1F] transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-[#E58A1F]/10 rounded-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                      <img
                        src={proj.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?q=80&w=800&auto=format&fit=crop'}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/15 rounded-sm">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isOngoing ? 'bg-[#E58A1F] animate-pulse' : 'bg-emerald-400'
                          }`}
                        />
                        <span>{proj.stage}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#0B1B3D]/95 text-[#E58A1F] text-[10px] font-mono font-bold border border-white/10 rounded-sm">
                        {proj.builtUpArea}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-[#E58A1F] text-xs font-semibold mb-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{proj.location}</span>
                        </div>

                        <h3 className="font-heading font-black text-base text-white group-hover:text-[#E58A1F] transition-colors leading-snug">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                          {proj.overview}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1E3A5F] flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">
                          {proj.category}
                        </span>

                        <button
                          onClick={() => onNavigate(`/projects/${proj.id}`)}
                          className="text-xs font-bold text-[#E58A1F] hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors group/btn"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-12">
            <Button
              variant="white"
              size="md"
              showArrow
              onClick={() => onNavigate('/projects')}
            >
              EXPLORE ALL PROJECTS & ARCHIVES
            </Button>
          </div>
        </div>
      </section>

      {/* 5. 5-STEP CONSTRUCTION PROCESS (Edge-to-Edge Animated Flow) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
        <div className="w-full max-w-[1920px] mx-auto">
          <SectionHeading
            badge="Structured Workflow"
            title="From Concept Blueprint to Turnkey Key Handover"
            highlightWords={['Blueprint', 'Turnkey']}
            description="Our 6-step engineering process removes ambiguity with transparent estimation, structural compliance, and disciplined milestone reviews."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-200 p-5 flex flex-col justify-between hover:border-[#E58A1F] transition-all duration-300 relative shadow-sm hover:shadow-lg rounded-sm group"
              >
                <div>
                  <div className="w-8 h-8 bg-[#0B1B3D] group-hover:bg-[#E58A1F] text-white flex items-center justify-center text-xs font-black mb-3 rounded-sm transition-colors duration-300">
                    {step.step}
                  </div>
                  <h3 className="font-heading font-extrabold text-sm text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] font-bold text-[#E58A1F] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Milestone Phase</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONSTRUCTION PACKAGES PREVIEW (Edge-to-Edge Animated Pricing Tiers) */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 border-y border-gray-200 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              badge="Pricing & Specifications"
              title="Transparent Construction Packages"
              highlightWords={['Construction', 'Packages']}
              description="Authentic turnkey construction packages with guaranteed industrial-grade materials (UltraTech, Tata 550D Rebar, Jaquar, Kajaria, Prominence UPVC) and zero hidden surprises."
            />
            
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                showArrow
                onClick={() => onNavigate('/packages')}
              >
                VIEW FULL SPECIFICATION MATRIX
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES_DATA.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isPopular={pkg.id === 'standard'}
                onSelectPackage={() => onOpenQuoteModal()}
                onViewOfficialQuotation={() => onNavigate('/packages')}
                onBookConsultation={onOpenConsultationModal}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 font-semibold mb-3">
              Looking for our official client quotation letterhead with milestone payment breakdowns & measurement formulas?
            </p>
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={() => onNavigate('/packages')}
            >
              ACCESS OFFICIAL CLIENT QUOTATION & BOQ (PDF FORMAT)
            </Button>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE ABDUL SALAM CONSTRUCTION COMPANY (Edge-to-Edge Motion Bento) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
        <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider">
              <span>Bhadohi's Trusted Builder</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1B3D] leading-tight">
              Why Homeowners & Businesses Trust{' '}
              <span className="text-[#E58A1F]">Abdul Salam Construction</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We stand apart in Bhadohi with our engineering discipline, formal contract milestones, strict quality checks on every cement batch and steel lot, and a steadfast dedication to transparent client communication.
            </p>

            <div className="p-4 bg-slate-50 border-l-4 border-[#E58A1F] space-y-1 rounded-r-sm">
              <p className="text-xs font-bold text-[#0B1B3D]">
                Site Location & Landmark:
              </p>
              <p className="text-xs text-gray-600">
                Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi – 221401
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              SCHEDULE A SITE VISIT
            </Button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-200 p-5 space-y-2 hover:border-[#E58A1F] transition-all duration-300 shadow-sm hover:shadow-md rounded-sm group"
              >
                <div className="w-8 h-8 bg-gray-100 group-hover:bg-[#E58A1F]/15 text-[#E58A1F] flex items-center justify-center rounded-sm transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-extrabold text-sm text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors">
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

      {/* 8. TESTIMONIALS SECTION (Edge-to-Edge Animated Cards) */}
      <section className="bg-[#0B1B3D] text-white py-16 sm:py-20 border-y border-[#2A2A2A] w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <SectionHeading
            badge="Client Feedback"
            title="What Clients Say About Working With Us"
            highlightWords={['Clients', 'Working']}
            theme="dark"
            description="Honest experiences from homeowners and commercial property owners in Bhadohi district."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-[#070F1E] border border-[#1E3A5F] hover:border-[#E58A1F] p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:shadow-[#E58A1F]/5 transition-all duration-300 rounded-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#E58A1F]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E3A5F] flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xs text-white">
                      {t.customerName}
                    </h3>
                    <p className="text-[10px] text-[#E58A1F]">
                      {t.projectType} • {t.location}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {t.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SERVICE COVERAGE REGIONS IN BHADOHI (Edge-to-Edge) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-[#F8FAFC]">
        <div className="w-full max-w-[1920px] mx-auto bg-white border border-gray-200 p-8 sm:p-10 shadow-sm rounded-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                Operational Coverage
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D] mt-1">
                Serving All Key Localities in Bhadohi District
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                Our construction crews, logistics, and site supervisors are actively deployed throughout the district.
              </p>
            </div>

            <Button
              variant="outline"
              size="md"
              showArrow
              onClick={() => onNavigate('/service-areas')}
            >
              EXPLORE COVERAGE MAP
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICE_AREAS_DATA.map((area, idx) => (
              <motion.div
                key={area.id}
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.15 }}
                className="p-3 bg-gray-50 border border-gray-200 text-center hover:border-[#E58A1F] hover:bg-white transition-all cursor-pointer rounded-sm shadow-xs hover:shadow-sm"
              >
                <p className="text-xs font-bold text-[#0B1B3D]">{area.name}</p>
                <span className="text-[10px] text-[#E58A1F] font-semibold block mt-0.5">
                  {area.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-IMPACT CTA SECTION (Edge-to-Edge Full Bleed) */}
      <section className="bg-[#E58A1F] text-white py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full relative overflow-hidden">
        {/* Subtle background ambient particle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Ready to Build Your Home with Complete Peace of Mind?
          </motion.h2>

          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed">
            Contact Abdul Salam Construction Company today for a transparent BOQ cost estimation, structural guidance, or site inspection in Bhadohi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="secondary"
              size="lg"
              showArrow
              onClick={onOpenQuoteModal}
              className="bg-[#0B1B3D] hover:bg-[#070F1E] text-white border-[#0B1B3D]"
            >
              GET YOUR FREE ESTIMATE
            </Button>

            <Button
              variant="white"
              size="lg"
              onClick={() => onNavigate('/contact')}
            >
              VISIT OUR OFFICE
            </Button>
          </div>

          <p className="text-xs text-white/80 pt-2 font-medium">
            Opposite H.P. Petrol Pump, Harirampur, Aurai Road, Bhadohi - 221401
          </p>
        </div>
      </section>
    </div>
  );
};
