/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  FileCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Menu, 
  ChevronDown, 
  Lock, 
  BarChart3, 
  History, 
  MessageSquare,
  AlertCircle,
  Building2,
  Smartphone,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface FormData {
  imobiliaria: string;
  cnpj: string;
  responsavel: string;
  whatsapp: string;
  cidade: string;
  volume: string;
}

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) => {
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-blue-700 shadow-md shadow-blue-500/20',
    secondary: 'bg-brand-accent text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20',
    outline: 'border-2 border-slate-200 text-slate-600 hover:border-brand-blue hover:text-brand-blue bg-transparent',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl mb-4 text-slate-900">{title}</h2>
    {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-slate-800 group-hover:text-brand-blue transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    imobiliaria: '',
    cnpj: '',
    responsavel: '',
    whatsapp: '',
    cidade: '',
    volume: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      setFormData({
        imobiliaria: '',
        cnpj: '',
        responsavel: '',
        whatsapp: '',
        cidade: '',
        volume: ''
      });
    }, 3000);
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Histórico<span className="text-brand-blue">Locatício</span></span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Como funciona</a>
            <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Benefícios</a>
            <a href="#seguranca" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Segurança/LGPD</a>
            <a href="#planos" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Planos</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:block">
            <Button onClick={openModal}>Solicitar demonstração</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-600">Como funciona</a>
              <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-600">Benefícios</a>
              <a href="#seguranca" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-600">Segurança/LGPD</a>
              <a href="#planos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-600">Planos</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-600">FAQ</a>
              <Button onClick={() => { setIsMenuOpen(false); openModal(); }} className="w-full mt-4">Solicitar demonstração</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                <Building2 className="w-3 h-3" />
                Feito para imobiliárias e administradoras
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                Decida com mais <span className="text-brand-blue">segurança</span> antes de aprovar um aluguel.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Consulte e registre histórico locatício objetivo (pagamentos, atrasos e vistorias), com transparência total e conformidade com a LGPD.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={openModal} className="px-8 py-4 text-lg">Solicitar demonstração</Button>
                <Button onClick={openModal} variant="outline" className="px-8 py-4 text-lg">Entrar na lista de espera</Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Users className="text-slate-400 w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">João Silva</div>
                      <div className="text-xs text-slate-500">CPF: ***.452.***-01</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                    Perfil Verificado
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Pontualidade</div>
                    <div className="text-2xl font-bold text-brand-blue">98/100</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">% em dia</div>
                    <div className="text-2xl font-bold text-brand-accent">95%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Atrasos &gt;30d</div>
                    <div className="text-2xl font-bold text-red-500">0</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Contratos</div>
                    <div className="text-2xl font-bold text-slate-900">3</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Linha do Tempo</div>
                  {[
                    { date: 'Jan 2026', event: 'Pagamento Pontual', status: 'success' },
                    { date: 'Dez 2025', event: 'Pagamento Pontual', status: 'success' },
                    { date: 'Nov 2025', event: 'Vistoria de Saída - Sem Avarias', status: 'info' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      <div className="text-sm text-slate-700">{item.event}</div>
                      <div className="ml-auto text-xs text-slate-400">{item.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative chips */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Risco</div>
                    <div className="text-sm font-bold text-slate-900">Muito Baixo</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem vs Solution */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl mb-8 leading-tight">Chega de aprovar contratos no escuro ou baseados apenas em score de crédito.</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Inadimplência Inesperada', desc: 'O score de crédito tradicional não reflete o comportamento específico do inquilino no aluguel.' },
                    { title: 'Aprovação Lenta', desc: 'Processos manuais de checagem de referências tomam tempo e são pouco confiáveis.' },
                    { title: 'Histórico Disperso', desc: 'As informações sobre bons e maus pagadores ficam presas dentro de cada imobiliária.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                        <X className="text-red-500 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 text-brand-accent">A Solução: Histórico Padronizado</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Dados Verificáveis', desc: 'Informações objetivas compartilhadas entre imobiliárias com base legal.' },
                    { title: 'Análise de Comportamento', desc: 'Foco no que importa: como o inquilino cuida do imóvel e paga o aluguel.' },
                    { title: 'Transparência Total', desc: 'Inquilino visualiza seu histórico e pode contestar qualquer registro.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                        <Check className="text-emerald-500 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="como-funciona" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="Como funciona a plataforma" 
              subtitle="Um fluxo simples, seguro e totalmente transparente para todas as partes."
            />
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', icon: Search, title: 'Consulta por CPF', desc: 'A imobiliária consulta o histórico com base legal e finalidade específica.' },
                { step: '02', icon: BarChart3, title: 'Análise de Indicadores', desc: 'Visualize pontualidade, linha do tempo de contratos e vistorias anteriores.' },
                { step: '03', icon: History, title: 'Registro de Eventos', desc: 'Atualize mensalmente o status (pago, atraso, inadimplência, vistoria).' },
                { step: '04', icon: MessageSquare, title: 'Transparência', desc: 'O inquilino acessa seus dados e pode contestar registros se necessário.' },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="mb-6 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold text-slate-100 absolute top-0 right-0 -z-10 group-hover:text-slate-50 transition-colors">{item.step}</div>
                  <h4 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Shield className="text-brand-blue w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Aviso LGPD</h5>
                <p className="text-sm text-slate-600">Nossa plataforma opera sob os princípios de minimização de dados, finalidade específica e transparência. Não permitimos comentários subjetivos ou rótulos pejorativos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="Benefícios para sua imobiliária" 
              subtitle="Mais do que segurança, entregamos eficiência e padronização para sua operação."
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: 'Redução de Risco', desc: 'Identifique padrões de comportamento antes da assinatura do contrato.' },
                { icon: Smartphone, title: 'Aprovação Ágil', desc: 'Dados prontos para consulta, eliminando ligações para referências.' },
                { icon: FileCheck, title: 'Menos Subjetividade', desc: 'Decisões baseadas em evidências e histórico real de locação.' },
                { icon: CheckCircle2, title: 'Fidelize Bons Inquilinos', desc: 'O histórico positivo ajuda o bom inquilino a alugar mais fácil.' },
              ].map((item, i) => (
                <Card key={i} className="flex flex-col h-full">
                  <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security & LGPD */}
        <section id="seguranca" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-6">
                  <Lock className="w-3 h-3" />
                  Segurança em primeiro lugar
                </div>
                <h2 className="text-3xl md:text-4xl mb-6">Conformidade total com a LGPD e ética no tratamento de dados.</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Não somos uma "lista negra". Somos um ecossistema de dados objetivos, onde o direito do titular é respeitado em cada etapa do processo.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {[
                    'Mascaramento de CPF em listagens',
                    'Logs de auditoria de consultas',
                    'Controle de acesso por CNPJ',
                    'Direito de contestação do titular',
                    'Sem comentários livres',
                    'Dados minimizados'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="text-brand-blue p-0 hover:bg-transparent hover:underline">
                  Ver como tratamos privacidade <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="w-full aspect-square bg-slate-50 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-full animate-[spin_60s_linear_infinite]"></div>
                  <div className="w-3/4 h-3/4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                        <Shield className="text-white w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">Protocolo de Segurança</div>
                        <div className="text-sm text-slate-400">Status: Ativo e Monitorado</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                      <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                      <div className="h-2 bg-slate-100 rounded-full w-4/6"></div>
                      <div className="pt-4 flex justify-between">
                        <div className="text-xs font-bold text-slate-400">ENCRIPTAÇÃO</div>
                        <div className="text-xs font-bold text-emerald-500">AES-256</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating icons */}
                  <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                    <Lock className="text-brand-blue w-6 h-6" />
                  </div>
                  <div className="absolute bottom-10 left-10 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-100">
                    <Users className="text-brand-accent w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="planos" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="Planos para todos os tamanhos" 
              subtitle="Escolha o plano que melhor se adapta ao volume da sua imobiliária."
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Start', 
                  desc: 'Ideal para pequenas imobiliárias e administradoras locais.',
                  features: ['Até 50 consultas/mês', '2 usuários simultâneos', 'Suporte via e-mail', 'Relatórios básicos'],
                  cta: 'Quero uma proposta'
                },
                { 
                  name: 'Pro', 
                  desc: 'Para imobiliárias em crescimento que precisam de escala.',
                  features: ['Consultas ilimitadas*', 'Usuários ilimitados', 'Suporte prioritário', 'Exportação de dados (CSV/PDF)', 'Dashboard avançado'],
                  cta: 'Quero uma proposta',
                  popular: true
                },
                { 
                  name: 'Enterprise', 
                  desc: 'Soluções customizadas para grandes redes e franquias.',
                  features: ['Integração via API', 'SLA garantido', 'Suporte dedicado', 'Treinamento de equipe', 'Single Sign-On (SSO)'],
                  cta: 'Falar com especialista'
                },
              ].map((plan, i) => (
                <div key={i} className={`relative bg-white p-8 rounded-3xl border ${plan.popular ? 'border-brand-blue shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'} flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      Mais Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-8">{plan.desc}</p>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-brand-blue' : 'text-slate-300'}`} />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={openModal} 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="O que dizem nossos parceiros" 
              subtitle="Depoimentos ilustrativos de quem já utiliza a inteligência de dados no aluguel."
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { text: "A segurança na aprovação aumentou drasticamente. Hoje não dependemos apenas de referências por telefone que muitas vezes eram forjadas.", role: "Diretor Comercial" },
                { text: "O processo de análise ficou 40% mais rápido. O histórico objetivo nos dá a confiança necessária para fechar contratos em menos de 24h.", role: "Gerente de Locação" },
                { text: "A transparência com o inquilino é o diferencial. Eles se sentem valorizados quando mostramos que o bom histórico deles conta pontos.", role: "Proprietário de Imobiliária" },
              ].map((item, i) => (
                <Card key={i} className="bg-slate-50 border-none italic text-slate-700 relative">
                  <div className="text-5xl text-slate-200 absolute top-4 left-4 font-serif">“</div>
                  <p className="relative z-10 mb-6 leading-relaxed">{item.text}</p>
                  <div className="text-sm font-bold text-slate-900 not-italic">— {item.role}</div>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-8 italic">* Depoimentos ilustrativos para fins de demonstração do MVP.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <SectionHeading title="Perguntas Frequentes" />
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <FAQItem 
                question="Isso é uma 'lista negra'?" 
                answer="Não. Listas negras são subjetivas e muitas vezes punitivas. O Histórico Locatício é uma plataforma de dados objetivos e verificáveis. Todos os registros são baseados em fatos (pagamentos, vistorias, contratos) e o inquilino tem total transparência e direito de contestação."
              />
              <FAQItem 
                question="Quais dados aparecem na consulta?" 
                answer="Aparecem indicadores de pontualidade (score 0-100), percentual de pagamentos em dia, ocorrência de atrasos superiores a 30 dias e uma linha do tempo de eventos contratuais (início, fim, vistorias)."
              />
              <FAQItem 
                question="Como fica a conformidade com a LGPD?" 
                answer="Operamos com base legal de legítimo interesse e proteção ao crédito, dependendo do caso. Seguimos os princípios de minimização (coletamos apenas o necessário), finalidade (uso exclusivo para análise locatícia) e transparência (acesso total do titular aos seus dados)."
              />
              <FAQItem 
                question="Precisa de consentimento do inquilino?" 
                answer="Em muitos casos, a base legal de proteção ao crédito ou execução de contrato é suficiente, mas orientamos que as imobiliárias incluam cláusulas de transparência em seus termos de serviço, informando sobre a consulta e registro no sistema."
              />
              <FAQItem 
                question="Como começo a usar?" 
                answer="Basta solicitar uma demonstração. Nossa equipe entrará em contato para validar sua imobiliária (exigimos CNPJ ativo no ramo) e realizar o onboarding da sua equipe."
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-brand-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl mb-8">Quer validar em 7 dias com sua equipe?</h2>
                <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                  Junte-se às imobiliárias que estão profissionalizando a análise de risco e construindo um mercado mais seguro.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={openModal} className="bg-white text-brand-blue hover:bg-blue-50 px-10 py-4 text-lg">Solicitar demonstração</Button>
                  <Button onClick={openModal} variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg">Entrar na lista de espera</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <Shield className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Histórico<span className="text-brand-blue">Locatício</span></span>
              </div>
              <p className="text-slate-500 max-w-xs mb-6">
                A primeira plataforma de reputação locatícia objetiva do Brasil, focada em segurança imobiliária e transparência.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-blue transition-colors cursor-pointer">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-blue transition-colors cursor-pointer">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Plataforma</h5>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#como-funciona" className="hover:text-brand-blue transition-colors">Como funciona</a></li>
                <li><a href="#beneficios" className="hover:text-brand-blue transition-colors">Benefícios</a></li>
                <li><a href="#seguranca" className="hover:text-brand-blue transition-colors">Segurança & LGPD</a></li>
                <li><a href="#planos" className="hover:text-brand-blue transition-colors">Planos</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Legal</h5>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-brand-blue transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2026 Histórico Locatício. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <AlertCircle className="w-3 h-3" />
              Produto em fase MVP
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="p-8 md:p-12">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Solicitação enviada!</h3>
                    <p className="text-slate-600">Obrigado pelo interesse. Nossa equipe entrará em contato pelo WhatsApp em breve para agendar sua demonstração.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">Solicitar demonstração</h3>
                    <p className="text-slate-500 mb-8">Preencha os dados abaixo e entraremos em contato.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Imobiliária</label>
                          <input 
                            required
                            type="text" 
                            name="imobiliaria"
                            value={formData.imobiliaria}
                            onChange={handleInputChange}
                            placeholder="Nome da empresa"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">CNPJ</label>
                          <input 
                            required
                            type="text" 
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            placeholder="00.000.000/0000-00"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome do Responsável</label>
                        <input 
                          required
                          type="text" 
                          name="responsavel"
                          value={formData.responsavel}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">WhatsApp</label>
                          <input 
                            required
                            type="tel" 
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="(00) 00000-0000"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Cidade/UF</label>
                          <input 
                            required
                            type="text" 
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleInputChange}
                            placeholder="Ex: São Paulo - SP"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Volume de contratos/mês</label>
                        <select 
                          required
                          name="volume"
                          value={formData.volume}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all appearance-none"
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="1-10">Até 10 contratos</option>
                          <option value="11-50">11 a 50 contratos</option>
                          <option value="51-200">51 a 200 contratos</option>
                          <option value="200+">Mais de 200 contratos</option>
                        </select>
                      </div>

                      <Button type="submit" className="w-full py-4 text-lg mt-4">Solicitar demonstração</Button>
                      
                      <p className="text-[10px] text-slate-400 text-center mt-4">
                        Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade. Seus dados estão seguros.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-40">
        <Button onClick={openModal} className="w-full py-4">Solicitar demonstração</Button>
      </div>
    </div>
  );
}
