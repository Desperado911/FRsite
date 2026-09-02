import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, AlertCircle, HeartHandshake, ShieldAlert, Phone, Sparkles } from 'lucide-react';

interface MotivationGuideProps {
  onOpenConsultation: (messageContext?: string) => void;
}

export default function MotivationGuide({ onOpenConsultation }: MotivationGuideProps) {
  const [activeTab, setActiveTab] = useState<'donts' | 'dos' | 'intervention'>('donts');

  const content = {
    donts: {
      title: "Типичные ошибки близких (Чего делать НЕЛЬЗЯ)",
      subtitle: "Эти действия не спасают, а лишь продлевают и усугубляют зависимость близкого.",
      items: [
        {
          title: "Смягчать последствия и платить долги",
          desc: "Погашая кредиты, решая проблемы с полицией или работой, вы забираете у зависимого шанс столкнуться с реальностью. Пока последствия не причинят ему дискомфорт, у него не появится мотив лечиться."
        },
        {
          title: "Читать нотации, упрекать и взывать к совести",
          desc: "Зависимость — это болезнь мозга, а не отсутствие силы воли. Лекции и крики вызывают лишь ответную агрессию, глубокое чувство стыда и желание употребить очередную дозу для заглушения боли."
        },
        {
          title: "Контролировать каждый шаг, обыскивать, угрожать",
          desc: "Гиперконтроль разрушает остатки доверия. Зависимый просто научится лучше врать и прятать следы. Пустые угрозы ('уйду', 'лишу денег'), которые вы не выполняете, окончательно обесценивают ваши слова."
        },
        {
          title: "Стыдиться проблемы и скрывать её",
          desc: "Попытки 'сохранить лицо' перед соседями или коллегами крадут драгоценное время. Зависимость прогрессирует в тайне. Раскрытие тайны внутри семьи — это первый шаг к исцелению."
        }
      ]
    },
    dos: {
      title: "Эффективные шаги (Что НУЖНО делать)",
      subtitle: "Правильная стратегия поведения, которая подтолкнет близкого к признанию проблемы.",
      items: [
        {
          title: "Говорить только в трезвом состоянии",
          desc: "Любые разговоры во время опьянения абсолютно бесполезны и опасны. Ловите момент 'похмелья' или абстиненции — когда физически и психологически плохо, критика к своему состоянию максимальна."
        },
        {
          title: "Использовать 'Я-сообщения' вместо обвинений",
          desc: "Вместо 'Ты разрушаешь нашу жизнь!' говорите: 'Мне очень страшно, когда я вижу тебя в таком состоянии', 'Я очень люблю тебя и боюсь тебя потерять'. Это снижает защитные барьеры и агрессию."
        },
        {
          title: "Передать ответственность за последствия",
          desc: "Твердо скажите: 'Я люблю тебя, но больше не дам ни тенге на долги и алкоголь. Я не буду врать твоему начальнику. Это твои проблемы, и ты решаешь их сам. Но если ты захочешь лечиться — я поддержу.'"
        },
        {
          title: "Предложить конкретный и легкий первый шаг",
          desc: "Не требуйте сразу ложиться в клинику на полгода. Предложите просто съездить на одну ни к чему не обязывающую консультацию с психологом FAMILY REHUB: 'Давай просто проконсультируемся, если не понравится — уедем.'"
        }
      ]
    },
    intervention: {
      title: "Психологическая Интервенция 24/7",
      subtitle: "Если разговоры не помогают, вызовите профессиональную выездную группу.",
      items: [
        {
          title: "Как это проходит?",
          desc: "К вам домой приезжает команда из 2-3 опытных психологов-интервентов. Они одеты в обычную гражданскую одежду, ведут себя предельно уважительно, без капли физического или медикаментозного принуждения."
        },
        {
          title: "Деликатная беседа длится до победного",
          desc: "Специалисты выстраивают разговор на основе клинических методов убеждения. Они обходят психологические защиты зависимого, помогают ему увидеть разруху в своей жизни и принять добровольное решение."
        },
        {
          title: "92% успешных согласий",
          desc: "Многолетняя практика показывает: профессионалы находят нужные рычаги мотивации даже у самых агрессивных или скептически настроенных пациентов. Близкий сам собирает вещи и уезжает в центр."
        },
        {
          title: "Безопасный трансфер в центр",
          desc: "Сразу после согласия мы бережно перевозим резидента в комфортабельный стационар FAMILY REHUB на охраняемом автомобиле клиники. Все контакты абсолютно конфиденциальны."
        }
      ]
    }
  };

  const activeContent = content[activeTab];

  return (
    <section id="about" className="py-24 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left Intro */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" /> Семейная поддержка
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
              Как убедить близкого пройти лечение?
            </h2>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Зависимый часто утверждает: <em className="text-emerald-400">«Я могу бросить в любой момент»</em> или <em className="text-emerald-400">«У меня нет проблем»</em>. Родственники бьются годами, совершая ошибки, которые только подпитывают болезнь.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Мы разработали интерактивное руководство. Поймите механизмы зависимости и созависимости, чтобы помочь родному человеку сделать первый шаг к спасению.
            </p>

            <div className="pt-4">
              <a
                href={'https://wa.me/77762166603?text=' + encodeURIComponent('Здравствуйте! Пишу с сайта Family Rehab, нужна помощь - срочный выезд группы интервенции (мотивации на лечение).')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-900/20 transition-all hover:scale-102 cursor-pointer"
              >
                <Phone className="w-4 h-4" /> Вызвать интервенцию на дом
              </a>
            </div>
          </div>

          {/* Interactive tabs and items Right */}
          <div className="lg:col-span-7 bg-stone-950/70 border border-stone-850 p-6 md:p-8 rounded-3xl shadow-2xl">
            {/* Tabs Selector */}
            <div className="flex border-b border-stone-800 pb-1 mb-6 overflow-x-auto gap-2 scrollbar-none">
              <button
                onClick={() => setActiveTab('donts')}
                className={`py-3 px-4 font-semibold text-xs md:text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'donts'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <AlertCircle className="w-4 h-4" /> Ошибки близких
              </button>
              <button
                onClick={() => setActiveTab('dos')}
                className={`py-3 px-4 font-semibold text-xs md:text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dos'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <HeartHandshake className="w-4 h-4" /> Как вести себя правильно
              </button>
              <button
                onClick={() => setActiveTab('intervention')}
                className={`py-3 px-4 font-semibold text-xs md:text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'intervention'
                    ? 'border-teal-500 text-teal-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Помощь интервентов
              </button>
            </div>

            {/* Tab contents with motion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{activeContent.title}</h3>
                  <p className="text-xs text-stone-400">{activeContent.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeContent.items.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        activeTab === 'donts'
                          ? 'bg-red-500/5 border-red-950/30'
                          : activeTab === 'dos'
                          ? 'bg-emerald-500/5 border-emerald-950/30'
                          : 'bg-teal-500/5 border-teal-950/30'
                      }`}
                    >
                      <h4 className="font-bold text-xs md:text-sm text-stone-100 mb-1.5 flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          activeTab === 'donts' ? 'bg-red-500' : activeTab === 'dos' ? 'bg-emerald-500' : 'bg-teal-500'
                        }`} />
                        {item.title}
                      </h4>
                      <p className="text-stone-400 text-[11px] md:text-xs leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
