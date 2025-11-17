// Tipos do Sistema de Assistente INSS

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  city?: string;
  hasBenefit: boolean;
  chronicDiseases?: string[];
  plan: 'free' | 'premium' | 'daily';
  isAdmin: boolean;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: ChecklistStep[];
}

export interface ChecklistStep {
  id: string;
  checklistId: string;
  order: number;
  title: string;
  description: string;
  completed?: boolean;
}

export interface InfoContent {
  id: string;
  title: string;
  category: 'saude' | 'transporte' | 'direitos';
  content: string;
  icon: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: 'free' | 'premium' | 'daily';
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description: string;
  dateTime: Date;
  type: 'medication' | 'appointment' | 'document' | 'other';
  completed: boolean;
}

export interface Consultation {
  id: string;
  userId: string;
  specialty: string;
  preferredDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Discount {
  id: string;
  pharmacy: string;
  description: string;
  discountPercentage: number;
  code?: string;
  instructions: string;
}

export interface ChatHistory {
  id: string;
  userId: string;
  question: string;
  answer: string;
  timestamp: Date;
}
