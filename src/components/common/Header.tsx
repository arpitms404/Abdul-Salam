import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Home,
  Compass,
  Hammer,
  Building2,
  Layers,
  Paintbrush,
  MapPin,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';
import { NAVIGATION_ITEMS, PROMO_MESSAGES, COMPANY_DATA } from '../../data/companyData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [promoIndex, setPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  // Rotate promo bar messages
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon map for dropdown items
  const renderIcon = (name?: string) => {
    switch (name) {
      case 'Home': return <Home className="w-4 h-4 text-[#E58A1F]" />;
      case 'Compass': return <Compass className="w-4 h-4 text-[#E58A1F]" />;
      case 'Hammer': return <Hammer className="w-4 h-4 text-[#E58A1F]" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-[#E58A1F]" />;
      case 'Layers': return <Layers className="w-4 h-4 text-[#E58A1F]" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4 text-[#E58A1F]" />;
      case 'MapPin': return <MapPin className="w-4 h-4 text-[#E58A1F]" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 text-[#E58A1F]" />;
      case 'Calculator': return <Calculator className="w-4 h-4 text-[#E58A1F]" />;
      default: return <ArrowRight className="w-4 h-4 text-[#E58A1F]" />;
    }
  };

  const handleNavClick = (href: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 1. TOP PROMO BAR (Navy Slate with Construction Amber Accents - Full Edge to Edge) */}
      <div className="bg-[#070F1E] border-b border-[#1E3A5F] text-white py-2 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-xs font-medium w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden h-5">
            <span className="w-2 h-2 bg-[#E58A1F] inline-block flex-shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={promoIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-medium tracking-wide truncate max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl text-slate-200"
              >
                {PROMO_MESSAGES[promoIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={onOpenConsultationModal}
              className="hover:text-[#E58A1F] flex items-center gap-1.5 cursor-pointer font-bold text-xs uppercase tracking-wider text-slate-100 transition-colors"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E58A1F]" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Edge-to-Edge with Prominent Crystal-Clear Logo) */}
      <div
        className={`bg-white transition-all duration-200 w-full ${
          isScrolled
            ? 'shadow-md py-2.5 sm:py-3 border-b border-slate-200'
            : 'py-3.5 sm:py-4.5 border-b border-slate-200'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Brand Logo & Name - Large & Highly Visible */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-2 focus:outline-none group pr-4"
            aria-label="Abdul Salam Construction Company Home"
          >
            <Logo size={isScrolled ? 'md' : 'md'} className="transform transition-transform group-hover:scale-[1.01]" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);

              if (item.hasDropdown && item.dropdownItems) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                        isActive
                          ? 'text-[#E58A1F] bg-[#E58A1F]/10'
                          : 'text-[#0B1B3D] hover:text-[#E58A1F] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180 text-[#E58A1F]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.99 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full left-0 mt-1 bg-white border border-slate-200 shadow-xl p-3 z-50 ${
                            item.dropdownItems.length > 4 ? 'w-80 sm:w-[480px] grid grid-cols-2 gap-2' : 'w-72'
                          }`}
                        >
                          {item.dropdownItems.map((dropItem) => (
                            <a
                              key={dropItem.name}
                              href={dropItem.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(dropItem.href);
                              }}
                              className="group flex items-start gap-3 p-2.5 hover:bg-[#E58A1F]/5 transition-colors border border-transparent hover:border-[#E58A1F]/20"
                            >
                              <div className="mt-0.5 p-1.5 bg-slate-100 group-hover:bg-[#E58A1F]/10 text-[#E58A1F] transition-colors">
                                {renderIcon(dropItem.icon)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-[#0B1B3D] group-hover:text-[#E58A1F] transition-colors">
                                  {dropItem.name}
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                  {dropItem.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                    isActive
                      ? 'text-[#E58A1F] bg-[#E58A1F]/10'
                      : 'text-[#0B1B3D] hover:text-[#E58A1F] hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: GET A QUOTE CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenQuoteModal}
            >
              GET A QUOTE
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenQuoteModal}
            >
              Quote
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B1B3D] hover:text-[#E58A1F] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. ANIMATED MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 divide-y divide-slate-100 max-h-[80vh] overflow-y-auto">
              <div className="py-2 space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? currentPath === '/'
                      : currentPath.startsWith(item.href);

                  if (item.hasDropdown && item.dropdownItems) {
                    const isExpanded = mobileExpandedGroup === item.name;
                    return (
                      <div key={item.name} className="py-1">
                        <button
                          onClick={() =>
                            setMobileExpandedGroup(isExpanded ? null : item.name)
                          }
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-xs uppercase tracking-wider font-bold ${
                            isActive
                              ? 'text-[#E58A1F] bg-[#E58A1F]/10'
                              : 'text-[#0B1B3D] hover:bg-slate-50'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#E58A1F]' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 mt-1 border-l-2 border-[#E58A1F]">
                            {item.dropdownItems.map((dropItem) => (
                              <a
                                key={dropItem.name}
                                href={dropItem.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(dropItem.href);
                                }}
                                className="flex items-center gap-2.5 py-2 px-2 text-xs font-semibold text-slate-700 hover:text-[#E58A1F]"
                              >
                                {renderIcon(dropItem.icon)}
                                <span>{dropItem.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block px-3 py-2.5 text-xs uppercase tracking-wider font-bold ${
                        isActive
                          ? 'text-[#E58A1F] bg-[#E58A1F]/10'
                          : 'text-[#0B1B3D] hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons & Office Info */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  showArrow
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full justify-center"
                >
                  GET A FREE QUOTE
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultationModal();
                  }}
                  className="w-full justify-center text-xs"
                >
                  REQUEST SITE CONSULTATION
                </Button>

                <div className="text-center pt-2 text-xs text-slate-500">
                  <p className="font-semibold text-slate-800">Office Location:</p>
                  <p>{COMPANY_DATA.address.fullAddress}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
