import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ChevronDown, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLocalStorage from "./use-local-storage.js";
import EditableText from "./EditableText";
import AdminPanel from "./AdminPanel";
import { useToast } from "./use-toast";
const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const finalCtaRef = useRef(null);
  const {
    toast
  } = useToast();

  // --- Edit Mode Logic ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initial Content State
  const defaultContent = {
    heroSubtitle: 'O seu <span class="font-bold">MAPA DA ALMA</span>: Uma tradução da sua frequência original e dos movimentos que a sua alma e encarnação buscam ajustar agora.'
  };

  // Persistent Storage
  const [savedContent, setSavedContent] = useLocalStorage('site-content-v1', defaultContent);

  // Active Content (for editing session)
  const [content, setContent] = useState(savedContent);

  // Sync state when local storage loads
  useEffect(() => {
    setContent(savedContent);
  }, [savedContent]);
  const handleContentChange = (key, newHtml) => {
    setContent(prev => ({
      ...prev,
      [key]: newHtml
    }));
    setHasUnsavedChanges(true);
  };
  const handleSave = () => {
    setSavedContent(content);
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    toast({
      title: "Changes Saved",
      description: "Your content has been successfully updated.",
      variant: "success",
      className: "bg-green-50 border-green-200 text-green-900"
    });
  };
  const handleCancel = () => {
    setContent(savedContent); // Revert to last saved
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    toast({
      title: "Editing Cancelled",
      description: "All unsaved changes have been discarded."
    });
  };
  const toggleEditMode = () => {
    if (isEditMode && hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Discard them?")) {
        handleCancel();
      }
    } else {
      setIsEditMode(!isEditMode);
    }
  };
  // -----------------------

  const toggleFaq = index => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const scrollToFinalCta = () => {
    finalCtaRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  const faqItems = [{
    question: "O que exatamente é a Leitura do Arco-Íris?",
    answer: "A Leitura do Arco-Íris é uma leitura energética profunda que revela a estrutura da sua alma, suas forças dominantes, os padrões que regem sua consciência e o momento evolutivo que você está atravessando. É um mapa real e personalizado da sua essência."
  }, {
    question: "Como funciona a Mentoria",
    answer: "São 3 sessões individuais comigo online ao vivo. 1 por semana de 50 minutos."
  }, {
    question: "Como funciona o processo de ativação de 21 dias?",
    answer: "Após receber sua leitura, durante 21 dias a ativação reverbera em seu campo energético. Muitas pessoas relatam sonhos mais intensos, clarezas profundas e decisões que ganham firmeza. É um período de reorganização interna e integração."
  }, {
    question: "Preciso ter experiência espiritual anterior?",
    answer: "Não. A Leitura do Arco-Íris é acessível para qualquer pessoa, independente de sua bagagem espiritual. Se você sente que sua alma está pedindo compreensão, esse é o momento certo."
  }, {
    question: "Como recebo minha leitura?",
    answer: "Você recebe sua leitura de forma personalizada e individual, escrita especialmente para você. Ela é entregue em formato digital dentro do prazo combinado."
  }, {
    question: "Posso fazer a mentoria sem a leitura?",
    answer: "A mentoria é um acompanhamento complementar à leitura. Recomendo começar com a leitura para estabelecer a base, e depois explorar a mentoria se desejar um acompanhamento contínuo."
  }, {
    question: "Quanto tempo leva para receber minha leitura?",
    answer: "Sua leitura é entregue dentro de 7 dias úteis após a confirmação do pedido. Este é o tempo necessário para que eu possa fazer uma leitura profunda e personalizada."
  }];
  const paraQuemItems = ["Você sente que há algo maior esperando por você", "Está em transição e busca novos caminhos", "Está pronto para assumir sua verdadeira potência", "Quer compreender sua alma além da personalidade", "Sente que suas decisões precisam de mais alinhamento"];

  // Reusable Gold Button Component
  const GoldButton = ({
    onClick,
    children,
    className = ""
  }) => <motion.button whileHover={{
    scale: 1.05,
    filter: "brightness(1.1)",
    boxShadow: "0 20px 25px -5px rgba(200, 169, 74, 0.4)"
  }} whileTap={{
    scale: 0.95
  }} onClick={onClick} className={`
        bg-gradient-to-br from-[#C8A94A] to-[#E5C76B] 
        text-[#2E2415] 
        font-bold 
        px-10 py-5 
        rounded-lg 
        text-lg 
        shadow-lg 
        transition-all 
        duration-300 
        tracking-wide 
        uppercase
        ${className}
      `}>
      {children}
    </motion.button>;
  return <>
    <Helmet>
      {/* Título da página */}
      <title>O Seu Mapa da Alma | Leitura do Arco-Íris</title>

      {/* SEO básico */}
      <meta
        name="description"
        content="Descubra o seu Mapa da Alma com a Leitura do Arco-Íris. Uma análise energética personalizada para entender padrões, bloqueios e reencontrar clareza e direção."
      />

      {/* Open Graph (WhatsApp / Facebook / Instagram) */}
      <meta property="og:title" content="O Seu Mapa da Alma | Leitura do Arco-Íris" />
      <meta
        property="og:description"
        content="Uma leitura profunda e personalizada para revelar padrões invisíveis, compreender seus bloqueios e retomar seu caminho com mais consciência."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://leituraarcoiris.espacorumocerto.com.br/" />
      <meta property="og:site_name" content="Espaço Rumo Certo" />

      {/* Imagem do preview */}
      <meta
        property="og:image"
        content="https://horizons-cdn.hostinger.com/faa8b6fb-78b1-4cee-a4e4-64714aa88884/ee58eefd22e79e6413a1901113aadbe5.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Mapa da Alma – Leitura do Arco-Íris" />

      {/* Twitter (não atrapalha, ajuda compatibilidade) */}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>



      {/* Admin Interface */}
      <AdminPanel isEditMode={isEditMode} toggleEditMode={toggleEditMode} onSave={handleSave} onCancel={handleCancel} hasUnsavedChanges={hasUnsavedChanges} />

      <div className="min-h-screen bg-white" style={{
      scrollBehavior: 'smooth'
    }}>
        
        {/* Section 1 - Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{
        backgroundImage: `url('https://horizons-cdn.hostinger.com/fa8ab6fb-78b1-4cee-a4e4-64714aa88884/ee58eefd22e79e6413a1901113aadbe5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
          {/* Dark blue-black overlay #0B1020 with 60% opacity */}
          <div className="absolute inset-0 bg-[#0B1020]/60 z-0"></div>
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: 'easeOut'
        }} className="relative z-10 text-center px-4 max-w-3xl mx-auto pb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-montserrat leading-tight drop-shadow-lg">Você já sentiu que sua alma está tentando falar com você... Mas ainda não conseguiu entender?</h1>
            
            {/* Editable Hero Subtitle */}
            <EditableText tagName="h2" className="text-xl md:text-2xl text-white/90 mb-10 font-lato font-normal" html={content.heroSubtitle} isEditing={isEditMode} onSave={newVal => handleContentChange('heroSubtitle', newVal)} />

            <GoldButton onClick={scrollToFinalCta}>
              Quero minha Leitura Personalizada
            </GoldButton>
          </motion.div>
        </section>

        {/* Section 2 - O QUE É A LEITURA DO ARCO-ÍRIS? */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-montserrat mb-6 uppercase">
                O QUE É A LEITURA DO ARCO-ÍRIS?
              </h2>
              <p className="text-xl text-gray-600 font-lato max-w-3xl mx-auto">A Leitura das 7 Energias do Arco-Íris identifica a vibração dominante da sua alma e as forças que estruturam sua encarnação.
Mostra como você funciona internamente, quais energias regem sua consciência, como está vivendo este ciclo e o que precisa ser reorganizado para que sua alma volte a pulsar em alinhamento com sua Tríade Sagrada, integrando, de forma harmoniosa, as demais energias que compõem sua estrutura.</p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              icon: '🌌',
              text: 'Energia dominante da sua Alma',
              bg: 'bg-pink-50'
            }, {
              icon: '🔺',
              text: 'A Tríade ativa da sua Encarnação (o que está sendo trabalhado agora)',
              bg: 'bg-blue-50'
            }, {
              icon: '⚖️',
              text: 'Os desequilíbrios atuais e suas causas',
              bg: 'bg-green-50'
            }, {
              icon: '🧩',
              text: 'O que está pedindo integração',
              bg: 'bg-purple-50'
            }, {
              icon: '✨',
              text: 'Seus talentos naturais',
              bg: 'bg-pink-50'
            }, {
              icon: '🌀',
              text: 'O movimento evolutivo da sua alma',
              bg: 'bg-blue-50'
            }].map((item, index) => <motion.div key={index} variants={itemVariants} whileHover={{
              scale: 1.03,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }} className={`${item.bg} rounded-2xl p-8 flex flex-col items-center text-center shadow-md transition-all duration-300 h-full justify-center`}>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <p className="text-lg text-gray-800 font-medium font-lato leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>)}
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.4
          }} className="mt-16 text-center max-w-4xl mx-auto bg-gray-50 p-8 rounded-3xl border border-yellow-200">
              <p className="text-xl md:text-2xl text-gray-700 font-montserrat font-medium leading-relaxed">
                "Essa não é uma leitura padronizada. Não existem duas leituras iguais. Cada alma possui uma arquitetura única. Você recebe um mapa exclusivo da sua estrutura energética."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 3 - O QUE VOCÊ RECEBE */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 font-montserrat">
              O QUE VOCÊ RECEBE
            </motion.h2>
            
            {/* Grid of 6 Checkmark Items */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {["Leitura escrita completa (Alma + Encarnação)", "Áudio personalizado explicando toda a leitura", "Orientações claras de próximos passos", "Direcionamento energético", "Indicação do foco de integração", "Ativação energética de 21 dias"].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 p-2 rounded-full shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-lato text-lg">{item}</p>
                </motion.div>)}
            </motion.div>

            {/* Highlight Block */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 md:p-12 text-center mb-16 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-montserrat mb-4">
                SIM, A LEITURA É TAMBÉM UMA ATIVAÇÃO.
              </h3>
              <p className="text-xl text-gray-700 font-lato max-w-3xl mx-auto">
                Durante os 21 dias de ativação, o seu campo começa a se reorganizar dentro de você.
              </p>
            </motion.div>

            {/* Muitas pessoas relatam */}
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-800 font-montserrat mb-8">
                Muitas pessoas relatam:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {["Sonhos mais intensos", "Percepções ampliadas", "Emoções sendo reorganizadas", "Decisões acontecendo com mais firmeza"].map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center justify-center gap-3">
                    <span className="text-yellow-500 text-2xl">•</span>
                    <span className="text-lg text-gray-700 font-lato">{item}</span>
                  </motion.div>)}
              </div>
              <p className="text-2xl font-medium text-gray-800 font-montserrat italic mb-12">
                "A leitura não apenas informa. Ela movimenta."
              </p>
              
              {/* New Centered Button */}
              <div className="py-8">
                <GoldButton onClick={scrollToFinalCta}>
                  Quero minha Leitura Personalizada
                </GoldButton>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - PARA QUEM É */}
        <section className="py-24 px-4 bg-blue-50">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 font-montserrat">
                PARA QUEM É
              </h2>
              <div className="h-1 w-32 bg-yellow-400 mx-auto mb-12 rounded-full"></div>
              
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
              once: true
            }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {paraQuemItems.map((item, index) => <motion.div key={index} variants={itemVariants} className="flex items-start gap-3 bg-white/50 p-4 rounded-lg">
                    <div className="mt-1 bg-green-100 rounded-full p-1 shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700 font-lato">{item}</p>
                  </motion.div>)}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 5 - Authority/Personal Connection */}
        <section className="py-24 px-4 bg-purple-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Text Content */}
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-montserrat mb-2">
                  Quem está por trás da Leitura
                </h2>
                <h3 className="text-xl font-medium text-gray-600 font-montserrat mb-8">
                  Por Gabriela Soares<br />
                  <span className="text-lg font-light">Criadora da Leitura do Arco-Íris</span>
                </h3>
                
                <div className="space-y-6 text-gray-700 font-lato text-lg leading-relaxed">
                  <p>
                    Quando eu falo sobre a Leitura do Arco-Íris, não estou falando apenas de um conhecimento teórico. Estou falando sobre uma tecnologia espiritual viva, que atravessou meu próprio caminho e transformou minha percepção sobre quem somos.
                  </p>
                  
                  <p>
                    Meu trabalho não é apenas “ler” seu campo. É traduzir a linguagem da sua alma para que sua mente humana possa compreender, com clareza, aquilo que você já sente em níveis mais profundos.
                  </p>
                  
                  <p>
                    Estudo as energias sutis e a arquitetura da consciência há anos, integrando prática, escuta e experiênca real com pessoas. Acredito que a espiritualidade não deve ser uma fuga da realidade, mas um caminho de consciência para vivermos nossa encarnação com mais verdade, presença e responsabilidade.
                  </p>
                  
                  <p>
                    Se você sente que sua alma está pedindo compreensão, talvez seja o momento de ouvir com mais profundidade.
                  </p>

                  <p className="font-semibold text-gray-800 mt-8">
                    Será uma honra realizar a sua leitura.
                  </p>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-200/50 rounded-3xl transform rotate-3 translate-x-2 translate-y-2"></div>
                  <img src="https://horizons-cdn.hostinger.com/fa8ab6fb-78b1-4cee-a4e4-64714aa88884/60a6d1d5272076f212815b7e776a2b04.png" alt="Gabriela Soares - Criadora da Leitura do Arco-Íris" className="relative rounded-3xl shadow-xl w-full h-auto object-cover aspect-[4/5]" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Section 6 - Offers/Combos Block */}
        <section className="py-24 px-4 bg-white" id="offers">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 font-montserrat">
              ESCOLHA O SEU CAMINHO
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Offer 1 - Standard */}
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 to-pink-400"></div>
                
                <div className="mb-6">
                  <span className="text-xs font-bold text-pink-500 tracking-widest uppercase bg-pink-50 px-3 py-1 rounded-full">
                    OFERTA DE ABERTURA: NOVA FASE
                  </span>
                  <h3 className="text-3xl font-bold mt-4 mb-2 text-gray-800 font-montserrat">
                    Leitura do Arco-Íris
                  </h3>
                  
              </div>
              <div className="mb-6 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                <h4 className="font-bold text-purple-900 mb-4 font-montserrat text-sm uppercase tracking-wide">Inclui:</h4>
                <ul className="space-y-3">
                  {["Leitura escrita completa ", "Áudio personalizado explicando toda a leitura", "Orientações claras de próximos passos", "Direcionamento energético", "Indicação do foco de integração", "Ativação energética de 21 dias"].map((feature, idx) => <li key={idx} className="flex items-start gap-3 text-gray-700 font-lato text-sm">
                    <div className="mt-0.5 bg-purple-200 rounded-full p-1 shrink-0">
                      <Check className="w-3 h-3 text-purple-700" />
                    </div>
                    <span>{feature}</span>
                  </li>)}
                </ul>
              </div>


                <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex-grow">
                  <p className="text-gray-700 font-lato leading-relaxed text-sm">
                    <strong className="block mb-2 text-gray-900">Por que agir agora?</strong>
                    Como cada Mapa é estudado e escrito individualmente por mim, respeitando a complexidade da sua estrutura, as vagas para esta condição especial são limitadas por semana. Garanta seu lugar antes que o valor retorne ao original.
                  </p>
                </div>
              <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">R$ 244,00</span>
                    <span className="text-sm text-gray-500 line-through">R$ 350,00</span>
                  </div>
                  <p className="text-sm text-gray-500 font-lato italic">
              
                  </p>
                <div className="mt-auto">
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
                      ⚡ Últimas vagas com valor de lançamento
                    </span>
                  </div>
                  <a href="https://pag.ae/81vesEG13" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <motion.button whileHover={{
                    scale: 1.05,
                    filter: "brightness(1.1)",
                    boxShadow: "0 20px 25px -5px rgba(200, 169, 74, 0.4)"
                  }} whileTap={{
                    scale: 0.95
                  }} className="w-full bg-gradient-to-br from-[#C8A94A] to-[#E5C76B] text-[#2E2415] font-bold px-10 py-5 rounded-lg text-lg shadow-lg transition-all duration-300 tracking-wide uppercase">
                      Quero a Leitura do Arco-Íris
                    </motion.button>
                  </a>
                </div>
              </motion.div>

              {/* Offer 2 - Premium/Highlighted */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }} className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-300 flex flex-col relative overflow-hidden transform md:-translate-y-4 z-10">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-indigo-500 text-white text-xs font-bold px-6 py-2 rounded-bl-xl uppercase tracking-wider shadow-md">
                  Mais Popular
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 font-montserrat mb-3 leading-tight">
                    COMBO COM MENTORIA <br />
                    <span className="text-purple-600">21 DIAS DE ACOMPANHAMENTO</span>
                  </h3>
                  <p className="text-gray-600 font-lato text-sm">
                    Se você quiser aprofundar a ativação da leitura… você pode incluir a Mentoria 21 dias.
                  </p>
                </div>

                <div className="mb-6 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                  <h4 className="font-bold text-purple-900 mb-4 font-montserrat text-sm uppercase tracking-wide">Inclui:</h4>
                  <ul className="space-y-3">
                    {["3 encontros ao vivo comigo (1 por semana)", "Conversa direta e orientação personalizada", "Ajuste de campo energético", "Análise de padrões recorrentes", "Acompanhamento de sensibilidade energética", "Análise de sonhos (caso ocorram durante o período)", "Direcionamento prático de decisões"].map((feature, idx) => <li key={idx} className="flex items-start gap-3 text-gray-700 font-lato text-sm">
                        <div className="mt-0.5 bg-purple-200 rounded-full p-1 shrink-0">
                          <Check className="w-3 h-3 text-purple-700" />
                        </div>
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>

                <div className="mb-6 px-4 py-3 bg-purple-100/30 rounded-lg border-l-4 border-purple-400">
                   <p className="text-gray-700 font-lato italic text-sm">
                    "É um acompanhamento real. Sem roteiro engessado. Sem fórmula pronta. Você comigo, orientando você."
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-4 text-center">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">
                      ⏳ CONDIÇÃO EXCLUSIVA DE LANÇAMENTO
                    </p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                      R$ 784,00
                    </p>
                  </div>

                  <div className="mb-6 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-xs text-yellow-800 leading-tight">
                      <span className="font-bold">⚠️ ATENÇÃO:</span> Devido à natureza individual e profunda deste acompanhamento, disponibilizo apenas 5 vagas a cada ciclo de 21 dias. Ao preencherem-se estas vagas, o botão de compra será desativado para garantir a qualidade da entrega.
                    </p>
                  </div>

                  <a href="https://pag.ae/81veuKgjm" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <motion.button whileHover={{
                    scale: 1.05,
                    filter: "brightness(1.1)",
                    boxShadow: "0 20px 25px -5px rgba(200, 169, 74, 0.4)"
                  }} whileTap={{
                    scale: 0.95
                  }} className="w-full bg-gradient-to-br from-[#C8A94A] to-[#E5C76B] text-[#2E2415] font-bold px-10 py-5 rounded-lg text-lg shadow-lg transition-all duration-300 tracking-wide uppercase">
                      Quero a Experiência Completa
                    </motion.button>
                  </a>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* Section 9 - FAQ/Guarantee Section */}
        <section className="py-24 px-4 bg-pink-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 rounded-2xl p-8 mb-12 text-center shadow-lg">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-montserrat">Nossa Garantia</h3>
              <p className="text-gray-700 leading-relaxed font-lato text-lg">
                Garantia de 21 dias após o período de ativação completar
              </p>
            </div>

            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 font-montserrat">
              Perguntas Frequentes
            </motion.h2>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button onClick={() => toggleFaq(index)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                    <span className="font-semibold text-gray-800 font-montserrat text-lg pr-4">{faq.question}</span>
                    <motion.div animate={{
                  rotate: openFaq === index ? 180 : 0
                }} transition={{
                  duration: 0.3
                }}>
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: 'auto',
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} transition={{
                  duration: 0.3
                }} className="overflow-hidden">
                        <div className="px-6 pb-5 text-gray-600 font-lato leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Section 10 - Final CTA */}
        <section ref={finalCtaRef} className="py-24 px-4 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-pink-100 opacity-80 z-0"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/50">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 font-montserrat leading-tight">
                Pronto para Descobrir a Sua Alma?
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 font-lato max-w-2xl mx-auto leading-relaxed">
                O seu mapa já está escrito. Agora é o momento de lê-lo, compreendê-lo e vivê-lo em sua potência máxima.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
                {/* Button 1: Secondary - Updated text and link */}
                <a href="https://pag.ae/81vesEG13" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="w-full md:w-auto bg-transparent border-2 border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300">
                    Quero a Leitura do Arco-Íris
                  </motion.button>
                </a>

                {/* Button 2: Primary - Prominent - Updated link */}
                <a href="https://pag.ae/81veuKgjm" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-10 py-5 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2">
                    Quero a Experiência Completa <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3 font-montserrat">Sobre</h3>
                <ul className="space-y-2 font-lato">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nossa História</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 font-montserrat">Legal</h3>
                <ul className="space-y-2 font-lato">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 font-montserrat">Suporte</h3>
                <ul className="space-y-2 font-lato">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 font-montserrat">Redes</h3>
                <ul className="space-y-2 font-lato">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-700">
              <p className="text-gray-400 mb-2 font-lato">
                <a href="mailto:contato@leituradoarcoiris.com" className="hover:text-white transition-colors">
                  contato@leituradoarcoiris.com
                </a>
              </p>
              <p className="text-gray-500 text-sm font-lato">
                © 2026 Leitura do Arco-Íris. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default LandingPage;
