'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, Volume2, Shield, Bell, CreditCard } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function ProfilePage() {
  const { user, loading, updateUser } = useUser();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  }, [user]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSave = async () => {
    const result = await updateUser(formData);
    if (result.success) {
      setIsEditing(false);
      speak('Perfil atualizado com sucesso');
    } else {
      speak('Erro ao atualizar perfil');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-2xl">Usuário não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] p-4 pb-20">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
            <p className="text-white/80">Gerencie suas informações</p>
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

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-[#003366] to-[#0055AA] p-8 text-center">
          <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-16 h-16 text-[#003366]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
          <div className="inline-block bg-[#FFD700] text-[#003366] px-6 py-2 rounded-full font-bold">
            Plano {user.plan}
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#003366]">Informações Pessoais</h3>
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  speak('Modo de edição ativado');
                }}
                className="flex items-center gap-2 bg-[#003366] text-white px-6 py-3 rounded-xl hover:bg-[#0055AA] transition-all"
              >
                <Edit2 className="w-5 h-5" />
                Editar
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#FFD700] text-[#003366] px-6 py-3 rounded-xl hover:bg-[#FFA500] transition-all font-bold"
              >
                <Save className="w-5 h-5" />
                Salvar
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#003366] mt-1" />
              <div className="flex-1">
                <label className="text-sm text-gray-600 font-semibold">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  />
                ) : (
                  <p className="text-lg text-[#003366] mt-1">{user.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#003366] mt-1" />
              <div className="flex-1">
                <label className="text-sm text-gray-600 font-semibold">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  />
                ) : (
                  <p className="text-lg text-[#003366] mt-1">{user.phone}</p>
                )}
              </div>
            </div>

            {/* CPF */}
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#003366] mt-1" />
              <div className="flex-1">
                <label className="text-sm text-gray-600 font-semibold">CPF</label>
                <p className="text-lg text-[#003366] mt-1">{user.cpf}</p>
                <p className="text-xs text-gray-500 mt-1">CPF não pode ser alterado</p>
              </div>
            </div>

            {/* Birth Date */}
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-[#003366] mt-1" />
              <div className="flex-1">
                <label className="text-sm text-gray-600 font-semibold">Data de Nascimento</label>
                <p className="text-lg text-[#003366] mt-1">{user.birth_date}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#003366] mt-1" />
              <div className="flex-1">
                <label className="text-sm text-gray-600 font-semibold">Endereço</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#003366] focus:outline-none text-lg"
                  />
                ) : (
                  <p className="text-lg text-[#003366] mt-1">{user.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-2xl font-bold text-[#003366] mb-6">Assinatura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-6 h-6 text-[#003366]" />
                <h4 className="font-bold text-[#003366]">Plano Atual</h4>
              </div>
              <p className="text-2xl font-bold text-[#FFD700] mb-2">{user.plan}</p>
              <p className="text-gray-600">Membro desde {new Date(user.member_since).toLocaleDateString('pt-BR')}</p>
              <button className="mt-4 w-full bg-[#003366] text-white py-3 rounded-xl hover:bg-[#0055AA] transition-all font-bold">
                Gerenciar Plano
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-6 h-6 text-[#003366]" />
                <h4 className="font-bold text-[#003366]">Notificações</h4>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span className="text-gray-700">Email</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span className="text-gray-700">SMS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-gray-700">WhatsApp</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 space-y-3">
          <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-all font-bold text-lg">
            Alterar Senha
          </button>
          <button className="w-full bg-red-100 text-red-600 py-4 rounded-xl hover:bg-red-200 transition-all font-bold text-lg">
            Excluir Conta
          </button>
        </div>
      </div>
    </div>
  );
}
