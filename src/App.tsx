import heroImage from './assets/images/c7b94465-26a7-4b97-8d01-6b233ee6682c.png';
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import AdvantagesSection from './components/AdvantagesSection';
import StagesSection from './components/StagesSection';
import ServicesSection from './components/ServicesSection';
import Certificates from './components/Certificates';
import TestSection from './components/TestSection';
import CalculatorSection from './components/CalculatorSection';
import MotivationGuide from './components/MotivationGuide';
import FAQSection from './components/FAQSection';
import ReviewsSection from './components/ReviewsSection';
import ConsultationModal from './components/ConsultationModal';
import { TEAM, PROGRAMS } from './data';
import { motion } from 'motion/react';
import {
  Shield,
  Users,
  Sparkles,
  Clock,
  MapPin,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  HeartHandshake,
  ArrowRight,
  ShieldAlert,
  Home,
  User
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/77762166603?text=' + encodeURIComponent('Здравствуйте! Пишу с сайта Family Rehab, хочу получить консультацию.');

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [modalContext, setModalContext] = useState<string>('');
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollTeamLeft, setCanScrollTeamLeft] = useState(false);
  const [canScrollTeamRight, setCanScrollTeamRight] = useState(true);

  const openConsultation = (context: string = '') => {
    setModalContext(context);
    setIsConsultationOpen(true);
  };

  const checkTeamScrollButtons = () => {
    if (teamScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
      setCanScrollTeamLeft(scrollLeft > 10);
      setCanScrollTeamRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkTeamScrollButtons();
    const el = teamScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkTeamScrollButtons);
      return () => el.removeEventListener('scroll', checkTeamScrollButtons);
    }
  }, []);

  const handleTeamScroll = (direction: 'left' | 'right') => {
    if (teamScrollRef.current) {
      const scrollAmount = teamScrollRef.current.clientWidth * 0.75;
      teamScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased selection:bg-accent selection:text-bg-primary">

      {/* Header */}
      <Header onOpenConsultation={() => openConsultation('Заявка с шапки сайта')} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-bg-primary border-b border-border-custom">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(107,112,92,0.04),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom">
                <Shield className="w-4 h-4 text-accent" /> 100% Анонимно. Без постановки на учет.
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-text-primary leading-[1.1]">
                Верните покой <br className="hidden sm:inline" />
                и доверие в <span className="italic font-serif text-accent underline decoration-border-custom decoration-2 underline-offset-4">вашу семью</span>
              </h1>

              <p className="text-text-primary/85 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
                Победите зависимость и восстановите свою обычную жизнь
                В FAMILY REHAB мы предлагаем всестороннюю поддержку в борьбе с зависимостью, помогая вам или вашим близким достичь свободы и наслаждаться полной радостью жизни..
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
                <div className="flex items-center gap-2 bg-bg-secondary p-3.5 border border-border-custom">
                  <Award className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-xs text-text-primary font-semibold">Лицензия Минздрава РК</span>
                </div>
                <div className="flex items-center gap-2 bg-bg-secondary p-3.5 border border-border-custom">
                  <Users className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-xs text-text-primary font-semibold">Программа созависимости</span>
                </div>
                <div className="flex items-center gap-2 bg-bg-secondary p-3.5 border border-border-custom col-span-2 sm:col-span-1">
                  <Home className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-xs text-text-primary font-semibold">Загородный эко-дом</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  id="hero-primary-btn"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent-hover text-bg-primary font-bold uppercase tracking-wider py-4 px-8 border border-accent hover:border-accent-hover transition-all cursor-pointer text-center text-xs inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                </a>
                <button
                  id="hero-secondary-btn"
                  onClick={(e) => scrollToSection(e, '#test')}
                  className="bg-bg-secondary hover:bg-bg-primary border border-border-custom text-text-primary font-bold uppercase tracking-wider py-4 px-6 transition-all cursor-pointer text-center text-xs flex items-center justify-center gap-1.5 group"
                >
                  Пройти тест на созависимость <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent" />
                </button>
              </div>

              {/* Call out info */}
              <div className="flex items-center gap-4 text-xs text-text-secondary pt-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" /> Выезд нарколога 24/7 по Алматы
                </span>
                <span className="text-border-custom">|</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" /> Предгорья Заилийского Алатау
                </span>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-accent/5 blur-2xl pointer-events-none" />
              <div className="relative bg-bg-secondary border border-border-custom p-4 overflow-hidden group">
                <img
                  src={heroImage}
                  alt="FAMILY REHUB Загородный коттедж в лесу"
                  className="w-full h-[300px] sm:h-[380px] object-cover transition-all duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-bg-primary/95 border border-border-custom p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-mono font-bold">Охраняемая территория</p>
                    <p className="text-text-primary font-bold text-sm mt-0.5">Безопасный стационар в предгорье</p>
                  </div>
                  <div className="w-10 h-10 bg-accent-light text-accent flex items-center justify-center border border-border-custom">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Numbers / Trust Stats Grid */}
      <section className="py-12 bg-bg-secondary border-y border-border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-bg-primary border border-border-custom">
              <p className="text-3xl md:text-4xl font-serif font-bold text-accent">1500+</p>
              <p className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-wider font-sans">вернулись в семьи здоровыми</p>
            </div>
            <div className="p-6 bg-bg-primary border border-border-custom">
              <p className="text-3xl md:text-4xl font-serif font-bold text-accent">98.4%</p>
              <p className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-wider font-sans">ремиссия от 2 лет у выпускников</p>
            </div>
            <div className="p-6 bg-bg-primary border border-border-custom">
              <p className="text-3xl md:text-4xl font-serif font-bold text-accent">20+ лет</p>
              <p className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-wider font-sans">средний стаж наших врачей</p>
            </div>
            <div className="p-6 bg-bg-primary border border-border-custom">
              <p className="text-3xl md:text-4xl font-serif font-bold text-accent">100%</p>
              <p className="text-xs text-text-secondary font-medium mt-1 uppercase tracking-wider font-sans">строгая конфиденциальность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: About Center / Family Systemic Therapy */}
      <section id="about-center" className="scroll-mt-24 py-24 bg-bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-4">
              <HeartHandshake className="w-4 h-4" /> Семейный системный подход
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-text-primary tracking-tight leading-tight mb-6">
              Почему мы называемся FAMILY REHAB?
            </h2>
            <p className="text-text-primary/90 text-sm md:text-base leading-relaxed mb-4">
              Зависимость никогда не развивается в вакууме. Это <strong className="text-accent font-semibold">семейная болезнь</strong>. Когда один из членов семьи страдает алкоголизмом, наркоманией или игроманией, все родственники вовлекаются в деструктивную систему созависимости.
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Обычные клиники изолируют пациента, капают его лекарствами, а после возвращения домой в ту же тревожную атмосферу он неизбежно срывается. Мы действуем иначе.
            </p>
          </div>

          {/* Feature Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-bg-secondary border border-border-custom flex gap-4 hover:border-accent transition-colors">
              <div className="w-9 h-9 bg-accent-light text-accent flex items-center justify-center shrink-0 border border-border-custom text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-text-primary mb-1">Реабилитация всей семьи</h4>
                <p className="text-text-primary/75 text-xs md:text-sm leading-relaxed font-sans">
                  Параллельно проводим закрытые терапевтические сессии и вебинары для созависимых родственников.
                </p>
              </div>
            </div>

            <div className="p-6 bg-bg-secondary border border-border-custom flex gap-4 hover:border-accent transition-colors">
              <div className="w-9 h-9 bg-accent-light text-accent flex items-center justify-center shrink-0 border border-border-custom text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-text-primary mb-1">Исцеление от чувства вины</h4>
                <p className="text-text-primary/75 text-xs md:text-sm leading-relaxed font-sans">
                  Помогаем матерям и супругам избавиться от гиперопеки, научиться ставить границы и снова жить своей жизнью.
                </p>
              </div>
            </div>

            <div className="p-6 bg-bg-secondary border border-border-custom flex gap-4 hover:border-accent transition-colors">
              <div className="w-9 h-9 bg-accent-light text-accent flex items-center justify-center shrink-0 border border-border-custom text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-text-primary mb-1">Разрушение старых триггеров</h4>
                <p className="text-text-primary/75 text-xs md:text-sm leading-relaxed font-sans">
                  Учим семью коммуницировать без обид, претензий и манипуляций — главного топлива для будущих срывов.
                </p>
              </div>
            </div>

            <div className="p-6 bg-bg-secondary border border-border-custom flex gap-4 hover:border-accent transition-colors">
              <div className="w-9 h-9 bg-accent-light text-accent flex items-center justify-center shrink-0 border border-border-custom text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-text-primary mb-1">Бережная социализация</h4>
                <p className="text-text-primary/75 text-xs md:text-sm leading-relaxed font-sans">
                  После выписки мы сопровождаем семью в течение 1 года — даем бережную психологическую поддержку.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              id="about-action"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-secondary hover:bg-bg-primary text-text-primary border border-border-custom hover:border-accent font-bold uppercase tracking-wider py-4 px-8 transition-all cursor-pointer text-xs inline-flex items-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-accent" />
              <span>Узнать больше о семейной программе</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <AdvantagesSection />
      <StagesSection onOpenConsultation={openConsultation} />
      <ServicesSection onOpenConsultation={openConsultation} />

      {/* Program Directions Quick Preview */}
      <section id="programs" className="scroll-mt-24 py-24 bg-bg-secondary border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
              <Award className="w-4 h-4" /> Наши направления
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-4">
              Программы комплексного выздоровления
            </h2>
            <p className="text-text-primary/75 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Мы разработали эффективные специализированные курсы лечения для каждого типа аддикции. Выберите нужное направление.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-bg-primary border border-border-custom p-6 flex flex-col justify-between hover:border-accent transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 bg-accent-light text-accent flex items-center justify-center font-bold text-sm mb-4 border border-border-custom group-hover:bg-accent group-hover:text-bg-primary transition-colors">
                    {prog.id === 'detox' && '⚕'}
                    {prog.id === 'classic' && '✦'}
                    {prog.id === 'comprehensive' && '◈'}
                    {prog.id === 'family' && '♥'}
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-semibold text-text-primary mb-2 leading-tight group-hover:text-accent transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-text-primary/80 text-xs leading-relaxed mb-6 font-sans">
                    {prog.description}
                  </p>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      // Custom function to scroll to calculator and preselect program
                      const el = document.querySelector('#calculator');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Preselect the program in the calculator
                        const event = new CustomEvent('preselectProgram', { detail: prog.id });
                        window.dispatchEvent(event);
                      }
                    }}
                    className="w-full bg-bg-secondary hover:bg-accent border border-border-custom text-text-primary hover:text-bg-primary text-xs font-bold uppercase tracking-wider py-2.5 transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>Рассчитать стоимость</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Licenses */}
      <Certificates />

      {/* Motivation Guide Widget */}
      <MotivationGuide onOpenConsultation={openConsultation} />

      {/* Dynamic Calculator Section */}
      {/* <CalculatorSection onOpenConsultation={openConsultation} /> */}

      {/* Self-Test Section */}
      <TestSection onOpenConsultation={openConsultation} />

      {/* Our Professional Team Grid */}
      <section id="team" className="scroll-mt-24 py-24 bg-bg-secondary border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
                <Users className="w-4 h-4" /> Наша команда
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-4">
                Дипломированные врачи психотерапевты и консультанты
              </h2>
              <p className="text-text-primary/75 max-w-xl text-sm md:text-base leading-relaxed">
                Мы гордимся нашей командой. Каждый специалист — это признанный профессионал с многолетним опытом практической работы в сфере реабилитации.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleTeamScroll('left')}
                disabled={!canScrollTeamLeft}
                aria-label="Предыдущие специалисты"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollTeamLeft
                    ? 'bg-bg-primary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                    : 'bg-bg-primary/50 border-border-custom/50 text-text-secondary/40 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleTeamScroll('right')}
                disabled={!canScrollTeamRight}
                aria-label="Следующие специалисты"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollTeamRight
                    ? 'bg-bg-primary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                    : 'bg-bg-primary/50 border-border-custom/50 text-text-secondary/40 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
              ref={teamScrollRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
            {TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-bg-primary border border-border-custom overflow-hidden hover:border-accent transition-all flex flex-col justify-between w-[260px] sm:w-[280px] shrink-0 snap-start"
              >
                <div>
                  <div className="relative">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-64 object-cover"
                        style={{
                          objectPosition:
                            member.id === "member-4" ? "center 25%" :
                            member.id === "member-5" ? "center 35%" :
                            "center"
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-stone-800 flex items-center justify-center">
                        <User className="w-16 h-16 text-stone-600" strokeWidth={1.5} />
                      </div>
                    )}
                                      
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-wider bg-bg-primary border border-border-custom px-2.5 py-1">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-sm md:text-base text-text-primary">{member.name}</h3>
                    <p className="text-accent text-xs font-semibold mt-0.5 uppercase tracking-wide font-sans">{member.role}</p>
                    <p className="text-text-primary/80 text-[11px] md:text-xs mt-3 leading-normal font-sans">
                      {member.specialty}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-0 border-t border-border-custom">
                  <p className="text-[10px] text-text-secondary leading-normal pt-3 italic font-sans">
                    {member.education}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-text-secondary mb-4 font-sans max-w-md mx-auto leading-normal">
              Все консультанты имеют действующие сертификаты РК. Центр FAMILY REHAB лицензирован для осуществления медицинской и психологической помощи.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover font-serif italic transition-colors"
            >
              Записаться на сессию к ведущему психотерапевту <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials with Audio Player */}
      <ReviewsSection onOpenConsultation={openConsultation} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Emergency Bottom Call-To-Action Banner */}
      <section className="py-20 bg-text-primary text-bg-primary relative overflow-hidden border-t border-border-custom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="relative flex h-3 w-3 mx-auto mb-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-bg-primary mb-4 leading-tight">
            Горячая линия экстренной помощи работает 24/7
          </h2>
          <p className="text-bg-secondary/90 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Если вашему близкому плохо прямо сейчас, или требуется срочный выезд нарколога / психологической помощи на дом — не теряйте время. Звонок полностью анонимен.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:+77762166603"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-bg-primary font-bold py-4.5 px-8 transition-all flex items-center justify-center gap-2 border border-red-600 text-base md:text-lg uppercase tracking-wider"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" /> +7 (776) 216-66-03
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-bg-primary hover:bg-bg-secondary text-text-primary border border-border-custom font-bold py-4 px-6 transition-all cursor-pointer text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
            </a>
          </div>

          <div className="mt-8 flex justify-center items-center gap-6 text-[11px] text-bg-secondary/70 font-mono">
            <span>✓ Без паспорта и документов</span>
            <span>✓ Без спецсигналов</span>
            <span>✓ 100% анонимно</span>
          </div>
        </div>
      </section>

      {/* Official Footnote / Disclaimer (crucial for medical landing pages) */}
      <footer className="bg-bg-secondary border-t border-border-custom py-12 text-xs text-text-secondary font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent flex items-center justify-center text-bg-primary font-bold text-base border border-border-custom rotate-45">
                <span className="-rotate-45">♥</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif font-bold text-text-primary text-sm">FAMILY</span>
                  <span className="bg-accent text-bg-primary text-[10px] font-bold px-1.5 py-0.5 border border-accent">REHAB</span>
                </div>
                <p className="text-[8px] text-text-secondary">Частная наркологическая и психологическая помощь</p>
              </div>
            </div>

            {/* Licences */}
            <div className="text-center md:text-right max-w-md text-text-secondary/95">
              <p className="leading-relaxed">
                Лицензия на осуществление медицинской деятельности № L-18247-RK от 12 декабря 2021 г. выдана Управлением общественного здравоохранения города Алматы.
              </p>
            </div>
          </div>

          {/* Core Warning Badge for Medical landing (Law compliance) */}


          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border-custom text-[11px] text-text-secondary/75">
            <p>© {new Date().getFullYear()} FAMILY REHAB. Все права защищены. Информация на сайте не является публичной офертой.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-text-primary transition-colors">Согласие на обработку данных</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefilledContext={modalContext}
      />

    </div>
  );
}
