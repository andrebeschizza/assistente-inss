'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, Phone, Eye, EyeOff, Volume2 } from 'lucide-react';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        speak('As senhas não coincidem');
        alert('As senhas não coincidem!');
        return;
      }
    }

    speak('Login realizado com sucesso');
    // Simular login bem-sucedido
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center p-4">
      {/* Audio Toggle */}
      <button
        onClick={() => {
          setAudioEnabled(!audioEnabled);
          speak(audioEnabled ? 'Áudio desativado' : 'Áudio ativado');
        }}
        className={`fixed top-4 right-4 p-4 rounded-full transition-all z-50 ${
          audioEnabled ? 'bg-[#FFD700] text-[#003366]' : 'bg-white/20 text-white'
        }`}
      >
        <Volume2 className="w-6 h-6" />
      </button>

      {/* Auth Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0055AA] p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-[#003366]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Bem-vindo!' : 'Criar Conta'}
          </h1>
          <p className="text-white/80">
            {mode === 'login' 
              ? 'Entre para acessar seus benefícios' 
              : 'Cadastre-se e comece agora'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name (only for register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  placeholder="João da Silva"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {/* Phone (only for register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  placeholder="(11) 98765-4321"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (only for register) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#003366] to-[#0055AA] text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                speak(mode === 'login' ? 'Modo de cadastro' : 'Modo de login');
              }}
              className="text-[#003366] hover:text-[#0055AA] font-semibold"
            >
              {mode === 'login' 
                ? 'Não tem conta? Cadastre-se' 
                : 'Já tem conta? Faça login'}
            </button>
          </div>

          {/* Forgot Password (only for login) */}
          {mode === 'login' && (
            <div className="text-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
