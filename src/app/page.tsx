'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, MessageCircle, CheckSquare, Shield, ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const [audioEnabled, setAudioEnabled] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      speak('Áudio ativado. Agora você pode ouvir os textos do aplicativo.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#FFD700]" />
            </div>
            <span className="text-[#003366] font-bold text-xl">INSS Fácil</span>
          </div>
          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-lg transition-all ${
              audioEnabled 
                ? 'bg-[#003366] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Ativar/Desativar áudio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Section Minimalista */}
      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center py-16 md:py-24">
          <h1 
            className="text-5xl md:text-6xl font-bold text-[#003366] mb-6"
            onMouseEnter={() => speak('INSS Fácil')}
          >
            INSS Fácil
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
            onMouseEnter={() => speak('Seus benefícios do INSS de forma simples e rápida')}
          >
            Seus benefícios do INSS de forma<br />
            <span className="text-[#003366] font-semibold">simples e rápida</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-20">
            <button
              onClick={() => {
                speak('Abrindo cadastro');
                router.push('/auth?mode=register');
              }}
              className="flex-1 bg-[#003366] text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-[#004488] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Começar
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                speak('Abrindo login');
                router.push('/auth?mode=login');
              }}
              className="flex-1 bg-white text-[#003366] border-2 border-[#003366] py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Entrar
            </button>
          </div>
        </div>

        {/* Features Minimalistas */}
        <div className="max-w-5xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => speak('Tire suas dúvidas rapidamente')}
            >
              <div className="w-14 h-14 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003366] mb-2">Tire Dúvidas</h3>
              <p className="text-gray-600">Respostas rápidas sobre seus benefícios</p>
            </div>

            <div
              className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => speak('Siga o passo a passo')}
            >
              <div className="w-14 h-14 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-7 h-7 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003366] mb-2">Passo a Passo</h3>
              <p className="text-gray-600">Guias simples para cada tipo de benefício</p>
            </div>

            <div
              className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => speak('Seguro e confiável')}
            >
              <div className="w-14 h-14 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold text-[#003366] mb-2">Seguro</h3>
              <p className="text-gray-600">Seus dados protegidos e privados</p>
            </div>
          </div>
        </div>

        {/* Stats Minimalistas */}
        <div className="max-w-4xl mx-auto pb-20">
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#003366] mb-1">10mil+</div>
                <p className="text-gray-600">Usuários</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#003366] mb-1">50mil+</div>
                <p className="text-gray-600">Dúvidas Respondidas</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#003366] mb-1">98%</div>
                <p className="text-gray-600">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Minimalista */}
        <div className="max-w-3xl mx-auto text-center pb-20">
          <div className="bg-[#003366] rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Cadastre-se gratuitamente agora
            </p>
            <button
              onClick={() => {
                speak('Criando conta');
                router.push('/auth?mode=register');
              }}
              className="bg-[#FFD700] text-[#003366] py-4 px-10 rounded-xl text-lg font-semibold hover:bg-[#FFC700] transition-all duration-200 inline-flex items-center gap-2"
            >
              Criar Conta Gratuita
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Indicator */}
        {audioEnabled && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#003366] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg z-50">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Áudio Ativo</span>
          </div>
        )}
      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-1">Facilitando o acesso aos seus direitos</p>
          <p className="text-[#003366] font-semibold text-sm">Simples • Rápido • Seguro</p>
        </div>
      </footer>
    </div>
  );
}
