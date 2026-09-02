import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, ZoomIn, Award, ChevronLeft, ChevronRight } from 'lucide-react';

import licenseImg from '../assets/certificates/certificate-license.png';
import appendixImg from '../assets/certificates/certificate-appendix.png';
import appendix001KzImg from '../assets/certificates/certificate-appendix-001-kz.png';
import appendix002Img from '../assets/certificates/certificate-appendix-002.png';
import appendix002KzImg from '../assets/certificates/certificate-appendix-002-kz.png';
import appendix003Img from '../assets/certificates/certificate-appendix-003.png';
import appendix003KzImg from '../assets/certificates/certificate-appendix-003-kz.png';

interface Certificate {
    id: string;
    title: string;
    subtitle: string;
    lang: 'RU' | 'KZ';
    image: string;
}

const certificates: Certificate[] = [
    {
        id: '1',
        title: 'Медицинская лицензия',
        subtitle: '№ 25035506 от 23.10.2025 (Основной бланк)',
        lang: 'RU',
        image: licenseImg,
    },
    {
        id: '2',
        title: 'Приложение № 001',
        subtitle: 'Консультативно-диагностическая помощь: психиатрия, психотерапия',
        lang: 'RU',
        image: appendixImg,
    },
    {
        id: '3',
        title: 'Лицензияға қосымша № 001',
        subtitle: 'Амбулаториялық емханалық көмек: психиатрия, психотерапия',
        lang: 'KZ',
        image: appendix001KzImg,
    },
    {
        id: '4',
        title: 'Приложение № 002',
        subtitle: 'Амбулаторная помощь: доврачебная помощь, психиатрия, наркология',
        lang: 'RU',
        image: appendix002Img,
    },
    {
        id: '5',
        title: 'Лицензияға қосымша № 002',
        subtitle: 'Амбулаториялық емханалық көмек: дәрігерге дейінгі, психиатрия, наркология',
        lang: 'KZ',
        image: appendix002KzImg,
    },
    {
        id: '6',
        title: 'Приложение № 003',
        subtitle: 'Стационарная помощь: наркология, психиатрия, психотерапия',
        lang: 'RU',
        image: appendix003Img,
    },
    {
        id: '7',
        title: 'Лицензияға қосымша № 003',
        subtitle: 'Ересек тұрғындарға стационарлық көмек: психиатрия, психотерапия, наркология',
        lang: 'KZ',
        image: appendix003KzImg,
    },
];

export default function Certificates() {
    const [selected, setSelected] = useState<Certificate | null>(null);
    const [activeLang, setActiveLang] = useState<'ALL' | 'RU' | 'KZ'>('ALL');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const filteredCertificates = certificates.filter((cert) => {
        if (activeLang === 'ALL') return true;
        return cert.lang === activeLang;
    });

    const ruCount = certificates.filter((c) => c.lang === 'RU').length;
    const kzCount = certificates.filter((c) => c.lang === 'KZ').length;

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const el = scrollContainerRef.current;
        if (el) {
            el.addEventListener('scroll', checkScrollButtons);
            return () => el.removeEventListener('scroll', checkScrollButtons);
        }
    }, [filteredCertificates]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="certificates" className="scroll-mt-24 py-16 bg-bg-secondary border-t border-border-custom">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
                            <Award className="w-4 h-4" /> Документы и лицензии
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-2">
                            Работаем официально
                        </h2>
                        <p className="text-text-primary/75 max-w-xl text-sm leading-relaxed">
                            Государственная генеральная медицинская лицензия и официальные приложения Министерства здравоохранения РК
                        </p>
                    </div>

                    {/* Controls: Filter Tabs & Scroll Arrows */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center bg-bg-primary border border-border-custom p-1">
                            <button
                                onClick={() => setActiveLang('ALL')}
                                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                    activeLang === 'ALL'
                                        ? 'bg-accent text-bg-primary font-bold shadow-xs'
                                        : 'text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                Все ({certificates.length})
                            </button>
                            <button
                                onClick={() => setActiveLang('RU')}
                                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                    activeLang === 'RU'
                                        ? 'bg-accent text-bg-primary font-bold shadow-xs'
                                        : 'text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                РУС ({ruCount})
                            </button>
                            <button
                                onClick={() => setActiveLang('KZ')}
                                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                    activeLang === 'KZ'
                                        ? 'bg-accent text-bg-primary font-bold shadow-xs'
                                        : 'text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                ҚАЗ ({kzCount})
                            </button>
                        </div>

                        {/* Arrow Nav */}
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => handleScroll('left')}
                                disabled={!canScrollLeft}
                                aria-label="Предыдущие документы"
                                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                                    canScrollLeft
                                        ? 'bg-bg-primary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                                        : 'bg-bg-primary/50 border-border-custom/50 text-text-secondary/40 cursor-not-allowed'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleScroll('right')}
                                disabled={!canScrollRight}
                                aria-label="Следующие документы"
                                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                                    canScrollRight
                                        ? 'bg-bg-primary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                                        : 'bg-bg-primary/50 border-border-custom/50 text-text-secondary/40 cursor-not-allowed'
                                }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
                        style={{ scrollbarWidth: 'thin' }}
                    >
                        {filteredCertificates.map((cert) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                key={cert.id}
                                onClick={() => setSelected(cert)}
                                className="group text-left bg-bg-primary border border-border-custom overflow-hidden hover:border-accent transition-all flex flex-col justify-between cursor-pointer w-[240px] sm:w-[260px] md:w-[280px] shrink-0 snap-start shadow-xs hover:shadow-md"
                            >
                                <div className="relative aspect-[3/4] bg-white overflow-hidden">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2.5 right-2.5 bg-bg-primary/95 backdrop-blur-xs text-text-primary text-[10px] font-mono font-bold px-2 py-0.5 border border-border-custom tracking-wider">
                                        {cert.lang === 'KZ' ? 'ҚАЗ' : 'РУС'}
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <div className="p-3.5 flex items-start gap-2 border-t border-border-custom flex-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-text-primary text-xs sm:text-sm font-semibold font-serif leading-snug">{cert.title}</div>
                                        <div className="text-text-secondary text-[10px] sm:text-[11px] mt-0.5 font-sans leading-relaxed">{cert.subtitle}</div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-xl w-full max-h-[88vh] overflow-y-auto bg-bg-primary border border-border-custom p-4 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-custom">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-serif font-semibold text-text-primary text-base">{selected.title}</h3>
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-accent-light text-accent border border-border-custom">
                                            {selected.lang === 'KZ' ? 'ҚАЗ' : 'РУС'}
                                        </span>
                                    </div>
                                    <p className="text-text-secondary text-xs mt-0.5">{selected.subtitle}</p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-sm hover:bg-bg-secondary border border-border-custom cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full h-auto border border-border-custom"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}