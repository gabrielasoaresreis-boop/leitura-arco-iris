import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Sua Jornada Começou | Leitura do Arco-Íris</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/50"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-montserrat mb-6">
            Sua leitura já começou.
          </h1>
          
          <p className="text-xl text-gray-600 font-lato mb-12">
            A partir de agora, sua energia entra em preparação para o mapeamento.
          </p>

          <div className="bg-gray-50 rounded-2xl p-8 mb-10 text-left">
            <h3 className="text-lg font-bold text-gray-800 font-montserrat mb-6 uppercase tracking-wide border-b border-gray-200 pb-2">
              Nos próximos dias:
            </h3>
            <ul className="space-y-4">
              {[
                "Evite sobrecarga emocional desnecessária",
                "Observe sonhos e anote-os se possível",
                "Anote percepções internas que surgirem",
                "Permita que a consciência se mova naturalmente"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-center text-gray-700 font-lato"
                >
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 text-gray-700 font-lato text-lg mb-12">
            <p>
              Você receberá instruções detalhadas por e-mail em breve.
            </p>
            <p className="italic font-medium text-purple-800">
              "A ativação começa antes mesmo de você ouvir o áudio."
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-sm">
              <p>
                * Se você escolheu a mentoria, em breve entrarei em contato para agendarmos nosso primeiro encontro.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 font-montserrat">
              O caminho já começou.
            </h2>
          </div>

          <Link to="/">
            <button className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Voltar para a página inicial <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>

        </motion.div>
      </div>
    </>
  );
};

export default ThankYou;