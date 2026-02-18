import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Check, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <>
      <Helmet>
        <title>Checkout | Leitura do Arco-Íris</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para a página inicial
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 font-montserrat mb-16">
            Finalize seu Pedido
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* OPTION 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 font-montserrat mb-2">
                  Leitura do Arco-Íris
                </h2>
                <p className="text-sm font-semibold text-pink-500 uppercase tracking-wider mb-6">
                  Você está adquirindo:
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Leitura escrita personalizada",
                    "Áudio explicativo",
                    "Leitura da Alma + Encarnação",
                    "Orientações práticas",
                    "Ativação energética de 21 dias"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-pink-100 rounded-full p-1 mt-0.5 shrink-0">
                        <Check className="w-4 h-4 text-pink-600" />
                      </div>
                      <span className="text-gray-700 font-lato">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500">Valor total</span>
                    <span className="text-4xl font-bold text-gray-800">R$ 244</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Pagamento seguro</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Entrega personalizada em até 7 dias úteis
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/thank-you" className="block w-full">
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide">
                    FINALIZAR MINHA LEITURA
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* OPTION 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-purple-100 text-purple-800 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">
                Recomendado
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 font-montserrat mb-2">
                  LEITURA + MENTORIA 21 DIAS
                </h2>
                <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-6">
                  Experiência Completa:
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Tudo incluso na Leitura do Arco-Íris",
                    "3 encontros ao vivo",
                    "Acompanhamento direto comigo",
                    "Análise energética contínua",
                    "Orientação emocional e espiritual"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-purple-100 rounded-full p-1 mt-0.5 shrink-0">
                        <Check className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700 font-lato">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-purple-100 pt-6 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500">Valor total</span>
                    <span className="text-4xl font-bold text-purple-900">R$ 784</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Pagamento seguro e blindado</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/thank-you" className="block w-full">
                  <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg uppercase tracking-wide">
                    GARANTIR EXPERIÊNCIA COMPLETA
                  </button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;