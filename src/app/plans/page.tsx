'use client';

import { useState } from 'react';
import { Check, Crown, Sparkles, Volume2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export default function PlansPage() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Ideal para começar',
      color: 'from-gray-400 to-gray-600',
      features: [
        'Chat com perguntas frequentes',
        'Checklists básicos',
        'Acesso a vídeos educativos',
        'Informações sobre benefícios',
        'Suporte por email'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Mais recursos e suporte',
      popular: true,
      color: 'from-[#FFD700] to-[#FFA500]',
      features: [
        'Tudo do plano Gratuito',
        'Chat prioritário com especialistas',
        'Checklists avançados personalizados',
        'Lembretes de prazos importantes',
        'Calculadora de benefícios',
        'Suporte por WhatsApp',
        'Acesso a webinars exclusivos',
        'Sem anúncios'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'Atendimento completo',
      color: 'from-purple-500 to-purple-700',
      features: [
        'Tudo do plano Premium',
        'Consulta online com advogado previdenciário',
        'Análise personalizada do seu caso',
        'Acompanhamento de processos',
        'Descontos em medicamentos (até 80%)',
        'Telemedicina com clínico geral',
        'Agendamento prioritário de perícias',
        'Assistente pessoal dedicado',
        'Relatórios mensais personalizados'
      ]
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

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    speak(`Plano ${plan?.name} selecionado. Clique em assinar para continuar.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] p-4 pb-20">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-2xl font-bold text-white">Planos</h1>
            <p className="text-white/80">Escolha o melhor para você</p>
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
              selectedPlan === plan.id ? 'ring-4 ring-[#FFD700] scale-105' : 'hover:scale-105'
            }`}
            onMouseEnter={() => speak(plan.name)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-4 right-4 bg-[#FFD700] text-[#003366] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm shadow-lg">
                <Sparkles className="w-4 h-4" />
                MAIS POPULAR
              </div>
            )}

            {/* Plan Header */}
            <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/90 mb-4">{plan.description}</p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-xl mb-2">{plan.period}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                  plan.id === 'free'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : `bg-gradient-to-r ${plan.color} text-white hover:shadow-2xl hover:scale-105`
                }`}
              >
                {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Por que assinar um plano?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Suporte Especializado</h3>
            <p className="text-white/80">Tire dúvidas com especialistas em previdência</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Agilidade</h3>
            <p className="text-white/80">Resolva seus problemas mais rápido</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">💰</div>
            <h3 className="text-lg font-bold text-white mb-2">Economia</h3>
            <p className="text-white/80">Descontos em medicamentos e serviços</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Posso cancelar a qualquer momento?</h3>
            <p className="text-white/80">Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Como funciona o período de teste?</h3>
            <p className="text-white/80">Oferecemos 7 dias grátis em todos os planos pagos. Cancele antes e não será cobrado.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Posso mudar de plano depois?</h3>
            <p className="text-white/80">Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
