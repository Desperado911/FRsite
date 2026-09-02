import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, Star, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, MessageSquare, Mic, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data';
import { ReviewItem } from '../types';

interface ReviewsSectionProps {
  onOpenConsultation: (context?: string) => void;
}

// Audio Player Component for voice reviews
function VoiceMessagePlayer({ audioUrl, durationText }: { audioUrl: string; durationText?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Pause any other playing audio on page
      document.querySelectorAll('audio').forEach((a) => {
        if (a !== audio) a.pause();
      });
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Fake wave amplitudes for visual audio bars
  const waveHeights = [25, 45, 75, 55, 90, 60, 40, 85, 95, 70, 50, 80, 65, 90, 45, 30, 65, 85, 50, 75, 40];

  return (
    <div className="bg-bg-primary border border-accent/30 p-4 mb-4 select-none">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
          <Mic className="w-3.5 h-3.5 animate-pulse" /> Аудиозапись отзыва
        </span>
        <span className="text-[11px] font-mono text-text-secondary">
          {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : durationText || '0:42'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Пауза' : 'Слушать аудиоотзыв'}
          className="w-10 h-10 rounded-full bg-accent text-bg-primary hover:bg-accent-hover flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-bg-primary" /> : <Play className="w-4 h-4 fill-bg-primary ml-0.5" />}
        </button>

        {/* Visual Waveform & Scrubber */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Animated sound wave bars */}
          <div className="flex items-center gap-1 h-6 mb-1 px-1">
            {waveHeights.map((h, i) => {
              const progress = duration > 0 ? currentTime / duration : 0;
              const barProgress = i / waveHeights.length;
              const isPassed = barProgress <= progress;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPassed ? 'bg-accent' : 'bg-border-custom'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (h * (0.6 + Math.sin(currentTime * 8 + i) * 0.4)))}%` : `${h}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Timeline scrub input */}
          <input
            type="range"
            min={0}
            max={duration || 42}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1 bg-border-custom rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        {/* Volume Button */}
        <button
          onClick={toggleMute}
          className="text-text-secondary hover:text-text-primary p-1.5 transition-colors cursor-pointer shrink-0"
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ReviewsSection({ onOpenConsultation }: ReviewsSectionProps) {
  const [filter, setFilter] = useState<'ALL' | 'AUDIO' | 'TEXT'>('ALL');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredReviews = REVIEWS.filter((item) => {
    if (filter === 'AUDIO') return !!item.audioUrl;
    if (filter === 'TEXT') return !item.audioUrl;
    return true;
  });

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [filteredReviews]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="reviews" className="scroll-mt-24 py-24 bg-bg-primary border-t border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
              <HeartHandshake className="w-4 h-4" /> Истории побед и благодарности
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-3">
              Искренние отзывы спасенных семей
            </h2>
            <p className="text-text-primary/75 max-w-xl text-sm leading-relaxed">
              Реальные аудиозаписи и письма родственников пациентов, прошедших программу реабилитации в центре FAMILY REHAB.
            </p>
          </div>

          {/* Filter Tabs & Scroll Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center bg-bg-secondary border border-border-custom p-1">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === 'ALL'
                    ? 'bg-accent text-bg-primary font-bold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Все ({REVIEWS.length})
              </button>
              <button
                onClick={() => setFilter('AUDIO')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                  filter === 'AUDIO'
                    ? 'bg-accent text-bg-primary font-bold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Mic className="w-3.5 h-3.5" /> Аудио ({REVIEWS.filter((r) => !!r.audioUrl).length})
              </button>
              <button
                onClick={() => setFilter('TEXT')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                  filter === 'TEXT'
                    ? 'bg-accent text-bg-primary font-bold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> Текст ({REVIEWS.filter((r) => !r.audioUrl).length})
              </button>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Предыдущие отзывы"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-bg-secondary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                    : 'bg-bg-secondary/40 border-border-custom/40 text-text-secondary/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Следующие отзывы"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-bg-secondary border-border-custom text-text-primary hover:border-accent hover:text-accent'
                    : 'bg-bg-secondary/40 border-border-custom/40 text-text-secondary/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Horizontal Scroll Track */}
        <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            {filteredReviews.map((review) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                key={review.id}
                className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 snap-start bg-bg-secondary border border-border-custom p-6 md:p-7 flex flex-col justify-between hover:border-accent transition-all group"
              >
                <div>
                  {/* Header: Author + Sobriety Badge */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                      <h4 className="font-serif font-semibold text-text-primary text-base md:text-lg leading-snug group-hover:text-accent transition-colors">
                        {review.author}
                      </h4>
                      <p className="text-text-secondary text-xs font-sans mt-0.5">{review.relation}</p>
                    </div>
                    <span className="text-[10px] text-accent font-mono font-bold bg-bg-primary px-2.5 py-1 border border-border-custom shrink-0">
                      {review.recoveredPeriod}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-accent">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>

                  {/* Optional Voice Player */}
                  {review.audioUrl && (
                    <VoiceMessagePlayer audioUrl={review.audioUrl} durationText={review.audioDuration} />
                  )}

                  {/* Review Text */}
                  <p className="text-text-primary/90 text-xs md:text-sm leading-relaxed font-sans italic whitespace-pre-line mb-6">
                    «{review.text}»
                  </p>
                </div>

                {/* Footer Date & Status */}
                <div className="flex items-center justify-between text-[11px] text-text-secondary font-mono border-t border-border-custom pt-4 mt-auto">
                  <span className="flex items-center gap-1 text-accent">
                    <ShieldCheck className="w-3.5 h-3.5" /> Проверенный отзыв
                  </span>
                  <span>{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-bg-secondary border border-border-custom p-6 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-serif font-semibold text-text-primary text-base md:text-lg">
              Ваша семья тоже может вернуться к здоровой жизни
            </h4>
            <p className="text-xs md:text-sm text-text-secondary mt-1 leading-normal font-sans">
              Первый шаг — самый трудный, но мы пройдем его вместе. Звонок и консультация полностью анонимны.
            </p>
          </div>
          <a
            href={'https://wa.me/77762166603?text=' + encodeURIComponent('Здравствуйте! Пишу с сайта Family Rehab, хочу восстановить семью.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-hover text-bg-primary text-xs font-bold uppercase tracking-wider py-3.5 px-6 transition-all cursor-pointer shrink-0 border border-accent hover:border-accent-hover inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Хочу восстановить семью
          </a>
        </div>

      </div>
    </section>
  );
}
