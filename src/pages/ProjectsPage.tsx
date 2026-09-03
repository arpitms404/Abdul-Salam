import React, { useState } from 'react';
import {
  PROJECTS_DATA
} from '../data/companyData';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import {
  MapPin,
  ArrowRight,
  HardHat,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsPageProps {
  onNavigate: (href: string) => void;
  onOpenConsultationModal: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');

  const categories = ['All', 'Residential', 'Commercial', 'Villas'];
  const stages = ['All', 'In Progress', 'Completed'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStage = selectedStage === 'All' || project.stage === selectedStage;
    return matchesCategory && matchesStage;
  });

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
            <span>Site Execution Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            Our Projects in Bhadohi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed"
          >
            Real residential duplex homes, commercial retail complexes, and custom villas executed with engineering precision across Harirampur, Aurai Road, Gyanpur, and Bhadohi town.
          </motion.p>
        </div>
      </section>

      {/* 2. FILTER STRIP */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-sm ${
                  selectedCategory === cat
                    ? 'bg-[#0B1B3D] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stage Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status:</span>
            {stages.map((stg) => (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-sm ${
                  selectedStage === stg
                    ? 'bg-[#E58A1F] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS GRID */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Showing <span className="text-[#0B1B3D]">{filteredProjects.length}</span> Verified Projects
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isOngoing = project.stage === 'In Progress';
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white border border-gray-200 overflow-hidden flex flex-col justify-between group hover:border-[#E58A1F] transition-shadow duration-300 shadow-sm hover:shadow-xl rounded-sm"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-gray-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 rounded-sm">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isOngoing ? 'bg-[#E58A1F] animate-pulse' : 'bg-emerald-400'
                          }`}
                        />
                        <span>{project.stage}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#0B1B3D]/90 text-[#E58A1F] text-[10px] font-mono font-bold rounded-sm">
                        {project.builtUpArea}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#E58A1F] font-bold uppercase tracking-wider mb-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{project.location}</span>
                        </div>

                        <h3 className="font-heading font-black text-xl text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                          {project.overview}
                        </p>
                      </div>

                      {/* Specs Mini-Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                        <div className="p-2 bg-gray-50 rounded-sm">
                          <span className="text-[10px] text-gray-400 block uppercase font-bold">Category</span>
                          <span className="font-bold text-[#0B1B3D]">{project.category}</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-sm">
                          <span className="text-[10px] text-gray-400 block uppercase font-bold">Completion</span>
                          <span className="font-bold text-[#0B1B3D]">{project.completionYear || 'Active'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      showArrow
                      onClick={() => onNavigate(`/projects/${project.id}`)}
                    >
                      View Case Study & Specs
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 p-8">
            <HardHat className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[#0B1B3D]">No Projects Found</h3>
            <p className="text-xs text-gray-500 mt-1">Try resetting your category or status filters above.</p>
            <div className="mt-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStage('All');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* 4. SITE VISIT CTA */}
      <section className="bg-[#0B1B3D] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Want to Inspect One of Our Live Construction Sites in Bhadohi?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            We regularly coordinate client visits to active RCC casting sites and masonry works along Aurai Road and Harirampur so you can witness our structural quality first-hand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              SCHEDULE A SITE WALKTHROUGH
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
