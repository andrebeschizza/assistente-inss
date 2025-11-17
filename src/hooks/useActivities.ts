'use client';

import { useState, useEffect } from 'react';
import { supabase, type Activity } from '@/lib/supabase';

export function useActivities(userId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadActivities();
    }
  }, [userId]);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setActivities(data);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    } finally {
      setLoading(false);
    }
  };

  const addActivity = async (text: string, icon: string) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert({
          user_id: userId,
          text,
          icon
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setActivities((prev) => [data, ...prev].slice(0, 10));
      }
      return { success: true };
    } catch (error) {
      console.error('Erro ao adicionar atividade:', error);
      return { success: false, error };
    }
  };

  return { activities, loading, addActivity };
}
