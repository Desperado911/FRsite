import { useState } from 'react';
import { FAQS } from '../data';
import { FAQItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1); // Leave first expanded by default

  const categories = [
    { id: 'all', label: 'Все вопросы' },
    { id: 'confidentiality', label: 'Анонимность' },
    { id: 'motivation', label: 'Отказ от лечения' },
    { id: 'program', label: 'Программа' },
    { id: 'family', label: 'Для близких' },
    { id: 'safety', label: 'Безопасность' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-24 bg-stone-950 border-t border-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" /> Вопрос-Ответ
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Отвечаем на ваши главные страхи
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Мы знаем, как трудно сделать первый шаг и сколько вопросов возникает у семей. Ниже представлены честные профессиональные ответы на волнующие вас темы.
          </p>
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedId(null); // Close active when category changes
              }}
              className={`py-2 px-4 text-xs font-semibold rounded-full border transition-all cursor-pointer ${activeCategory === cat.id
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                  : 'bg-stone-900/30 border-stone-850 text-stone-400 hover:text-white hover:border-stone-700'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list with Accordions */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-stone-900/50 border border-stone-850 rounded-2xl overflow-hidden transition-colors hover:bg-stone-900/75"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 text-white hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm md:text-base leading-snug">{item.question}</span>
                    <span className="p-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 md:px-6 pb-6 pt-1 text-xs md:text-sm text-stone-300 leading-relaxed border-t border-stone-850/30">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
