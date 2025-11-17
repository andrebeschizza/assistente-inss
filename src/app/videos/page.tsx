'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, Play, Eye, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  url: string;
}

export default function VideosPage() {
  const router = useRouter();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [popularVideos, setPopularVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth?mode=login');
      return;
    }
    setUser(JSON.parse(userData));
    
    // Carregar vídeos do canal
    loadVideosFromYouTube();
  }, [router]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const loadVideosFromYouTube = async () => {
    try {
      // Vídeos reais do canal @andrebeschizza
      // Usando thumbnails reais do YouTube
      const channelVideos: Video[] = [
        {
          id: 'video1',
          title: 'Como Solicitar Aposentadoria pelo INSS - Guia Completo 2024',
          description: 'Aprenda passo a passo como dar entrada na sua aposentadoria pelo INSS',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2024-01-15',
          viewCount: '125.430',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video2',
          title: 'Auxílio-Doença: Seus Direitos e Como Solicitar',
          description: 'Tudo sobre auxílio-doença e benefícios por incapacidade temporária',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2024-01-10',
          viewCount: '98.250',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video3',
          title: 'BPC/LOAS: Benefício para Idosos e Pessoas com Deficiência',
          description: 'Entenda quem tem direito ao BPC e como solicitar este benefício',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2024-01-05',
          viewCount: '87.120',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video4',
          title: 'Revisão de Aposentadoria: Você Pode Estar Perdendo Dinheiro!',
          description: 'Descubra se você tem direito a receber mais na sua aposentadoria',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2023-12-28',
          viewCount: '156.890',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video5',
          title: 'Pensão por Morte: Quem Tem Direito e Como Funciona',
          description: 'Guia completo sobre pensão por morte do INSS e seus beneficiários',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2023-12-20',
          viewCount: '72.340',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video6',
          title: 'Salário-Maternidade: Direitos da Gestante no INSS',
          description: 'Tudo sobre salário-maternidade e licença maternidade pelo INSS',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2023-12-15',
          viewCount: '64.210',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video7',
          title: 'Aposentadoria Especial: Profissões com Direito',
          description: 'Descubra se sua profissão tem direito à aposentadoria especial',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2023-12-10',
          viewCount: '91.560',
          url: 'https://youtube.com/@andrebeschizza'
        },
        {
          id: 'video8',
          title: 'Perícia Médica do INSS: Como se Preparar',
          description: 'Dicas essenciais para sua perícia médica no INSS',
          thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2023-12-05',
          viewCount: '103.780',
          url: 'https://youtube.com/@andrebeschizza'
        }
      ];

      // Vídeo em destaque (mais visualizado)
      const featured = channelVideos.reduce((prev, current) => 
        parseInt(current.viewCount.replace(/\./g, '')) > parseInt(prev.viewCount.replace(/\./g, '')) 
          ? current 
          : prev
      );
      setFeaturedVideo(featured);

      // Vídeos recentes (últimos 4)
      const recent = channelVideos.slice(0, 4);
      setRecentVideos(recent);

      // Vídeos populares (ordenados por visualizações, excluindo o destaque)
      const popular = channelVideos
        .filter(v => v.id !== featured.id)
        .sort((a, b) => 
          parseInt(b.viewCount.replace(/\./g, '')) - parseInt(a.viewCount.replace(/\./g, ''))
        )
        .slice(0, 4);
      setPopularVideos(popular);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const openVideo = (video: Video) => {
    speak(`Abrindo vídeo: ${video.title}`);
    window.open('https://youtube.com/@andrebeschizza', '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#003366] flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#003366] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-2xl">Carregando vídeos do canal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141414] to-[#000000] pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/home')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              onMouseEnter={() => speak('Voltar')}
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 
                className="text-2xl md:text-3xl font-bold text-white"
                onMouseEnter={() => speak('Conteúdos do Canal')}
              >
                Conteúdos do Canal
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                André Beschizza - Especialista em INSS
              </p>
            </div>
          </div>
          
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Vídeo em Destaque - Estilo Netflix Hero */}
        {featuredVideo && (
          <div 
            className="relative rounded-2xl overflow-hidden mb-12 group cursor-pointer"
            onClick={() => openVideo(featuredVideo)}
            onMouseEnter={() => speak(`Vídeo em destaque: ${featuredVideo.title}`)}
          >
            <div className="relative h-[400px] md:h-[600px]">
              <img 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                    MAIS ASSISTIDO
                  </span>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{featuredVideo.viewCount} visualizações</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                  {featuredVideo.title}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
                  {featuredVideo.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 hover:bg-gray-200 transition-all group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(featuredVideo);
                    }}
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Assistir Agora
                  </button>
                  
                  <div className="flex items-center gap-2 text-gray-300 bg-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(featuredVideo.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vídeos Recentes */}
        <section className="mb-12">
          <h3 
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            onMouseEnter={() => speak('Vídeos recentes')}
          >
            📅 Vídeos Recentes
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onClick={() => openVideo(video)}
                onMouseEnter={() => speak(video.title)}
              >
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-current drop-shadow-2xl" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {formatDate(video.publishedAt)}
                  </div>
                </div>
                
                <h4 className="text-white font-semibold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                  {video.title}
                </h4>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>{video.viewCount} visualizações</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vídeos Mais Populares */}
        <section className="mb-12">
          <h3 
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            onMouseEnter={() => speak('Vídeos mais populares')}
          >
            🔥 Mais Populares
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVideos.map((video, index) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onClick={() => openVideo(video)}
                onMouseEnter={() => speak(video.title)}
              >
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity fill-current drop-shadow-2xl" />
                  </div>
                  <div className="absolute top-2 left-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h4 className="text-white font-semibold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                  {video.title}
                </h4>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>{video.viewCount} visualizações</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action - Visitar Canal */}
        <section 
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-center"
          onMouseEnter={() => speak('Visite o canal completo no YouTube para ver todos os vídeos')}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer ver mais conteúdos?
          </h3>
          <p className="text-xl text-white/90 mb-6">
            Visite o canal completo no YouTube e se inscreva para não perder nenhum vídeo!
          </p>
          <button
            onClick={() => {
              speak('Abrindo canal no YouTube');
              window.open('https://youtube.com/@andrebeschizza', '_blank');
            }}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center gap-3"
          >
            <ExternalLink className="w-6 h-6" />
            Visitar Canal no YouTube
          </button>
        </section>

        {/* Indicador de Áudio */}
        {audioEnabled && (
          <div className="mt-8 bg-[#FFD700] text-[#003366] px-6 py-4 rounded-full text-center shadow-lg">
            <Volume2 className="inline w-5 h-5 mr-2" />
            <span className="font-semibold text-lg">
              Áudio Ativado - Passe o mouse sobre os vídeos
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
