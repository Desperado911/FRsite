import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo1.png';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'О центре', href: '#about-center' },
    { label: 'Услуги', href: '#services' },
    { label: 'Программы', href: '#programs' },
    { label: 'Сертификаты', href: '#certificates' },
    { label: 'Тест', mobileLabel: 'Пройти тест', href: '#test' },
    { label: 'Специалисты', href: '#team' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasMobileMenuOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      if (wasMobileMenuOpen) {
        // Delay scroll until after the framer-motion exit animation finishes,
        // otherwise the collapsing menu height fights with smooth scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-stone-900/90 backdrop-blur-md border-b border-stone-800 shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto pl-5 pr-7 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 xl:gap-6 flex-nowrap">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform overflow-hidden p-1 border border-emerald-500/20">
              <img
                src={logoImg}
                alt="FAMILY REHAB"
                className="w-full h-full object-contain translate-y-0.5 scale-150 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-sans font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-white' : 'text-stone-900'}`}>FAMILY</span>
                <span className="bg-emerald-500 text-stone-950 text-xs font-black px-1.5 py-0.5 rounded tracking-widest">REHAB</span>
              </div>
              <p className={`text-[9px] tracking-wider uppercase font-medium transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-600'}`}>Реабилитационный центр</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1 gap-4 2xl:gap-6 min-w-0">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`whitespace-nowrap text-[13px] 2xl:text-sm font-medium transition-colors py-1 ${isScrolled ? 'text-stone-300 hover:text-emerald-400' : 'text-stone-700 hover:text-emerald-600'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden sm:flex items-center gap-4 xl:gap-5 shrink-0">
            <div className="text-right">
              <a
                href="tel:+77762166603"
                className={`flex items-center gap-1.5 font-mono font-bold text-lg transition-colors ${isScrolled ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isScrolled ? 'bg-emerald-400' : 'bg-emerald-600'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isScrolled ? 'bg-emerald-500' : 'bg-emerald-600'}`}></span>
                </span>
                +7 (776) 216-66-03
              </a>
              <p className={`text-[10px] flex items-center justify-end gap-1 font-sans transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-600'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Анонимно & Бесплатно 24/7
              </p>
            </div>
            <a
              id="header-cta"
              href="https://wa.me/77762166603?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%B8%D1%88%D1%83%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20Family%20Rehab%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-emerald-900/20 inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/77762166603"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-lg transition-colors ${isScrolled
                ? 'text-stone-300 hover:text-white hover:bg-stone-800'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-stone-900/95 backdrop-blur-lg border-b border-stone-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800 transition-all"
                >
                  {item.mobileLabel ?? item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-stone-800 flex flex-col gap-3 px-3">
                <a
                  href="tel:+77762166603"
                  className="flex items-center gap-2 font-mono font-bold text-lg text-emerald-400"
                >
                  <Phone className="w-5 h-5" /> +7 (776) 216-66-03
                </a>
                <p className="text-xs text-stone-400">Горячая линия анонимной помощи</p>
                <a
                  id="mobile-menu-cta"
                  href="https://wa.me/77762166603?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%B8%D1%88%D1%83%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20Family%20Rehab%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
