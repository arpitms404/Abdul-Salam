import React from 'react';
import {
  PROJECTS_DATA
} from '../data/companyData';
import { Button } from '../components/common/Button';
import {
  MapPin,
  ArrowLeft,
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  HardHat,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const project = PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug) || PROJECTS_DATA[0];

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. TOP NAVIGATION CRUMBS */}
      <div className="bg-[#0B1B3D] text-white border-b border-[#2A2A2A] py-3 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </motion.button>

          <span className="text-xs text-gray-500 font-mono hidden sm:inline">
            Project Ref: {project.id}
          </span>
        </div>
      </div>

      {/* 2. PROJECT HERO HEADER */}
      <section className="bg-[#0B1B3D] text-white py-12 sm:py-16 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-8 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#E58A1F] text-white text-[10px] font-black uppercase tracking-wider rounded-sm">
                  {project.category}
                </span>
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm ${
                    project.stage === 'In Progress'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                      : 'bg-green-950/80 text-green-300 border-green-700/50'
                  }`}
                >
                  {project.stage}
                </span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                {project.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E58A1F] font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            </motion.div>

            {/* Quick Summary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-4 bg-white/5 border border-white/10 p-6 space-y-4 rounded-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Key Project Parameters
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Built-Up Area:</span>
                  <span className="font-bold text-white">{project.builtUpArea}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Plot Size:</span>
                  <span className="font-bold text-white">{project.plotSize}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Floors / Levels:</span>
                  <span className="font-bold text-white">{project.floors}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Contract Model:</span>
                  <span className="font-bold text-white">{project.contractType}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={onOpenQuoteModal}
                >
                  Request Similar Project Estimate
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HERO MEDIA GALLERY */}
      <section className="py-12 sm:py-16 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-16/9 sm:aspect-21/9 overflow-hidden bg-gray-900 border border-gray-200 rounded-sm shadow-lg"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* 4. OVERVIEW & ENGINEERING SPECIFICATIONS */}
      <section className="pb-16 sm:pb-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-8 bg-white border border-gray-200 p-8 sm:p-10 space-y-6 rounded-sm shadow-sm"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                Detailed Case Study
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D] mt-1">
                Project Overview & Execution Scope
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {project.overview}
            </p>

            {/* Scope of Work */}
            {project.scopeOfWork && project.scopeOfWork.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                  Scope of Work Executed:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {project.scopeOfWork.map((scopeItem, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                      <span>{scopeItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                  Key Architectural & Structural Highlights:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                  {project.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 border border-gray-200 rounded-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Stages Timeline */}
            {project.timeline && project.timeline.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                  Execution Milestone Stages:
                </h3>
                <div className="space-y-3">
                  {project.timeline.map((stg, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 border border-gray-200 rounded-sm flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#0B1B3D] text-[#E58A1F] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-heading font-bold text-[#0B1B3D]">{stg.title}</strong>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-gray-200 rounded-sm text-gray-700">
                            {stg.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{stg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Sidebar: Materials & Consultation Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white border border-gray-200 p-6 space-y-4 rounded-sm shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                Project Specifications
              </span>
              <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                Specification Overview
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Applied Package:</span>
                  <strong className="text-[#0B1B3D] text-right">{project.packageApplied}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Structure Type:</span>
                  <strong className="text-[#0B1B3D] text-right">{project.projectType}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Location:</span>
                  <strong className="text-[#0B1B3D] text-right">{project.location}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <strong className="text-[#0B1B3D] text-right">{project.stage}</strong>
                </div>
              </div>
            </div>

            <div className="bg-[#0B1B3D] text-white p-6 border border-[#2A2A2A] space-y-4 rounded-sm shadow-md">
              <HardHat className="w-8 h-8 text-[#E58A1F]" />
              <h3 className="font-heading font-black text-lg text-white">
                Planning a Similar Build in Bhadohi?
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Our site engineers can walk you through the architectural floor plans, 3D structural renders, and BOQ material breakdowns for this exact project.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={onOpenConsultationModal}
                >
                  Consult Site Engineers
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
