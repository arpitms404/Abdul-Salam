import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { QuoteModal } from './components/modals/QuoteModal';
import { ConsultationModal } from './components/modals/ConsultationModal';
import { SEOHelmet } from './components/common/SEOHelmet';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndividualServicePage } from './pages/IndividualServicePage';
import { PackagesPage } from './pages/PackagesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { GetAQuotePage } from './pages/GetAQuotePage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [defaultQuotePackage, setDefaultQuotePackage] = useState<string | undefined>(undefined);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const [pathname, hash] = href.split('#');
    const targetPath = pathname || '/';

    window.history.pushState({}, '', href);
    setCurrentPath(targetPath);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (packageId?: string) => {
    setDefaultQuotePackage(packageId);
    setIsQuoteModalOpen(true);
  };

  const handleOpenConsultationModal = () => {
    setIsConsultationModalOpen(true);
  };

  // Route Resolver
  const renderCurrentPage = () => {
    const cleanPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    if (cleanPath === '' || cleanPath === '/') {
      return (
        <HomePage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/services') {
      return (
        <ServicesPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      return (
        <IndividualServicePage
          slug={slug}
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/packages') {
      return (
        <PackagesPage
          onNavigate={navigateTo}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/projects') {
      return (
        <ProjectsPage
          onNavigate={navigateTo}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath.startsWith('/projects/')) {
      const slug = cleanPath.replace('/projects/', '');
      return (
        <ProjectDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/about') {
      return (
        <AboutPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/service-areas') {
      return (
        <ServiceAreasPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/faq') {
      return (
        <FAQPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/contact') {
      return (
        <ContactPage
          onNavigate={navigateTo}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    if (cleanPath === '/get-a-quote') {
      return (
        <GetAQuotePage
          onNavigate={navigateTo}
          onOpenConsultationModal={handleOpenConsultationModal}
        />
      );
    }

    // Default fallback to Home
    return (
      <HomePage
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenConsultationModal={handleOpenConsultationModal}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1B3D] font-sans selection:bg-[#E58A1F] selection:text-white">
      {/* Dynamic SEO & Breadcrumbs Route Manager */}
      <SEOHelmet currentPath={currentPath} />

      {/* Global Navigation Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenConsultationModal={handleOpenConsultationModal}
      />


      {/* Main Page Body with Smooth Page Switch Animation */}
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Floating Action Buttons (Quick Enquiry & Scroll to Top) */}
      <FloatingActions onOpenConsultationModal={handleOpenConsultationModal} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultPackageId={defaultQuotePackage}
      />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
