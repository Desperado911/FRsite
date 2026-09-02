import { useState } from 'react';
import { PROGRAMS, ROOMS } from '../data';
import { ProgramType, RoomType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, ShieldAlert, Award, Star, ArrowRight } from 'lucide-react';

interface CalculatorSectionProps {
  onOpenConsultation: (messageContext: string) => void;
}

export default function CalculatorSection({ onOpenConsultation }: CalculatorSectionProps) {
  const [selectedRoomId] = useState<string>('standard');
  const [durationDays, setDurationDays] = useState<number>(28);

  // Только одна программа — выбор больше не требуется
  const selectedProgram = PROGRAMS.find(p => p.id === 'classic') || PROGRAMS[1];
  const selectedRoom = ROOMS.find(r => r.id === 'standard') || ROOMS[0];

  // Duration Multipliers & Labels
  const durations = [
    { label: 'Детокс (7 дней)', days: 7, multiplier: 0.35, allowedFor: ['detox'] },
    { label: 'Базовый (28 дней)', days: 28, multiplier: 1.0, allowedFor: ['classic', 'family', 'detox'] },
    { label: 'Интенсив (90 дней)', days: 90, multiplier: 2.7, allowedFor: ['classic', 'comprehensive'] },
    { label: 'Полный курс (180 дней)', days: 180, multiplier: 4.8, allowedFor: ['comprehensive'] }
  ];

  // Filter allowed durations for the current program
  const allowedDurations = durations.filter(d => d.allowedFor.includes(selectedProgram.id));

  // Auto-adjust selected duration if not allowed
  const isCurrentDurationAllowed = allowedDurations.some(d => d.days === durationDays);
  if (!isCurrentDurationAllowed && allowedDurations.length > 0) {
    setDurationDays(allowedDurations[0].days);
  }

  // Calculate final cost
  const durationMultiplier = durations.find(d => d.days === durationDays)?.multiplier || 1.0;

  // Calculate raw cost: program base * room multiplier * duration multiplier
  let rawCost = selectedProgram.basePrice * selectedRoom.priceMultiplier * durationMultiplier;

  // Apply visual discounts for longer durations
  let discountPercent = 0;
  if (durationDays === 90) discountPercent = 10;
  if (durationDays === 180) discountPercent = 15;

  const discountAmount = Math.round(rawCost * (discountPercent / 100));
  const finalCost = Math.round(rawCost - discountAmount);

  const handleBooking = () => {
    const textContext = `Расчет программы: ${selectedProgram.name}, Размещение: ${selectedRoom.name}, Длительность: ${durationDays} дней. Ориентировочная стоимость: ${finalCost.toLocaleString('ru-RU')} ₸.`;
    onOpenConsultation(textContext);
  };

  return (
    <section id="calculator" className="scroll-mt-24 py-24 bg-stone-950 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" /> Калькулятор стоимости
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Рассчитайте стоимость реабилитации
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Выберите программу, условия проживания и сроки. Мы гарантируем фиксированную цену без скрытых доплат и платежей.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Program */}
            <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">1</span>
                Выберите направление терапии
              </h3>
              <div className="p-5 rounded-xl border border-emerald-500 bg-emerald-950/10 shadow-lg shadow-emerald-950/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm md:text-base text-white">{selectedProgram.name}</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-stone-400 leading-normal mb-4">{selectedProgram.description}</p>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  от {selectedProgram.basePrice.toLocaleString('ru-RU')} ₸ / мес
                </div>
              </div>
            </div>

            {/* Step 2: Accommodation */}
            <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">2</span>
                Условия проживания
              </h3>
              <div className="p-5 rounded-xl border border-emerald-500 bg-emerald-950/10 shadow-lg shadow-emerald-950/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-white">{selectedRoom.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-stone-400 leading-normal mb-4">{selectedRoom.description}</p>
                </div>
                <div className="text-xs font-semibold text-emerald-400 font-mono">
                  {selectedRoom.priceMultiplier === 1.0 ? 'Стандартная цена' : `+${Math.round((selectedRoom.priceMultiplier - 1) * 100)}% к базе`}
                </div>
              </div>
            </div>

            {/* Step 3: Duration */}
            <div className="bg-stone-900/40 border border-stone-850 p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">3</span>
                Длительность прохождения
              </h3>
              <div className="flex flex-wrap gap-3">
                {allowedDurations.map((dur) => (
                  <button
                    key={dur.days}
                    onClick={() => setDurationDays(dur.days)}
                    className={`py-3 px-5 text-xs md:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${durationDays === dur.days
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                      : 'bg-stone-900/30 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-4 leading-normal flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" /> Рекомендуемый срок реабилитации устанавливается врачебным консилиумом на основе анамнеза.
              </p>
            </div>
          </div>

          {/* Pricing & Features Sidebar Summary */}
          <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-28">
            <h3 className="text-lg font-bold text-stone-100 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Ваша программа
            </h3>

            {/* Program specifications list */}
            <div className="space-y-4 mb-6 pb-6 border-b border-stone-800 text-xs">
              <div>
                <span className="text-stone-500 block uppercase font-mono tracking-wider">Курс:</span>
                <span className="text-white font-semibold text-sm">{selectedProgram.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase font-mono tracking-wider">Размещение:</span>
                <span className="text-white font-semibold text-sm">{selectedRoom.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase font-mono tracking-wider">Длительность:</span>
                <span className="text-white font-semibold text-sm">{durationDays} дней</span>
              </div>
            </div>

            {/* Amenities Checklist */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-widest font-mono mb-3">Что входит в стоимость:</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                {selectedProgram.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {selectedRoom.amenities.slice(0, 2).map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold shrink-0">✓</span>
                    <span>{a} ({selectedRoom.name})</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>100% Анонимность и отсутствие учета</span>
                </li>
              </ul>
            </div>

            {/* Price Box */}
            <div className="bg-stone-950 p-5 rounded-xl border border-stone-850 mb-6 text-center">
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-1">Итоговая стоимость:</span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-sans font-extrabold text-white">
                  {finalCost.toLocaleString('ru-RU')}
                </span>
                <span className="text-sm font-semibold text-stone-400">₸</span>
              </div>
              {discountPercent > 0 && (
                <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                  Скидка {discountPercent}% за длительность (-{discountAmount.toLocaleString('ru-RU')} ₸)
                </div>
              )}
              <p className="text-[10px] text-stone-500 leading-normal mt-2">
                Возможна рассрочка от банков-партнеров без переплат
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm"
            >
              Забронировать курс <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
