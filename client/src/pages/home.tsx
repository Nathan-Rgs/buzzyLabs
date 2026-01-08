import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  FileText, 
  LayoutDashboard, 
  MessageSquare, 
  Network, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap,
  Send,
  Bot,
  Sparkles,
  Rocket,
  Brain,
  Gem
} from "lucide-react";

import logoImage from "@assets/Buzzy_Labs_Bee_Blue_No-Frame_1767456786441.jpeg";
import heroBg from "@assets/generated_images/abstract_dark_tech_background_with_nodes.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const stepAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Home() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    { q: "A tecnologia vai substituir minha equipe atual?", a: "Não, ela vai potencializar seu time. A automação e a IA assumem o trabalho repetitivo, permitindo que seus funcionários foquem em vendas, relacionamento e estratégia." },
    { q: "Minha empresa é pequena demais para IA?", a: "A IA é a ferramenta que nivela o jogo. Ela permite que uma operação enxuta tenha a capacidade de entrega de uma grande corporação." },
    { q: "Vou ficar refém de um sistema complexo?", a: "Pelo contrário, você ganhará liberdade. Nós cuidamos da complexidade técnica nos bastidores. Para você, o resultado é simplicidade." },
    { q: "Preciso trocar os softwares que já uso?", a: "Raramente. Nossa especialidade é fazer com que seus sistemas atuais conversem entre si de forma inteligente." },
    { q: "Qual é o retorno financeiro (ROI) esperado?", a: "O retorno é direto: redução de custos operacionais e aumento de receita pela agilidade no atendimento. Nossos clientes costumam recuperar o investimento nos primeiros meses." }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setChatMessage("");
    setIsTyping(true);

    // AI Response logic
    setTimeout(() => {
      let botResponse = "";
      const msg = userText.toLowerCase();

      if (msg.includes("venda") || msg.includes("crm") || msg.includes("lead")) {
        botResponse = "Para seu setor de vendas, a Buzzy Labs pode implementar um fluxo de qualificação automática de leads via IA e WhatsApp, integrando diretamente com seu CRM para que seu time foque apenas em fechar negócios já aquecidos.";
      } else if (msg.includes("financeiro") || msg.includes("nota") || msg.includes("pagamento")) {
        botResponse = "No financeiro, conseguimos automatizar a emissão de notas fiscais, conciliação bancária e cobrança ativa de inadimplentes, eliminando erros manuais e garantindo fluxo de caixa estável.";
      } else if (msg.includes("rh") || msg.includes("contrato") || msg.includes("processo")) {
        botResponse = "Podemos otimizar seu RH com geração automática de contratos, onboarding digital e dashboards de performance que consolidam dados de múltiplas ferramentas em um só lugar.";
      } else {
        botResponse = "Entendi! Esse é exatamente o tipo de desafio que resolvemos com nossa Engenharia de Negócios. Na Buzzy Labs, desenhamos uma arquitetura sob medida para esse gargalo, unindo IA e automação para garantir que a operação nunca pare. Vamos agendar um diagnóstico executivo para eu te mostrar como?";
      }

      setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-buzzy-gradient text-foreground font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
              <img 
                src={logoImage} 
                alt="Buzzy Labs" 
                className="relative h-10 w-10 rounded-full object-cover border border-primary/20" 
                data-testid="img-logo-header"
              />
            </div>
            <span className="font-bold text-xl tracking-tight" data-testid="text-brand-name">Buzzy Labs</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-white/70">
            <a href="#solutions" className="hover:text-primary transition-colors" data-testid="link-nav-solutions">Soluções</a>
            <a href="#process" className="hover:text-primary transition-colors" data-testid="link-nav-process">O Processo</a>
            <a href="#faq" className="hover:text-primary transition-colors" data-testid="link-nav-faq">FAQ</a>
          </nav>

          <Button className="font-bold px-6 bg-primary hover:bg-primary/90 text-[#ffffff]" size="default" data-testid="button-header-cta">
            Agendar Diagnóstico Executivo
          </Button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.p variants={fadeInUp} className="inline-block bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8 text-[#8e99ad]" data-testid="text-hero-pretitle">
              CONSULTORIA DE INTELIGÊNCIA OPERACIONAL
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter text-glow ml-[10px] mr-[10px]" data-testid="text-hero-title">
              Escale sua empresa sem aumentar seus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/60">custos fixos.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light" data-testid="text-hero-subtitle">
              Criamos ecossistemas digitais inteligentes que permitem à sua operação vender e entregar mais, mantendo a equipe enxuta. Transforme eficiência operacional em margem de lucro real.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 px-10 text-lg w-full sm:w-auto font-bold shadow-2xl shadow-primary/10 text-[#ffffff]" data-testid="button-hero-cta">
                Agendar Diagnóstico Executivo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="mt-4 text-xs text-muted-foreground" data-testid="text-hero-disclaimer">
              Análise personalizada para o seu modelo de negócio.
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* Pain Points Section */}
      <section className="py-24 relative bg-black/40 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">A ineficiência operacional é a âncora que prende seu faturamento.</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-white/50 leading-relaxed">Enquanto você depende de processos manuais e memória humana para rodar o básico, seus concorrentes usam tecnologia para serem mais rápidos e baratos</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: "Talento Humano Subutilizado", 
                desc: "Sua equipe gasta horas movendo informações de um lugar para o outro, em vez de focar em vendas e estratégia. Você está pagando caro por tarefas operacionais.",
                icon: <Users className="h-7 w-7 text-primary" />
              },
              { 
                title: "Gestão no Escuro", 
                desc: "Sem indicadores centralizados, você toma decisões baseadas em intuição ou relatórios desatualizados. A falta de visão clara gera riscos desnecessários.",
                icon: <LayoutDashboard className="h-7 w-7 text-primary" />
              },
              { 
                title: "Lentidão na Resposta", 
                desc: "O mercado não espera. Se o seu processo depende de alguém \"ver o e-mail\" para agir, você perde oportunidades para empresas mais ágeis.",
                icon: <Clock className="h-7 w-7 text-primary" />
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white/[0.03] border-white/5 hover:border-primary/20 transition-all duration-500 backdrop-blur-sm group h-full" data-testid={`card-pain-point-${i}`}>
                  <CardHeader>
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/50 leading-relaxed text-base">
                    {item.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Solution Section */}
      <section id="solutions" className="py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center gap-24"
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary mb-8">
                <Cpu className="mr-2 h-4 w-4" />
                Engenharia de Negócios
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-[1.2]">
                O alicerce tecnológico que <span className="text-primary">sustenta o seu crescimento.</span>
              </h2>
              <p className="text-white/60 mb-10 text-xl leading-relaxed">Para crescer de forma saudável, sua empresa precisa de processos escaláveis. Nós projetamos e implementamos a Engenharia Operacional do seu negócio.</p>
              <p className="text-white/60 mb-10 text-lg leading-relaxed">
                Nós integramos seus departamentos em um fluxo contínuo e inserimos camadas de Inteligência Artificial para atuar como "supervisores digitais".
              </p>
              
              <div className="grid grid-cols-1 gap-8 mt-12">
                {[
                  { title: "Velocidade de Execução", desc: "O que levava dias para ser processado, agora acontece em segundos, 24 horas por dia.", icon: <Rocket className="h-6 w-6 text-primary" /> },
                  { title: "Inteligência Artificial Estratégica", desc: "Algoritmos que entendem o contexto e tomam micro-decisões para agilizar o atendimento.", icon: <Brain className="h-6 w-6 text-primary" /> },
                  { title: "Visão Unificada", desc: "Conectamos as pontas soltas para que nenhuma informação importante se perca.", icon: <Gem className="h-6 w-6 text-primary" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="lg:w-1/2 relative">
              <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full opacity-50" />
              <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-3xl shadow-3xl">
                <div className="flex flex-col gap-10">
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 border-dashed">
                    <p className="text-center text-sm font-mono text-white/30 mb-4">OPERAÇÃO TRADICIONAL</p>
                    <div className="grid grid-cols-5 gap-3 opacity-30">
                      {[...Array(10)].map((_,i) => (
                        <div key={i} className="h-10 rounded-lg bg-red-500/20 animate-pulse" style={{animationDelay: `${i*0.1}s`}} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center relative">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>

                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                    <p className="text-center text-sm font-mono text-primary/60 mb-4">ECOSSISTEMA BUZZY</p>
                    <div className="flex gap-3">
                       <div className="h-20 flex-1 rounded-xl bg-background/50 border border-white/5 flex items-center justify-center">
                          <Database className="h-8 w-8 text-primary" />
                       </div>
                       <div className="h-20 flex-1 rounded-xl bg-background/50 border border-white/5 flex items-center justify-center">
                          <Network className="h-8 w-8 text-primary" />
                       </div>
                       <div className="h-20 flex-1 rounded-xl bg-background/50 border border-white/5 flex items-center justify-center">
                          <LayoutDashboard className="h-8 w-8 text-primary" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Process Section */}
      <section id="process" className="py-32 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Do Diagnóstico à Autonomia: Como trabalhamos</h2>
            <p className="text-xl text-white/40">Segurança e organização em cada etapa da jornada.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[48px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

            {[
              { title: "Mapeamento", desc: "Entendemos suas dores, mapeamos seus processos atuais e identificamos gargalos.", icon: "01" },
              { title: "Arquitetura & Validação", desc: "Desenhamos a solução ideal. Você aprova o projeto antes de escrevermos uma linha de código.", icon: "02" },
              { title: "Implementação", desc: "Construímos e integramos seus sistemas. Realizamos testes de estresse para garantir estabilidade.", icon: "03" },
              { title: "Monitoramento & Evolução", desc: "Sua operação não para. Nós monitoramos os sistemas, corrigimos falhas e otimizamos fluxos continuamente.", icon: "04" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stepAnimation}
                className="flex flex-col items-center text-center group" 
                data-testid={`step-process-${i}`}
              >
                <div className="h-24 w-24 rounded-3xl bg-card border-2 border-white/10 flex items-center justify-center mb-8 relative group-hover:border-primary/50 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-black font-mono text-primary relative z-10">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* AI Agent Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="h-3 w-3" />
                Diagnóstico Instantâneo
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Como a Buzzy pode te ajudar?</h2>
              <p className="text-xl text-white/40">Descreva seu problema ou sua empresa para nosso Consultor IA.</p>
            </div>

            <div className="bg-card border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
              {/* Sidebar Info */}
              <div className="md:w-1/3 bg-white/[0.02] p-8 border-r border-white/5 hidden md:block">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Buzzy Assistant
                </h3>
                <ul className="space-y-6">
                  <li className="text-sm text-white/40 flex gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-bold">1</div>
                    Explique seu gargalo operacional ou setor.
                  </li>
                  <li className="text-sm text-white/40 flex gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-bold">2</div>
                    Receba sugestões de arquitetura de automação.
                  </li>
                  <li className="text-sm text-white/40 flex gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-[10px] font-bold">3</div>
                    Descubra como a IA pode potencializar seu time.
                  </li>
                </ul>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 flex flex-col bg-white/[0.01]">
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                      <Bot className="h-12 w-12 mb-4" />
                      <p className="text-sm">Olá! Sou o assistente da Buzzy Labs. <br/> Qual é o maior gargalo da sua operação hoje?</p>
                    </div>
                  )}
                  <AnimatePresence>
                    {chatHistory.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user' 
                          ? 'bg-primary text-background font-medium' 
                          : 'bg-white/[0.05] border border-white/5 text-white/80'
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/[0.05] p-4 rounded-2xl flex gap-1 items-center">
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/5 bg-background/50">
                  <div className="relative">
                    <Input 
                      placeholder="Descreva seu problema ou empresa..."
                      className="h-14 bg-white/[0.05] border-white/10 pr-16 focus-visible:ring-primary/40 rounded-xl"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      size="icon" 
                      className="absolute right-2 top-2 h-10 w-10 bg-primary hover:bg-primary/90"
                      onClick={handleSendMessage}
                      disabled={isTyping}
                    >
                      <Send className="h-4 w-4 text-background" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="py-32 bg-white/[0.02]">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">Perguntas Frequentes</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* FAQ Questions List */}
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFaq(i)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                      activeFaq === i 
                      ? 'bg-white/5 border-primary/30 text-white shadow-lg' 
                      : 'bg-transparent border-transparent text-white/40 hover:text-white/70'
                    }`}
                  >
                    <span className="text-xl font-bold leading-tight block">
                      {faq.q}
                    </span>
                  </button>
                ))}
              </div>

              {/* FAQ Answer Display (Image Reference Style) */}
              <div className="relative lg:sticky lg:top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFaq}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden min-h-[450px] flex flex-col justify-center"
                  >
                    {/* Decorative Corner Brackets from reference image */}
                    <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                    <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                    <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20" />

                    <div className="relative">
                      {/* Floating glass card for answer text */}
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-2xl relative z-10 shadow-2xl">
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
                          {faqs[activeFaq].a}
                        </p>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[100px] rounded-full" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden">
        {/* Decorative elements for the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-12 backdrop-blur-sm">
               <Zap className="h-4 w-4 text-primary animate-pulse" />
               Pronto para o próximo nível?
             </div>

             <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-[1.1]">
               Sua empresa pode rodar mais rápido, <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/40">gastando menos energia.</span>
             </h2>

             <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-3xl mx-auto leading-relaxed">
               Pare de desperdiçar o ativo mais valioso do seu negócio: o tempo. Vamos desenhar juntos sua nova estrutura operacional.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
               <Button 
                 size="lg" 
                 className="h-20 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(5,56,69,0.3)] transition-all hover:scale-105 active:scale-95 group text-[#ffffff]"
               >
                 Agendar Consultoria de Diagnóstico
                 <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
               </Button>
             </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <div className="max-w-md text-left">
              <div className="flex items-center gap-3 mb-8">
                <img src={logoImage} alt="Buzzy Labs" className="h-10 w-10 rounded-full" />
                <span className="font-bold text-2xl tracking-tight">Buzzy Labs</span>
              </div>
              <p className="text-white/40 text-lg mb-8 leading-relaxed">
                Inteligência e Estratégia de Negócios para empresas que buscam escala real através da engenharia e automação.
              </p>
              <div className="flex gap-8 text-sm font-bold text-white/60">
                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-primary transition-colors">Email</a>
                <a href="#" className="hover:text-primary transition-colors">Contato</a>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-10 backdrop-blur-sm text-left">
              <h3 className="text-xl font-bold mb-4">Newsletter Estratégica</h3>
              <p className="text-white/40 mb-8 text-sm">Receba insights sobre automação e IA diretamente no seu e-mail corporativo.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Seu melhor e-mail" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/40"
                />
                <Button className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold rounded-xl whitespace-nowrap">
                  Inscrever-se
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs text-white/20 uppercase tracking-[0.3em]">
              © 2024 Buzzy Labs. Built for Scale.
            </div>
            <div className="flex gap-8 text-xs text-white/20 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
