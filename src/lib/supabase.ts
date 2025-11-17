import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birth_date: string;
  address: string;
  plan: 'Gratuito' | 'Premium' | 'VIP';
  member_since: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  text: string;
  sender: 'user' | 'bot';
  created_at: string;
}

export interface Checklist {
  id: string;
  user_id: string;
  title: string;
  description: string;
  steps: ChecklistStep[];
  completed: boolean;
  created_at: string;
}

export interface ChecklistStep {
  id: string;
  text: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  user_id: string;
  text: string;
  icon: string;
  created_at: string;
}
