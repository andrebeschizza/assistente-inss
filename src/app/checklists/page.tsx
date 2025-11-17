'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, FileText, Volume2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: ChecklistItem[];
}

export default function ChecklistsPage() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [expandedChecklist, setExpandedChecklist] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: 'Solicitar Aposentadoria por Idade',
      description: 'Passo a passo para dar entrada na aposentadoria',
      icon: '👴',
      items: [
        { id: '1-1', text: 'Verificar se tenho 65 anos (homem) ou 62 anos (mulher)', completed: false },
        { id: '1-2', text: 'Confirmar que tenho pelo menos 15 anos de contribuição', completed: false },
        { id: '1-3', text: 'Separar documentos: RG, CPF, comprovante de residência', completed: false },
        { id: '1-4', text: 'Reunir comprovantes de contribuição (carnês, contracheques)', completed: false },
        { id: '1-5', text: 'Acessar o Meu INSS (site ou app)', completed: false },
        { id: '1-6', text: 'Fazer login com conta gov.br', completed: false },
        { id: '1-7', text: 'Clicar em "Novo Pedido" e escolher "Aposentadoria"', completed: false },
        { id: '1-8', text: 'Preencher formulário com dados pessoais', completed: false },
        { id: '1-9', text: 'Anexar documentos digitalizados', completed: false },
        { id: '1-10', text: 'Revisar informações e enviar pedido', completed: false },
        { id: '1-11', text: 'Anotar número do protocolo', completed: false },
        { id: '1-12', text: 'Acompanhar status pelo Meu INSS', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Solicitar Auxílio-Doença',
      description: 'Como pedir auxílio quando estiver doente',
      icon: '🏥',
      items: [
        { id: '2-1', text: 'Estar afastado do trabalho há mais de 15 dias', completed: false },
        { id: '2-2', text: 'Reunir atestados médicos e exames', completed: false },
        { id: '2-3', text: 'Separar documentos: RG, CPF, carteira de trabalho', completed: false },
        { id: '2-4', text: 'Acessar o Meu INSS', completed: false },
        { id: '2-5', text: 'Clicar em "Agendar Perícia"', completed: false },
        { id: '2-6', text: 'Escolher data e local da perícia médica', completed: false },
        { id: '2-7', text: 'Confirmar agendamento', completed: false },
        { id: '2-8', text: 'No dia da perícia, levar todos os documentos médicos', completed: false },
        { id: '2-9', text: 'Aguardar resultado da perícia (disponível no Meu INSS)', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Solicitar BPC/LOAS',
      description: 'Benefício para idosos e pessoas com deficiência',
      icon: '🤝',
      items: [
        { id: '3-1', text: 'Verificar se tenho 65 anos ou mais OU tenho deficiência', completed: false },
        { id: '3-2', text: 'Confirmar que renda familiar é menor que 1/4 do salário mínimo por pessoa', completed: false },
        { id: '3-3', text: 'Fazer cadastro no CadÚnico (CRAS do seu bairro)', completed: false },
        { id: '3-4', text: 'Separar documentos: RG, CPF, comprovante de residência', completed: false },
        { id: '3-5', text: 'Reunir laudos médicos (se for pessoa com deficiência)', completed: false },
        { id: '3-6', text: 'Acessar o Meu INSS', completed: false },
        { id: '3-7', text: 'Clicar em "Novo Pedido" e escolher "BPC/LOAS"', completed: false },
        { id: '3-8', text: 'Preencher formulário', completed: false },
        { id: '3-9', text: 'Anexar documentos', completed: false },
        { id: '3-10', text: 'Aguardar avaliação social e médica (se necessário)', completed: false }
      ]
    },
    {
      id: '4',
      title: 'Solicitar Pensão por Morte',
      description: 'Para dependentes de segurado falecido',
      icon: '💐',
      items: [
        { id: '4-1', text: 'Separar certidão de óbito do segurado', completed: false },
        { id: '4-2', text: 'Reunir documentos do falecido: RG, CPF, carteira de trabalho', completed: false },
        { id: '4-3', text: 'Separar documentos do dependente: RG, CPF', completed: false },
        { id: '4-4', text: 'Certidão de casamento ou união estável (se cônjuge)', completed: false },
        { id: '4-5', text: 'Certidão de nascimento (se filho menor de 21 anos)', completed: false },
        { id: '4-6', text: 'Comprovante de dependência econômica', completed: false },
        { id: '4-7', text: 'Acessar o Meu INSS', completed: false },
        { id: '4-8', text: 'Clicar em "Novo Pedido" e escolher "Pensão por Morte"', completed: false },
        { id: '4-9', text: 'Preencher formulário', completed: false },
        { id: '4-10', text: 'Anexar todos os documentos', completed: false },
        { id: '4-11', text: 'Enviar pedido e anotar protocolo', completed: false }
      ]
    }
  ]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          items: checklist.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return checklist;
    }));
  };

  const getProgress = (checklist: Checklist) => {
    const completed = checklist.items.filter(item => item.completed).length;
    const total = checklist.items.length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] p-4 pb-20">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-2xl font-bold text-white">Checklists</h1>
            <p className="text-white/80">Guias passo a passo</p>
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

      {/* Checklists */}
      <div className="space-y-4">
        {checklists.map((checklist) => {
          const progress = getProgress(checklist);
          const isExpanded = expandedChecklist === checklist.id;

          return (
            <div key={checklist.id} className="bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Checklist Header */}
              <button
                onClick={() => {
                  setExpandedChecklist(isExpanded ? null : checklist.id);
                  speak(checklist.title);
                }}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <span className="text-4xl">{checklist.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#003366]">{checklist.title}</h3>
                    <p className="text-sm text-gray-600">{checklist.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#003366]">{progress}%</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-[#003366]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#003366]" />
                )}
              </button>

              {/* Checklist Items */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-6 space-y-3 bg-gray-50">
                  {checklist.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        toggleItem(checklist.id, item.id);
                        speak(item.completed ? 'Item desmarcado' : 'Item marcado');
                      }}
                      className="w-full flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all text-left"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`flex-1 ${
                        item.completed ? 'text-gray-400 line-through' : 'text-[#003366]'
                      }`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
