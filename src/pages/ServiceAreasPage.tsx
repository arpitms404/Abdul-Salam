import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Navigation,
  Truck,
  FileText,
  Globe,
  Compass,
  Route
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_AREAS_DATA, COMPANY_DATA } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';

interface ServiceAreasPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkLocation, setCheckLocation] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const filteredAreas = SERVICE_AREAS_DATA.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkLocation.trim()) return;
    const lower = checkLocation.toLowerCase();
    const isCovered =
      lower.includes('bhadohi') ||
      lower.includes('harirampur') ||
      lower.includes('aurai') ||
      lower.includes('gyanpur') ||
      lower.includes('gopiganj') ||
      lower.includes('suriyawan') ||
      lower.includes('khamaria') ||
      lower.includes('chauri') ||
      lower.includes('varanasi');

    if (isCovered) {
      setCheckResult(`Yes! "${checkLocation}" is within our active construction and engineering coverage zone in Bhadohi district.`);
    } else {
      setCheckResult(`We actively service "${checkLocation}" and surrounding corridors in Uttar Pradesh. Our team will verify logistics during consultation.`);
    }
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
              <span>Operational Territory</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Service Areas & Coverage in Bhadohi District
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans"
            >
              Abdul Salam Construction Company deploys on-site engineering crews, heavy machinery, scaffolding, and tested raw materials throughout Bhadohi, Gyanpur, Gopiganj, Suriyawan, Aurai, and surrounding belts.
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
                REQUEST SITE INSPECTION IN YOUR AREA
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT LOCATION CHECKER */}
      <section className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-6 sm:p-8 rounded-sm">
          <div className="space-y-2 mb-4 text-center sm:text-left">
            <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
              Check Construction Coverage for Your Plot Location
            </h3>
            <p className="text-xs text-gray-600">
              Type your village, colony, or landmark in Bhadohi or nearby corridors to verify engineering availability.
            </p>
          </div>

          <form onSubmit={handleCheckLocation} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Harirampur, Maryadpatti, Gyanpur, Suriyawan..."
                value={checkLocation}
                onChange={(e) => setCheckLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
              />
            </div>
            <Button type="submit" variant="primary" size="md">
              Check Coverage
            </Button>
          </form>

          {checkResult && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3.5 bg-green-50 border border-green-200 text-xs font-semibold text-green-800 flex items-start gap-2 rounded-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{checkResult}</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. COVERAGE HUBS GRID */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="District Hubs"
            title="Core Coverage Hubs in Bhadohi"
            highlightWords={['Coverage Hubs']}
            description="Our civil supervisors and material supply networks operate seamlessly across these major localities."
            align="left"
            className="mb-0"
          />

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none rounded-sm"
            />
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAreas.map((area, idx) => (
              <motion.div
                key={area.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white border border-gray-200 p-6 flex flex-col justify-between hover:border-[#E58A1F] transition-shadow duration-300 shadow-sm hover:shadow-xl rounded-sm space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E58A1F]" />
                      <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                        {area.name}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold border border-green-200 rounded-sm">
                      {area.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {area.description}
                  </p>

                  <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3.5 border border-gray-200 rounded-sm">
                    <div>
                      <span className="text-gray-500 font-bold uppercase text-[10px] block">
                        Distance from Head Office:
                      </span>
                      <strong className="text-[#0B1B3D]">{area.distanceFromOffice}</strong>
                    </div>

                    <div>
                      <span className="text-gray-500 font-bold uppercase text-[10px] block">
                        Landmark / Corridor:
                      </span>
                      <span className="text-gray-700">{area.landmark}</span>
                    </div>

                    <div>
                      <span className="text-gray-500 font-bold uppercase text-[10px] block">
                        Popular Services:
                      </span>
                      <span className="text-[#E58A1F] font-semibold">{area.popularServices?.join(', ') || 'Turnkey Construction'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    showArrow
                    onClick={onOpenConsultationModal}
                  >
                    Schedule Visit in {area.name}
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3B. DISTRICT GEO-MATRIX & LOCAL SEARCH DIRECTORY (GEO & LOCAL SEO) */}
      <section className="py-16 bg-slate-100 border-t border-b border-gray-200 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-xs">
              <Globe className="w-3.5 h-3.5 text-[#E58A1F]" />
              <span>District Geo-Matrix & Tehsil Coverage</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D]">
              Bhadohi District Civil Works & Postal PIN Directory
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We deploy full construction machinery, concrete transit mixers, shuttering sets, and certified site supervisors across all major tehsils and postal circles in Sant Ravidas Nagar Bhadohi district.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                circle: 'Bhadohi City & Suburbs',
                pin: '221401',
                tehsil: 'Bhadohi Tehsil',
                transit: 'Immediate (0-15 Mins)',
                localities: ['Rajpura Colony', 'Civil Lines', 'Aurai Road', 'Maryadpatti', 'Station Road', 'Harirampur'],
                services: ['Turnkey Duplexes', 'Commercial Complexes', 'RCC Slab Casting', 'Architectural Blueprints']
              },
              {
                circle: 'Aurai Corridor & NH-19',
                pin: '221301',
                tehsil: 'Aurai Tehsil',
                transit: 'Rapid (10-20 Mins)',
                localities: ['Aurai Bazaar', 'Ugapur', 'Khamaria Road', 'GT Road Intersections', 'Maharajganj'],
                services: ['Highway Warehouses', 'Highway Commercial Plazas', 'Villa Construction', 'Boundary Walls']
              },
              {
                circle: 'Gyanpur Administrative HQ',
                pin: '221304',
                tehsil: 'Gyanpur Tehsil',
                transit: 'Direct (15-25 Mins)',
                localities: ['Collectorate Area', 'Degree College Road', 'Gopiganj Link', 'District Courts', 'Chak Inayat'],
                services: ['Institutional Buildings', 'Residential Residences', 'Civil Retrofitting', 'Structural Audits']
              },
              {
                circle: 'Gopiganj Commercial Market',
                pin: '221303',
                tehsil: 'Gyanpur Tehsil',
                transit: 'Direct (20-30 Mins)',
                localities: ['Main Market', 'GT Road Bypass', 'Mirzapur Road Junction', 'Kathauta Road', 'Dhanapur'],
                services: ['Multi-Storey Showrooms', 'Retail Plazas', 'Turnkey Homes', 'Interior Civil Finishes']
              },
              {
                circle: 'Suriyawan & North Belt',
                pin: '221402',
                tehsil: 'Bhadohi Tehsil',
                transit: 'Scheduled (20-35 Mins)',
                localities: ['Suriyawan Market', 'Mahuapur', 'Abholi Link Road', 'Railway Colony', 'Jangiganj Road'],
                services: ['Independent Bungalows', 'Farmhouse Construction', 'Foundation Piling', 'Brick Masonry']
              },
              {
                circle: 'Khamaria Carpet Industrial Belt',
                pin: '221306',
                tehsil: 'Aurai Tehsil',
                transit: 'Direct (25-35 Mins)',
                localities: ['Khamaria Town', 'Industrial Sheds Belt', 'Bhadohi Link Road', 'Gopiganj Road'],
                services: ['Industrial Sheds', 'Factory Foundations', 'Commercial Offices', 'Flooring & Epoxy Screeds']
              }
            ].map((col, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-xs shadow-xs hover:border-[#E58A1F] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#0B1B3D]">
                        {col.circle}
                      </h3>
                      <p className="text-[11px] text-gray-500">{col.tehsil}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#E58A1F] bg-[#E58A1F]/10 px-2 py-0.5 rounded-xs border border-[#E58A1F]/20 block">
                        PIN {col.pin}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
                        {col.transit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Localities Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {col.localities.map((loc, lIdx) => (
                        <span
                          key={lIdx}
                          className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-[11px] text-gray-700 rounded-xs"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-[#0B1B3D] uppercase tracking-wider block">
                      Active Civil Engineering Works:
                    </span>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {col.services.map((srv, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    onClick={onOpenConsultationModal}
                  >
                    Request Inspection in PIN {col.pin}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Machinery & Fleet Logistics Guarantee Strip */}
          <div className="mt-8 p-5 bg-[#0B1B3D] text-white border border-[#1E3A5F] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#E58A1F]/15 border border-[#E58A1F]/30 text-[#E58A1F] rounded-xs">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  Dedicated Construction Machinery & Material Supply Chain
                </h4>
                <p className="text-xs text-slate-300">
                  Direct quarry aggregates, UltraTech cement partnerships, Tata Tiscon steel logistics, and specialized shuttering sets dispatched directly across Bhadohi district.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/get-a-quote')}
              className="px-4 py-2 bg-[#E58A1F] hover:bg-[#C87514] text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer rounded-xs"
            >
              Calculate Construction Cost
            </button>
          </div>
        </div>
      </section>

      {/* 4. OFFICE INFO FOOTER */}
      <section className="bg-[#0B1B3D] text-white py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Need Our Engineers to Visit Your Plot Anywhere in Bhadohi?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Our engineering team conducts free plot feasibility inspections across Bhadohi district to assess soil stability, road access, and boundary clearances.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              REQUEST SITE FEASIBILITY VISIT
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
