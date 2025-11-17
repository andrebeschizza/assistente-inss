'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  MessageCircle, 
  FileText, 
  Crown, 
  User, 
  Stethoscope,
  Video,
  LogOut,
  Menu,
  X,
  Volume2
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { useActivities } from '@/hooks/useActivities';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const { activities } = useActivities(user?.id || '1');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const menuItems = [
    { icon: MessageCircle, label: 'Chat', path: '/chat', color: 'from-blue-500 to-blue-700' },
    { icon: FileText, label: 'Checklists', path: '/checklists', color: 'from-green-500 to-green-700' },
    { icon: Crown, label: 'Planos', path: '/plans', color: 'from-yellow-500 to-yellow-700' },
    { icon: Stethoscope, label: 'Serviços', path: '/services', color: 'from-purple-500 to-purple-700' },
    { icon: Video, label: 'Vídeos', path: '/videos', color: 'from-red-500 to-red-700' },
    { icon: User, label: 'Perfil', path: '/profile', color: 'from-gray-500 to-gray-700' }
  ];

  const quickStats = [
    { label: 'Checklists Completos', value: '3/4', icon: '✅', color: 'bg-green-500' },
    { label: 'Mensagens Não Lidas', value: '2', icon: '💬', color: 'bg-blue-500' },
    { label: 'Dias até Perícia', value: '15', icon: '📅', color: 'bg-orange-500' },
    { label: 'Plano Atual', value: user?.plan || 'Gratuito', icon: '⭐', color: 'bg-yellow-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Home className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-white/80">Bem-vindo de volta!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAudioEnabled(!audioEnabled);
              speak(audioEnabled ? 'Áudio desativado' : 'Áudio ativado');
            }}
            className={`p-3 rounded-full transition-all ${
              audioEnabled ? 'bg-[#FFD700] text-[#003366]' : 'bg-white/20 text-white'
            }`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              speak('Saindo da conta');
              router.push('/');
            }}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/10 backdrop-blur-sm p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  speak(item.label);
                  router.push(item.path);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all"
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 pb-20 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-3xl p-8 mb-6 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-[#003366] mb-2">
            Olá, {user?.name || 'Usuário'}! 👋
          </h2>
          <p className="text-[#003366]/80 text-lg">
            Você tem 2 novas notificações e 1 checklist pendente
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-all cursor-pointer"
              onMouseEnter={() => speak(stat.label)}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl mb-3`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-[#003366] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  speak(item.label);
                  router.push(item.path);
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-all"
                onMouseEnter={() => speak(item.label)}
              >
                <div className={`bg-gradient-to-r ${item.color} p-8 text-white`}>
                  <Icon className="w-12 h-12 mb-3" />
                  <h3 className="text-xl font-bold">{item.label}</h3>
                </div>
                <div className="p-4 bg-gray-50">
                  <span className="text-[#003366] font-semibold">Acessar →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-[#003366] mb-6">Atividade Recente</h3>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer"
                  onMouseEnter={() => speak(activity.text)}
                >
                  <div className="text-3xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-[#003366] font-semibold">{activity.text}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Nenhuma atividade recente</p>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Precisa de Ajuda?
          </h3>
          <p className="text-white/90 mb-6">
            Nossa equipe está pronta para te atender
          </p>
          <button
            onClick={() => {
              speak('Abrindo chat de suporte');
              router.push('/chat');
            }}
            className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#FFD700] hover:text-[#003366] transition-all shadow-xl"
          >
            Falar com Suporte
          </button>
        </div>
      </main>
    </div>
  );
}
