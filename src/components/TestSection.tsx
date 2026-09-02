import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEST_QUESTIONS, TEST_RESULTS } from '../data';
import { TestQuestion, TestResult } from '../types';
import { ClipboardCheck, Sparkles, AlertTriangle, ArrowRight, RefreshCcw, Send, CheckCircle2 } from 'lucide-react';

interface TestSectionProps {
  onOpenConsultation: (messageContext?: string) => void;
}

export default function TestSection({ onOpenConsultation }: TestSectionProps) {
  const [testType, setTestType] = useState<'addiction' | 'codependency'>('addiction');
  const [currentStep, setCurrentStep] = useState<number>(0); // -1: Intro, 0..N: Questions, N+1: Result
  const [scores, setScores] = useState<number[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [phoneError, setPhoneError] = useState('');

  const questions = TEST_QUESTIONS.filter(q => q.type === testType);

  const startTest = () => {
    setScores([]);
    setCurrentStep(0);
    setSubmitSuccess(false);
  };

  const selectAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Trigger results
    }
  };

  const getResult = (): TestResult => {
    const totalScore = scores.reduce((sum, s) => sum + s, 0);
    const results = TEST_RESULTS[testType];
    const matchingResult = results.find(
      r => totalScore >= r.minScore && totalScore <= r.maxScore
    );
    return matchingResult || results[results.length - 1];
  };

  const totalScoreValue = scores.reduce((sum, s) => sum + s, 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      setPhoneError('Пожалуйста, введите корректный номер телефона');
      return;
    }
    setPhoneError('');
    // Simulate sending result to backend
    setSubmitSuccess(true);
  };

  return (
    <section id="test" className="scroll-mt-24 py-24 bg-stone-900 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ClipboardCheck className="w-4 h-4" /> Интерактивный самоанализ
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Проверьте себя или близкого
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Пройдите быстрый клинический тест, разработанный нашими психологами, чтобы определить наличие проблемы и получить первичные рекомендации.
          </p>
        </div>

        {/* Test Type Tabs */}
        {currentStep <= 0 && (
          <div className="flex justify-center p-1 bg-stone-950 rounded-2xl max-w-md mx-auto mb-8 border border-stone-800">
            <button
              onClick={() => { setTestType('addiction'); setCurrentStep(-1); }}
              className={`flex-1 py-3 text-xs md:text-sm font-semibold rounded-xl transition-all ${testType === 'addiction'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
                }`}
            >
              Проверить себя (Зависимость)
            </button>
            <button
              onClick={() => { setTestType('codependency'); setCurrentStep(-1); }}
              className={`flex-1 py-3 text-xs md:text-sm font-semibold rounded-xl transition-all ${testType === 'codependency'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
                }`}
            >
              Проверить близкого (Созависимость)
            </button>
          </div>
        )}

        <div className="bg-stone-950/80 backdrop-blur-sm rounded-3xl border border-stone-850 p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[350px] flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-stone-800">
            {currentStep >= 0 && currentStep < questions.length && (
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            )}
            {currentStep === questions.length && (
              <div className="h-full w-full bg-emerald-500" />
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* Intro State */}
            {currentStep === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {testType === 'addiction' ? 'Тест на склонность к зависимости' : 'Тест на признаки созависимости'}
                </h3>
                <p className="text-stone-400 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
                  {testType === 'addiction'
                    ? 'Этот опросник поможет анонимно оценить ваши отношения с алкоголем или веществами. Будьте честны с собой — результаты видите только вы.'
                    : 'Этот опросник предназначен для родственников. Он покажет, насколько глубоко вы вовлечены в деструктивный сценарий спасательства в ущерб собственной жизни.'}
                </p>
                <button
                  onClick={startTest}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-102 flex items-center gap-2 group cursor-pointer"
                >
                  Начать тест <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Questions State */}
            {currentStep >= 0 && currentStep < questions.length && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-4"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-6 uppercase tracking-wider font-mono">
                  <span>Вопрос {currentStep + 1} из {questions.length}</span>
                  <span className="text-emerald-500">{testType === 'addiction' ? 'Личный профиль' : 'Семейный профиль'}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-stone-100 mb-8 leading-snug">
                  {questions[currentStep].text}
                </h3>
                <div className="space-y-3.5">
                  {questions[currentStep].answers.map((ans, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(ans.score)}
                      className="w-full text-left p-4.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500 hover:bg-emerald-950/20 text-stone-300 hover:text-white text-sm md:text-base font-medium transition-all duration-200 shadow-sm flex items-center justify-between group cursor-pointer"
                    >
                      <span>{ans.text}</span>
                      <span className="w-5 h-5 rounded-full border border-stone-700 group-hover:border-emerald-500 group-hover:bg-emerald-500 flex items-center justify-center transition-all">
                        <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-stone-950" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results State */}
            {currentStep === questions.length && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-2"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-amber-400 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-xs font-semibold uppercase tracking-wider font-mono">Анализ завершен</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {getResult().title}
                    </h3>
                    <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-4">
                      {getResult().description}
                    </p>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-sm leading-relaxed mb-6">
                      <strong className="block mb-1 text-white">Рекомендация специалиста:</strong>
                      {getResult().recommendation}
                    </div>
                    <button
                      onClick={() => { setCurrentStep(-1); startTest(); }}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" /> Пройти тест заново
                    </button>
                  </div>

                  {/* Consultation / Lead capture on result screen */}
                  <div className="w-full lg:w-80 bg-stone-900 rounded-2xl p-5 border border-stone-800">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Разбор со специалистом
                    </h4>
                    <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                      Оставьте свои контакты. Дежурный психолог перезвонит вам в течение 5 минут для бесплатного разбора теста и ответа на вопросы.
                    </p>

                    {!submitSuccess ? (
                      <form onSubmit={handleFormSubmit} className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Ваше имя"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 px-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg py-2 px-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
                            required
                          />
                          {phoneError && <p className="text-[10px] text-red-500 mt-1">{phoneError}</p>}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Отправить анонимно <Send className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-[9px] text-stone-500 text-center leading-normal mt-2">
                          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Ваши данные зашифрованы и не передаются третьим лицам.
                        </p>
                      </form>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h5 className="text-xs font-bold text-white mb-1">Заявка принята!</h5>
                        <p className="text-[11px] text-stone-400 leading-normal">
                          Специалист уже изучает ваши ответы ({testType === 'addiction' ? 'Зависимость' : 'Созависимость'}, набранный балл: {totalScoreValue}). Мы свяжемся с вами в течение 5 минут.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
