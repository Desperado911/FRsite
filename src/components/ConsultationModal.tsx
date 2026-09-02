import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Send, CheckCircle2, ShieldAlert, MessageCircle, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledContext?: string;
}

export default function ConsultationModal({ isOpen, onClose, prefilledContext }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: 'call', // 'call', 'whatsapp', 'telegram'
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Generate a random ticket number for authentic rehabilitation service registration
      const randomTicket = 'FR-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicket);
      setIsSuccess(false);
      setPhoneError('');
      setFormData({
        name: '',
        phone: '',
        messenger: 'call',
        notes: prefilledContext || ''
      });
    }
  }, [isOpen, prefilledContext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      setPhoneError('Пожалуйста, введите корректный номер телефона');
      return;
    }
    setPhoneError('');
    setIsSubmitting(true);

    // Simulate database post/webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative z-10 p-6 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="mb-6">
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10 inline-block mb-2">
                  100% Анонимная Заявка
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
                  Получить консультацию врача
                </h3>
                <p className="text-stone-400 text-xs md:text-sm mt-1 leading-normal">
                  Оставьте заявку. Мы перезвоним или напишем вам в выбранный мессенджер в течение 5 минут. Дежурный врач на связи.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Contact Method Selector */}
                <div>
                  <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider font-mono block mb-2">
                    Как с вами связаться?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, messenger: 'call' })}
                      className={`py-3.5 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        formData.messenger === 'call'
                          ? 'border-emerald-500 bg-emerald-950/10 text-emerald-400'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Звонок</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, messenger: 'whatsapp' })}
                      className={`py-3.5 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        formData.messenger === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-950/10 text-emerald-400'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, messenger: 'telegram' })}
                      className={`py-3.5 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        formData.messenger === 'telegram'
                          ? 'border-emerald-500 bg-emerald-950/10 text-emerald-400'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-700'
                      }`}
                    >
                      <Send className="w-4 h-4 text-teal-400" />
                      <span>Telegram</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider font-mono block mb-1.5">
                    Ваше имя / Псевдоним
                  </label>
                  <input
                    type="text"
                    placeholder="Например, Александр (анонимно)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider font-mono block mb-1.5">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  />
                  {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                </div>

                {/* Custom notes or calculated programs */}
                <div>
                  <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider font-mono block mb-1.5">
                    Опишите ситуацию (необязательно)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Какая помощь необходима? Какая зависимость?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <span>Отправка...</span>
                    ) : (
                      <>
                        <span>Отправить конфиденциально</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-stone-500 leading-normal flex items-start gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-650 shrink-0 mt-0.5" />
                  Мы бережно храним ваши секреты. Мы не записываем звонки, не заносим в базы данных и гарантируем, что никто не узнает о вашей заявке.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ваша заявка принята!</h3>
              <p className="text-emerald-400 font-mono text-xs font-semibold mb-6">Номер тикета: {ticketNumber}</p>
              
              <div className="bg-stone-950 p-4.5 rounded-2xl border border-stone-850 max-w-sm mx-auto mb-8 text-left text-xs md:text-sm text-stone-300 leading-relaxed space-y-2">
                <p>✓ <strong>Анонимность подтверждена:</strong> Ваши данные зашифрованы.</p>
                <p>✓ <strong>Способ связи:</strong> {formData.messenger === 'call' ? 'Входящий звонок' : formData.messenger === 'whatsapp' ? 'Чат в WhatsApp' : 'Сообщение в Telegram'}.</p>
                <p>✓ <strong>Время ожидания:</strong> не более 5 минут.</p>
              </div>

              <button
                onClick={onClose}
                className="bg-stone-800 hover:bg-stone-750 text-white font-bold py-3 px-8 rounded-xl transition-colors text-xs md:text-sm cursor-pointer"
              >
                Вернуться на сайт
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
