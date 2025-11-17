'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Mic, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_DATABASE = [
  {
    keywords: ['aposentadoria', 'aposentar', 'idade', 'tempo'],
    response: 'Para se aposentar por idade, você precisa ter 65 anos (homens) ou 62 anos (mulheres) e pelo menos 15 anos de contribuição. Para aposentadoria por tempo de contribuição, são necessários 35 anos (homens) ou 30 anos (mulheres).'
  },
  {
    keywords: ['auxílio', 'doença', 'afastamento', 'doente'],
    response: 'O auxílio-doença é concedido quando você fica temporariamente incapaz para o trabalho por mais de 15 dias. Você precisa ter pelo menos 12 meses de contribuição e passar por perícia médica do INSS.'
  },
  {
    keywords: ['bpc', 'loas', 'idoso', 'deficiente'],
    response: 'O BPC/LOAS é um benefício de 1 salário mínimo para idosos com 65 anos ou mais e pessoas com deficiência de qualquer idade. A renda familiar per capita deve ser inferior a 1/4 do salário mínimo.'
  },
  {
    keywords: ['pensão', 'morte', 'falecimento', 'dependente'],
    response: 'A pensão por morte é paga aos dependentes do segurado que faleceu. Os dependentes incluem cônjuge, filhos menores de 21 anos ou inválidos, e pais que dependiam economicamente do segurado.'
  },
  {
    keywords: ['salário', 'maternidade', 'gestante', 'bebê'],
    response: 'O salário-maternidade é pago por 120 dias para gestantes. Trabalhadoras com carteira assinada não precisam de carência. Contribuintes individuais e facultativas precisam de 10 meses de contribuição.'
  },
  {
    keywords: ['meu inss', 'app', 'aplicativo', 'celular'],
    response: 'O aplicativo Meu INSS permite agendar perícias, consultar benefícios, emitir extratos e fazer diversos serviços online. Baixe na Play Store ou App Store e faça login com sua conta gov.br.'
  },
  {
    keywords: ['perícia', 'médica', 'exame', 'agendar'],
    response: 'Para agendar perícia médica, acesse o Meu INSS (app ou site), escolha "Agendar Perícia" e selecione data e local. Leve todos os documentos médicos e exames que comprovem sua condição.'
  },
  {
    keywords: ['contribuição', 'pagar', 'carnê', 'gps'],
    response: 'Para contribuir como autônomo, gere a GPS (Guia da Previdência Social) no site da Receita Federal ou app Meu INSS. O código é 1007 (20% sobre o salário) ou 1163 (11% - plano simplificado).'
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente virtual do INSS. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const findResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const faq of FAQ_DATABASE) {
      if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return faq.response;
      }
    }
    
    return 'Desculpe, não encontrei uma resposta específica para sua pergunta. Você pode reformular ou entrar em contato com o INSS pelo telefone 135 para mais informações.';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = findResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      speak(botResponse);
    }, 1000);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Seu navegador não suporta reconhecimento de voz.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-xl font-bold text-white">Chat INSS</h1>
            <p className="text-sm text-white/80">Tire suas dúvidas</p>
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' ? 'bg-[#FFD700]' : 'bg-white'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-6 h-6 text-[#003366]" />
              ) : (
                <Bot className="w-6 h-6 text-[#003366]" />
              )}
            </div>
            <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`p-4 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-[#FFD700] text-[#003366]' 
                  : 'bg-white text-[#003366]'
              }`}>
                <p className="text-base leading-relaxed">{message.text}</p>
              </div>
              <span className="text-xs text-white/60 px-2">
                {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/10 backdrop-blur-sm p-4">
        <div className="flex gap-2 items-center">
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-4 rounded-full transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Mic className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-white/20 text-white placeholder-white/60 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#FFD700] text-[#003366] p-4 rounded-full hover:bg-white transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        {isListening && (
          <p className="text-center text-[#FFD700] mt-2 text-sm">🎤 Ouvindo...</p>
        )}
      </div>
    </div>
  );
}
