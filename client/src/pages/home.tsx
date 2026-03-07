import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import Particle from "@/components/Particle";
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
  Gem,
  BarChart3,
  Layers,
  Settings2,
  Lock,
  Workflow,
  Loader2
} from "lucide-react";

import logoImage from "@assets/Buzzy_Labs_Bee_Blue_No-Frame_1767456786441.jpeg";

// CONFIGURAÇÃO EMAILJS (Substitua pelos seus dados do emailjs.com)
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID_DIAGNOSTICO = "YOUR_DIAGNOSTICO_TEMPLATE_ID";
const EMAILJS_TEMPLATE_ID_NEWSLETTER = "YOUR_NEWSLETTER_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

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
      ease: "easeOut" as any
    }
  })
};

function DiagnosticDialog({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Se as chaves estiverem configuradas, envia via EmailJS
    if (EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" && formRef.current) {
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_DIAGNOSTICO,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        toast.success("Diagnóstico solicitado com sucesso! Entraremos em contato em breve.");
        setOpen(false);
      } catch (err) {
        toast.error("Erro ao enviar e-mail. Verifique a configuração do EmailJS.");
      } finally {
        setLoading(false);
      }
    } else {
      // Simulação para desenvolvimento
      console.log("Simulando envio de diagnóstico (Chaves EmailJS não configuradas)");
      setTimeout(() => {
        toast.success("MOCK: Diagnóstico solicitado com sucesso!");
        setLoading(false);
        setOpen(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-card border-white/10 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Agendar Diagnóstico Executivo</DialogTitle>
          <DialogDescription className="text-white/40">
            Preencha os dados abaixo e um de nossos especialistas entrará em contato para uma análise personalizada.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" name="from_name" placeholder="Ex: João Silva" required className="bg-white/5 border-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <Input id="email" name="reply_to" type="email" placeholder="joao@empresa.com" required className="bg-white/5 border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <Input id="phone" name="phone" placeholder="(11) 99999-9999" required className="bg-white/5 border-white/10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Empresa</Label>
            <Input id="company" name="company" placeholder="Nome da sua empresa" required className="bg-white/5 border-white/10" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Principal Gargalo Operacional (Opcional)</Label>
            <Textarea id="message" name="message" placeholder="Conte-nos brevemente sobre seu desafio atual..." className="bg-white/5 border-white/10 min-h-[100px]" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Solicitar Diagnóstico"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);

    if (EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID") {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_NEWSLETTER,
          { email: newsletterEmail },
          EMAILJS_PUBLIC_KEY
        );
        toast.success("Inscrição realizada com sucesso!");
        setNewsletterEmail("");
      } catch (err) {
        toast.error("Erro ao realizar inscrição.");
      } finally {
        setNewsletterLoading(false);
      }
    } else {
      // Simulação para desenvolvimento
      console.log("Simulando inscrição de newsletter (Chaves EmailJS não configuradas)");
      setTimeout(() => {
        toast.success("MOCK: Inscrição na newsletter realizada!");
        setNewsletterEmail("");
        setNewsletterLoading(false);
      }, 1000);
    }
  };

  const faqs = [
    { q: "A tecnologia vai substituir minha equipe atual?", a: "Não, ela vai potencializar seu time. A automação e a IA assumem o trabalho repetitivo, permitindo que seus funcionários foquem em vendas, relacionamento e estratégia." },
    { q: "Minha empresa é pequena demais para IA?", a: "A IA é a ferramenta que nivela o jogo. Ela permite que uma operação enxuta tenha a capacidade de entrega de uma grande corporação." },
    { q: "Vou ficar refém de um sistema complexo?", a: "Pelo contrário, você ganhará liberdade. Nós cuidamos da complexidade técnica nos bastidores. Para você, o resultado é simplicidade." },
    { q: "Preciso trocar os softwares que já uso?", a: "Raramente. Nossa especialidade é fazer com que seus sistemas atuais conversem entre si de forma inteligente." },
    { q: "Qual é o retorno financeiro (ROI) esperado?", a: "O retorno é direto: redução de custos operacionais e aumento de receita pela agilidade no atendimento. Nossos clientes costumam recuperar o investimento nos primeiros meses." }
  ];

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
            <a href="#features" className="hover:text-primary transition-colors" data-testid="link-nav-features">Recursos</a>
            <a href="#pricing" className="hover:text-primary transition-colors" data-testid="link-nav-pricing">Preços</a>
            <a href="#faq" className="hover:text-primary transition-colors" data-testid="link-nav-faq">FAQ</a>
          </nav>

          <DiagnosticDialog>
            <Button className="font-bold px-6 bg-primary hover:bg-primary/90 text-[#ffffff]" size="default" data-testid="button-header-cta">
              Agendar Diagnóstico Executivo
            </Button>
          </DiagnosticDialog>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-black">
        <Particle />
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/20 via-transparent to-background" />

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
              <DiagnosticDialog>
                <Button size="lg" className="h-16 px-10 text-lg w-full sm:w-auto font-bold shadow-2xl shadow-primary/10 text-[#ffffff]" data-testid="button-hero-cta">
                  Agendar Diagnóstico Executivo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DiagnosticDialog>
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
              <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-3xl shadow-3xl">
                <div className="flex flex-col gap-12">
                  {/* Traditional Operation Side */}
                  <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-red-500/10 border-dashed group overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                       <Badge variant="outline" className="text-[10px] border-red-500/20 text-red-500/50 uppercase tracking-tighter">Ineficiente</Badge>
                    </div>
                    <p className="text-sm font-mono text-white/20 mb-6 uppercase tracking-widest">Operação Tradicional</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <FileText className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-white/40">Planilhas Manuais</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Clock className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-white/40">Gargalos de Espera</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Users className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-white/40">Dependência Humana</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Database className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-white/40">Dados Desconexos</span>
                      </div>
                    </div>
                    
                    {/* Visual noise/chaos elements */}
                    <div className="absolute -bottom-2 -right-2 h-20 w-20 bg-red-500/5 blur-2xl rounded-full" />
                  </div>
                  
                  {/* Transition Arrow */}
                  <div className="flex justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    </div>
                    <div className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.5)] z-10 animate-bounce">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Buzzy Ecosystem Side */}
                  <div className="relative p-8 rounded-2xl bg-primary/5 border border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.1)] group">
                    <div className="absolute top-0 right-0 p-3">
                       <Badge variant="outline" className="text-[10px] border-primary/40 text-primary uppercase tracking-tighter">Otimizado</Badge>
                    </div>
                    <p className="text-sm font-mono text-primary/80 mb-6 uppercase tracking-widest font-bold">Ecossistema Buzzy</p>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                       <div className="flex-1 p-5 rounded-xl bg-background/60 border border-primary/20 flex flex-col items-center justify-center text-center group-hover:border-primary/50 transition-colors">
                          <Zap className="h-8 w-8 text-primary mb-3 animate-pulse" />
                          <span className="text-[10px] font-bold text-white/60 uppercase">Fluxos Autônomos</span>
                       </div>
                       <div className="flex-1 p-5 rounded-xl bg-background/60 border border-primary/20 flex flex-col items-center justify-center text-center group-hover:border-primary/50 transition-colors">
                          <Network className="h-8 w-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white/60 uppercase">Integração Total</span>
                       </div>
                       <div className="flex-1 p-5 rounded-xl bg-background/60 border border-primary/20 flex flex-col items-center justify-center text-center group-hover:border-primary/50 transition-colors">
                          <LayoutDashboard className="h-8 w-8 text-primary mb-3" />
                          <span className="text-[10px] font-bold text-white/60 uppercase">Gestão em Tempo Real</span>
                       </div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-primary/10 blur-xl rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
      {/* Feature Highlights Section */}
      <section id="features" className="py-32 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Recursos de Alta Performance</h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">Tecnologia de ponta integrada para transformar sua operação em uma máquina de escala.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automação de Fluxo",
                desc: "Integração total entre CRMs, ERPs e ferramentas de comunicação para eliminar o trabalho manual.",
                icon: <Workflow className="h-6 w-6 text-primary" />,
                tag: "Eficiência"
              },
              {
                title: "IA Preditiva",
                desc: "Algoritmos que analisam dados em tempo real para prever gargalos e sugerir otimizações automáticas.",
                icon: <Brain className="h-6 w-6 text-primary" />,
                tag: "Inteligência"
              },
              {
                title: "Dashboards em Tempo Real",
                desc: "Visibilidade completa de todos os KPIs operacionais em uma única interface intuitiva.",
                icon: <BarChart3 className="h-6 w-6 text-primary" />,
                tag: "Visibilidade"
              },
              {
                title: "Infraestrutura Escalável",
                desc: "Arquitetura em nuvem que cresce conforme a demanda do seu negócio, sem perda de performance.",
                icon: <Layers className="h-6 w-6 text-primary" />,
                tag: "Escalabilidade"
              },
              {
                title: "Segurança de Dados",
                desc: "Protocolos de criptografia e conformidade LGPD para garantir a integridade das suas informações.",
                icon: <Lock className="h-6 w-6 text-primary" />,
                tag: "Segurança"
              },
              {
                title: "Customização Total",
                desc: "Soluções desenhadas especificamente para o seu modelo de negócio e necessidades únicas.",
                icon: <Settings2 className="h-6 w-6 text-primary" />,
                tag: "Flexibilidade"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary/70">{feature.tag}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Investimento Estratégico</h2>
            <p className="text-xl text-white/40">Planos flexíveis para diferentes estágios de crescimento.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Standard",
                price: "Sob Consulta",
                desc: "Ideal para operações que estão começando a automatizar processos críticos.",
                features: ["Mapeamento de 2 Processos", "Integração de 3 Ferramentas", "Dashboard Básico", "Suporte por E-mail"],
                cta: "Começar Agora",
                highlight: false
              },
              {
                name: "Pro",
                price: "Sob Consulta",
                desc: "Para empresas em escala que precisam de inteligência e automação robusta.",
                features: ["Mapeamento de 5 Processos", "Integração Ilimitada", "IA de Supervisão", "Dashboard Avançado", "Suporte Prioritário"],
                cta: "Falar com Especialista",
                highlight: true
              },
              {
                name: "Enterprise",
                price: "Customizado",
                desc: "Ecossistema completo sob medida para grandes operações e corporações.",
                features: ["Engenharia Dedicada", "SLA Garantido", "Infraestrutura Própria", "Consultoria Mensal", "Suporte 24/7"],
                cta: "Agendar Reunião",
                highlight: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`p-10 rounded-[2.5rem] flex flex-col h-full border transition-all duration-500 ${
                  plan.highlight 
                  ? 'bg-primary/5 border-primary/40 shadow-2xl shadow-primary/10 scale-105 z-10' 
                  : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/40 text-sm h-12">{plan.desc}</p>
                </div>
                <div className="mb-10">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/60">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full h-14 font-bold text-lg rounded-xl ${
                    plan.highlight 
                    ? 'bg-primary hover:bg-primary/90 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Trust / Social Proof Section */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-xl font-bold tracking-tighter text-white/40 uppercase">Trusted by Industry Leaders</div>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              {/* Placeholders for partner/client logos */}
              <div className="text-2xl font-black italic tracking-tighter">TECHFLOW</div>
              <div className="text-2xl font-black italic tracking-tighter">NEXUS AI</div>
              <div className="text-2xl font-black italic tracking-tighter">CORE SYSTEMS</div>
              <div className="text-2xl font-black italic tracking-tighter">VELOCITY</div>
            </div>
          </div>
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
               <DiagnosticDialog>
                 <Button 
                   size="lg" 
                   className="h-20 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(5,56,69,0.3)] transition-all hover:scale-105 active:scale-95 group text-[#ffffff]"
                 >
                   Agendar Consultoria de Diagnóstico
                   <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </DiagnosticDialog>
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
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Seu melhor e-mail" 
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus-visible:ring-primary/40"
                />
                <Button 
                  type="submit" 
                  disabled={newsletterLoading}
                  className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold rounded-xl whitespace-nowrap"
                >
                  {newsletterLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Inscrever-se"}
                </Button>
              </form>
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
