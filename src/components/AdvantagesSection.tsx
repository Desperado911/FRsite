import { ADVANTAGES } from '../data';
import { AdvantageIconKey } from '../types';
import { Award, ListOrdered, Home, Car, Users } from 'lucide-react';
import { motion } from 'motion/react';

const ICONS: Record<AdvantageIconKey, typeof ListOrdered> = {
  steps: ListOrdered,
  comfort: Home,
  homeVisit: Car,
  team: Users
};

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="scroll-mt-24 py-24 bg-bg-secondary border-t border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-4">
              <Award className="w-4 h-4" /> Наши отличительные преимущества
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary leading-tight">
              Почему выбирают FAMILY REHAB
            </h2>
          </div>
          <p className="lg:col-span-7 text-text-primary/80 text-sm md:text-base leading-relaxed lg:pt-10">
            FAMILY REHAB — это узнаваемый центр по лечению зависимостей с многолетним опытом. Мы предоставляем широкий спектр услуг для борьбы с игроманией, алкоголизмом и наркоманией, оказывая поддержку клиентам и их семьям на каждом этапе их пути к выздоровлению.
          </p>
        </div>

        <div className="geometric-grid grid-cols-1 md:grid-cols-2 border border-border-custom">
          {ADVANTAGES.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group p-7 md:p-8 flex gap-5 hover:bg-accent-light/60 transition-colors"
              >
                <div className="flex flex-col items-start gap-4 shrink-0">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-text-secondary">
                    0{index + 1}
                  </span>
                  <div className="w-11 h-11 bg-accent-light text-accent flex items-center justify-center border border-border-custom group-hover:bg-accent group-hover:text-bg-primary group-hover:border-accent transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="font-serif font-semibold text-base md:text-lg text-text-primary mb-2 leading-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-primary/75 text-xs md:text-sm leading-relaxed font-sans max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
