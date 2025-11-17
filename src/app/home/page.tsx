'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Volume2, 
  MessageCircle, 
  CheckSquare, 
  Info, 
  Crown, 
  User,
  LogOut,
  Shield,
  Youtube
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth?mode=login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLogout = () => {
    speak('Saindo da conta');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#003366] flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  // Redirecionar admin para painel administrativo
  if (user.isAdmin) {
    router.push('/admin');
    return null;
  }

  const menuItems = [
    {
      icon: MessageCircle,
      title: 'Perguntas e Respostas',
      description: 'Tire suas dúvidas sobre benefícios',
      color: 'bg-blue-500',
      route: '/chat',
      audio: 'Perguntas e respostas sobre benefícios do INSS'
    },
    {
      icon: Youtube,
      title: 'Conteúdos do Canal',
      description: 'Vídeos educativos sobre INSS',
      color: 'bg-red-600',
      route: '/videos',
      audio: 'Conteúdos do canal do YouTube'
    },
    {
      icon: CheckSquare,
      title: 'Checklists',
      description: 'Guias passo a passo',
      color: 'bg-green-500',
      route: '/checklists',
      audio: 'Checklists com guias passo a passo'
    },
    {
      icon: Info,
      title: 'Informações Úteis',
      description: 'Saúde, transporte e direitos',
      color: 'bg-purple-500',
      route: '/info',
      audio: 'Informações úteis sobre saúde, transporte e direitos'
    },
    {
      icon: Crown,
      title: 'Planos Premium',
      description: 'Serviços exclusivos',
      color: 'bg-[#FFD700]',
      route: '/plans',
      audio: 'Planos premium com serviços exclusivos'
    },
    {
      icon: User,
      title: 'Meu Perfil',
      description: 'Seus dados e configurações',
      color: 'bg-gray-600',
      route: '/profile',
      audio: 'Meu perfil e configurações'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 
              className="text-2xl md:text-3xl font-bold text-white"
              onMouseEnter={() => speak('Assistente INSS')}
            >
              Assistente INSS
            </h1>
            <p 
              className="text-[#FFD700] text-sm md:text-base"
              onMouseEnter={() => speak(`Bem-vindo, ${user.name || user.email}`)}
            >
              Olá, {user.name || user.email}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                if (!audioEnabled) speak('Áudio ativado');
              }}
              className={`p-3 rounded-full transition-all ${
                audioEnabled ? 'bg-[#FFD700] text-[#003366]' : 'bg-white/20 text-white'
              }`}
              aria-label="Ativar/Desativar áudio"
            >
              <Volume2 className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleLogout}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-red-500 transition-all"
              onMouseEnter={() => speak('Sair')}
              aria-label="Sair"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Mensagem de Boas-vindas */}
        <div 
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-8 border border-white/20"
          onMouseEnter={() => speak('Bem-vindo ao seu assistente digital do INSS. Escolha uma opção abaixo para começar.')}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Bem-vindo ao seu Assistente Digital! 👋
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Escolha uma opção abaixo para começar:
          </p>
        </div>

        {/* Menu de Opções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                speak(`Abrindo ${item.title}`);
                router.push(item.route);
              }}
              onMouseEnter={() => speak(item.audio)}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl hover:scale-105 transition-all duration-300 text-left group"
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-base md:text-lg">
                {item.description}
              </p>
              
              <div className="mt-4 text-[#003366] font-semibold flex items-center gap-2">
                Acessar
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Banner Premium (se usuário for free) */}
        {(!user.plan || user.plan === 'free') && (
          <div 
            className="mt-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-3xl p-6 md:p-8 shadow-2xl"
            onMouseEnter={() => speak('Desbloqueie recursos premium: consultas médicas online, descontos em medicamentos e lembretes personalizados')}
          >
            <div className="flex items-start gap-4">
              <Crown className="w-12 h-12 text-[#003366] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">
                  Desbloqueie Recursos Premium
                </h3>
                <p className="text-[#003366]/80 text-lg mb-4">
                  Consultas médicas online, descontos em medicamentos e lembretes personalizados
                </p>
                <button
                  onClick={() => router.push('/plans')}
                  className="bg-[#003366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#004488] transition-colors"
                >
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Indicador de Áudio */}
        {audioEnabled && (
          <div className="mt-8 bg-[#FFD700] text-[#003366] px-6 py-4 rounded-full text-center shadow-lg">
            <Volume2 className="inline w-5 h-5 mr-2" />
            <span className="font-semibold text-lg">
              Áudio Ativado - Passe o mouse sobre os cards
            </span>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-white/60">
        <p>Assistente INSS Digital - Facilitando o acesso aos seus direitos</p>
      </footer>
    </div>
  );
}
