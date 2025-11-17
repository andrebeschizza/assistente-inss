'use client';

import { useEffect, useState } from 'react';
import { supabase, type User } from '@/lib/supabase';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Por enquanto, vamos usar um usuário mock
      // Em produção, isso viria da autenticação
      const mockUser: User = {
        id: '1',
        name: 'João da Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        birth_date: '15/03/1958',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        plan: 'Premium',
        member_since: '2024-01-01',
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (data) setUser(data);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, error };
    }
  };

  return { user, loading, updateUser };
}
