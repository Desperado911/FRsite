import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { HeartHandshake, ChevronRight, Building2, Home } from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: (messageContext?: string) => void;
}

export default function ServicesSection({ onOpenConsultation }: ServicesSectionProps) {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);
  const activeService = SERVICES[activeIndex] ?? SERVICES[0];

  return (
    <section id="services" className="scroll-mt-24 py-24 bg-bg-secondary border-t border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
            <HeartHandshake className="w-4 h-4" /> Наши услуги
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-4">
            Профессиональная медицинская и психологическая помощь
          </h2>
          <p className="text-text-primary/75 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-5">
            FAMILY REHAB принимает вас как членов семьи.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-custom text-[10px] font-bold uppercase tracking-wider text-text-primary">
              <Building2 className="w-3.5 h-3.5 text-accent" /> Стационарно
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-custom text-[10px] font-bold uppercase tracking-wider text-text-primary">
              <Home className="w-3.5 h-3.5 text-accent" /> Амбулаторно
            </span>
          </div>
        </div>

        <div className="border border-border-custom bg-bg-primary overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border-custom">
            {SERVICES.map((service, index) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`relative text-left px-4 sm:px-5 py-4 border-border-custom transition-all cursor-pointer ${
                    index % 2 === 1 ? 'border-l' : ''
                  } ${index >= 2 ? 'border-t lg:border-t-0' : ''} ${
                    index > 0 ? 'lg:border-l' : ''
                  } ${
                    isActive
                      ? 'bg-accent-light'
                      : 'bg-bg-primary hover:bg-accent-light/40'
                  }`}
                >
                  <span className="block font-mono text-[10px] font-bold tracking-widest text-text-secondary mb-1">
                    0{index + 1}
                  </span>
                  <span className={`block text-xs sm:text-sm font-serif font-semibold leading-snug ${
                    isActive ? 'text-accent' : 'text-text-primary'
                  }`}>
                    {service.shortTitle}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative p-6 sm:p-8 md:p-10 min-h-[260px] flex flex-col justify-between overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-4 font-serif text-[9rem] leading-none text-accent/[0.06] select-none"
            >
              0{activeIndex + 1}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="relative z-10 max-w-3xl"
              >
                <h3 className="font-serif font-semibold text-xl md:text-2xl text-text-primary mb-4 leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-text-primary/85 text-sm md:text-[15px] leading-relaxed font-sans">
                  {activeService.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 pt-8 mt-6 border-t border-border-custom">
              <button
                onClick={() => onOpenConsultation(`Консультация по услуге: ${activeService.title}`)}
                className="group inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-bg-primary font-bold uppercase tracking-wider py-3.5 px-6 border border-accent hover:border-accent-hover transition-all cursor-pointer text-xs"
              >
                Получить консультацию
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
