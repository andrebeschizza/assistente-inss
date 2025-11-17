'use client';

import { useState } from 'react';
import { Stethoscope, Pill, Calendar, Phone, Clock, Volume2, Video, MessageCircle } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  available: boolean;
  color: string;
}

export default function ServicesPage() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const services: Service[] = [
    {
      id: 'telemedicine',
      title: 'Telemedicina',
      description: 'Consultas online com clínicos gerais',
      icon: Video,
      available: true,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'pharmacy',
      title: 'Farmácia Popular',
      description: 'Descontos de até 80% em medicamentos',
      icon: Pill,
      available: true,
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'appointments',
      title: 'Agendamentos',
      description: 'Agende perícias e consultas prioritárias',
      icon: Calendar,
      available: true,
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'lawyer',
      title: 'Advogado Previdenciário',
      description: 'Consultas com especialistas em INSS',
      icon: MessageCircle,
      available: true,
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'emergency',
      title: 'Linha Direta',
      description: 'Suporte 24/7 para emergências',
      icon: Phone,
      available: true,
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'reminders',
      title: 'Lembretes',
      description: 'Notificações de prazos importantes',
      icon: Clock,
      available: true,
      color: 'from-yellow-500 to-yellow-700'
    }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] p-4 pb-20">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-2xl font-bold text-white">Serviços Premium</h1>
            <p className="text-white/80">Exclusivo para assinantes</p>
          </div>
        </div>
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
      </header>

      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-3xl p-8 mb-8 text-center shadow-2xl">
        <div className="text-6xl mb-4">⭐</div>
        <h2 className="text-3xl font-bold text-[#003366] mb-2">Você é Premium!</h2>
        <p className="text-[#003366]/80 text-lg">
          Aproveite todos os benefícios exclusivos do seu plano
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => speak(service.title)}
              onClick={() => speak(`Abrindo ${service.title}`)}
            >
              <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/90">{service.description}</p>
              </div>
              <div className="p-6">
                {service.available ? (
                  <button className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0055AA] transition-all">
                    Acessar Agora
                  </button>
                ) : (
                  <button className="w-full bg-gray-200 text-gray-500 py-4 rounded-2xl font-bold text-lg cursor-not-allowed">
                    Em Breve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Como Funciona?
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0 text-[#003366] font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Escolha o Serviço</h3>
              <p className="text-white/80">Selecione o serviço que você precisa na lista acima</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0 text-[#003366] font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Agende ou Use Imediatamente</h3>
              <p className="text-white/80">Alguns serviços são instantâneos, outros precisam de agendamento</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0 text-[#003366] font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Aproveite o Benefício</h3>
              <p className="text-white/80">Receba atendimento de qualidade sem sair de casa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="text-5xl font-bold text-[#FFD700] mb-2">24/7</div>
          <p className="text-white">Suporte Disponível</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="text-5xl font-bold text-[#FFD700] mb-2">80%</div>
          <p className="text-white">Desconto em Medicamentos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="text-5xl font-bold text-[#FFD700] mb-2">100+</div>
          <p className="text-white">Especialistas Disponíveis</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl p-8 text-center max-w-4xl mx-auto shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Não é assinante ainda?
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Assine agora e tenha acesso a todos esses benefícios exclusivos
        </p>
        <button className="bg-[#FFD700] text-[#003366] px-12 py-4 rounded-2xl font-bold text-xl hover:bg-white transition-all shadow-xl">
          Ver Planos
        </button>
      </div>
    </div>
  );
}
