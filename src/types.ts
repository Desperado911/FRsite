export interface TestQuestion {
  id: number;
  text: string;
  type: 'addiction' | 'codependency';
  answers: {
    text: string;
    score: number;
  }[];
}

export interface TestResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  recommendation: string;
}

export interface ProgramType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
}

export interface RoomType {
  id: string;
  name: string;
  priceMultiplier: number;
  description: string;
  amenities: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  education: string;
  photoUrl: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface ReviewItem {
  id: number;
  author: string;
  relation: string; // e.g., "Мама выпускника", "Жена пациента"
  rating: number;
  text: string;
  date: string;
  recoveredPeriod: string; // e.g., "Трезвость: 2 года"
  audioUrl?: string;
  audioDuration?: string;
}

export type AdvantageIconKey = 'steps' | 'comfort' | 'homeVisit' | 'team';

export interface AdvantageItem {
  id: string;
  icon: AdvantageIconKey;
  title: string;
  description: string;
}

export interface RehabStage {
  id: string;
  number: string;
  title: string;
  description: string;
  buttonLabel: string;
  consultationContext: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
}
