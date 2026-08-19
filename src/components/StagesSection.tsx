import { REHAB_STAGES } from '../data';
import { Route, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface StagesSectionProps {
  onOpenConsultation: (messageContext?: string) => void;
}

export default function StagesSection({ onOpenConsultation }: StagesSectionProps) {
  return (
    <section id="stages" className="scroll-mt-24 py-24 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20 mb-3">
            <Route className="w-4 h-4" /> Этапы реабилитации
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-white mb-4">
            Путь к жизни без зависимости
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Мы в FAMILY REHAB стремимся предоставить высококачественные и инновационные услуги по лечению зависимостей, помогая людям вернуться к здоровой, счастливой и продуктивной жизни, свободной от зависимости.
          </p>
        </div>

        {/* Desktop stepper */}
        <div className="hidden lg:block relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-stone-700" />
          <div className="grid grid-cols-5 gap-6">
            {REHAB_STAGES.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                className="relative flex flex-col"
              >
                <div className="relative z-10 w-12 h-12 bg-stone-900 border border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 mb-6">
                  {stage.number}
                </div>
                <h3 className="font-serif font-semibold text-base text-white mb-2 leading-tight">
                  {stage.title}
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-sans mb-5 flex-1 min-h-[4.5rem]">
                  {stage.description}
                </p>
                <button
                  onClick={() => onOpenConsultation(stage.consultationContext)}
                  className="group/btn inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 border border-emerald-600 hover:border-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 px-3 transition-all cursor-pointer"
                >
                  {stage.buttonLabel}
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet timeline */}
        <div className="lg:hidden relative pl-2">
          <div className="absolute left-[22px] top-3 bottom-3 w-px bg-stone-700" />
          <div className="space-y-4">
            {REHAB_STAGES.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex gap-4"
              >
                <div className="relative z-10 w-11 h-11 shrink-0 bg-stone-900 border border-stone-700 flex items-center justify-center font-mono text-[11px] font-bold text-emerald-400">
                  {stage.number}
                </div>
                <div className="flex-1 bg-stone-950/70 border border-stone-800 p-5">
                  <h3 className="font-serif font-semibold text-sm text-white mb-1.5 leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-sans mb-4">
                    {stage.description}
                  </p>
                  <button
                    onClick={() => onOpenConsultation(stage.consultationContext)}
                    className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 border border-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 px-4 transition-all cursor-pointer"
                  >
                    {stage.buttonLabel}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
