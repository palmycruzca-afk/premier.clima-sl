import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Sun, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Fan,
  Flame,
  ArrowRight,
  Send,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'split',
    message: '',
    zone: 'Casarrubuelos / Madrid Sur'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // AI Advisor state
  const [aiData, setAiData] = useState({
    propertyType: 'Piso / Vivienda',
    areaSqm: '90',
    needs: 'Aire acondicionado frío y calor para salón y dormitorios',
    location: 'Madrid Sur'
  });
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.setProperty('--pointer-x', `${e.clientX}px`);
    shell.style.setProperty('--pointer-y', `${e.clientY}px`);
    shell.style.setProperty('--pointer-opacity', '1');
  };

  const handlePointerLeave = () => {
    shellRef.current?.style.setProperty('--pointer-opacity', '0.45');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const subject = `Solicitud de presupuesto - ${formData.service}`;
    const body = [
      `Nombre: ${formData.name}`,
      `Teléfono: ${formData.phone}`,
      `Correo: ${formData.email || 'No indicado'}`,
      `Servicio: ${formData.service}`,
      `Zona: ${formData.zone}`,
      '',
      `Detalles: ${formData.message || 'No indicados'}`
    ].join('\n');
    const mailtoUrl = `mailto:juancarlos.premierclima@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const openQuoteEmail = () => {
      const emailWindow = window.open(mailtoUrl, '_blank');
      if (!emailWindow) window.location.href = mailtoUrl;
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        openQuoteEmail();
        setFormSubmitted(true);
        setFormData({ name: '', phone: '', email: '', service: 'split', message: '', zone: 'Casarrubuelos / Madrid Sur' });
      }
    } catch (err) {
      console.error(err);
      openQuoteEmail();
      setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiData)
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
      setAiResult({
        recommendation: 'Recomendamos un sistema inverter de alta eficiencia energética adaptado a sus metros cuadrados y distribución.',
        systemType: 'Bomba de Calor Inverter',
        estimatedEfficiency: 'Clase A++'
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Scroll spy or smooth section navigation
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={shellRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="site-shell pointer-playground min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden"
    >
      
      {/* Floating WhatsApp Button (Fixed, follows scrolling) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-bounce hover:animate-none">
        <a 
          href="https://wa.me/34629534991?text=Hola,%20me%20gustaría%20solicitar%20presupuesto%20de%20climatización" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/40 backdrop-blur-md"
          title="WhatsApp directo"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      <div className="pointer-aura" aria-hidden="true">
        <span className="pointer-aura__core"></span>
        <span className="pointer-aura__ring"></span>
      </div>

      {/* Top Header & Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-blue-900/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Company Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            {/* 21st.dev style animated fan logo */}
            <div className="relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 overflow-hidden group border border-cyan-300/30">
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm"></div>
              <div className="absolute inset-1 rounded-xl border border-white/25 animate-pulse"></div>
              <Fan className="relative w-11 h-11 sm:w-12 sm:h-12 text-white animate-spin duration-1000 group-hover:scale-110 transition-transform" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow">
                PREMIER CLIMA SL
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold text-blue-200 tracking-wider uppercase">
                Aire Acondicionado y Calefacción
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-full border border-blue-900/50 shadow-inner">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'instalaciones', label: 'Instalaciones' },
              { id: 'equipo', label: 'Técnicos' },
              { id: 'zona', label: 'Zona' },
              { id: 'asistente', label: 'Asistente IA' },
              { id: 'contacto', label: 'Contacto' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick CTA WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/34629534991?text=Hola,%20me%20gustaría%20solicitar%20presupuesto%20de%20climatización"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chatear por WhatsApp</span>
            </a>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Pedir Presupuesto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-blue-900/50 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-fadeIn">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'instalaciones', label: 'Instalaciones Reales' },
              { id: 'equipo', label: 'Nuestros Técnicos' },
              { id: 'zona', label: 'Zona de Trabajo' },
              { id: 'asistente', label: 'Asistente IA' },
              { id: 'contacto', label: 'Contacto y Presupuestos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-blue-950/60 hover:text-cyan-400 transition-colors border border-transparent hover:border-blue-800/40"
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:629534991"
                className="flex items-center justify-center gap-2 bg-blue-900/60 text-blue-200 py-3 rounded-xl font-bold border border-blue-700/50"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Llamar a Juan Carlos: 629 534 991</span>
              </a>
              <a
                href="tel:722349785"
                className="flex items-center justify-center gap-2 bg-blue-900/60 text-blue-200 py-3 rounded-xl font-bold border border-blue-700/50"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Llamar a Diego: 722 349 785</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-surface relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,116,144,0.15),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="hero-halo" aria-hidden="true">
          <span className="hero-halo__spark"></span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 px-4 py-2 rounded-full text-cyan-300 text-sm font-medium shadow-inner">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Especialistas en Climatización y Confort en Madrid Sur y Toledo</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                PREMIER CLIMA <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">SL</span>
                <span className="block text-2xl sm:text-4xl font-bold mt-2 text-slate-300">
                  Aire Acondicionado y Calefacción
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Expertos certificados en climatización para hogares y empresas. Instalación profesional de aire acondicionado con bomba de calor, aerotermia, placas solares y mantenimiento especializado desde Casarrubuelos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1 border border-blue-400/30"
                >
                  <span>Solicitar Presupuesto</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="https://wa.me/34629534991?text=Hola,%20me%20gustaría%20solicitar%20presupuesto%20de%20climatización"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1 border border-emerald-400/30"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chatear por WhatsApp</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-blue-900/40 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Técnicos Certificados</h4>
                    <p className="text-xs text-slate-400">Juan Carlos y Diego</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Casarrubuelos</h4>
                    <p className="text-xs text-slate-400">Madrid Sur y Toledo</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="p-2 bg-blue-900/30 rounded-lg text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Calidad Garantizada</h4>
                    <p className="text-xs text-slate-400">Particulares y Empresas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / 21st.dev style UI element */}
            <div className="lg:col-span-5">
              <div className="glass-panel relative bg-gradient-to-b from-blue-900/30 via-slate-900/80 to-slate-950 p-6 sm:p-8 rounded-3xl border border-blue-600/30 shadow-2xl backdrop-blur-xl">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  PREMIER CLIMA SL
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Fan className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Sistemas de Climatización Avanzada</span>
                </h3>

                <div className="space-y-4">
                  {[
                    { title: 'Aire Acondicionado (Split, Cassette, Conductos)', desc: 'Con bomba de calor para frío y calor todo el año.' },
                    { title: 'Aerotermia y Placas Solares', desc: 'Máximo ahorro energético y sostenibilidad para su hogar.' },
                    { title: 'Mantenimiento para Empresas', desc: 'Planes preventivos y correctivos adaptados a su negocio.' },
                    { title: 'Reparaciones Especializadas', desc: 'Servicio técnico seleccionado, sujeto a previa valoración.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/30 hover:border-blue-500/50 transition-all">
                      <div className="p-1.5 bg-blue-600 text-white rounded-xl mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-blue-900/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Atención Directa</span>
                    <span className="text-sm font-bold text-cyan-400">Juan Carlos & Diego</span>
                  </div>
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-md"
                  >
                    Contactar Ahora
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-slate-900/60 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-kicker text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Nuestros Servicios</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Soluciones Integrales de Climatización y Calefacción
            </h3>
            <p className="text-slate-300 mt-4 text-base">
              Diseñamos, instalamos y mantenemos equipos de alta eficiencia tanto para viviendas particulares como para empresas e industrias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Service 1 */}
            <div className="interactive-card bg-slate-950 p-6 rounded-3xl border border-blue-900/40 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <Fan className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Aire Acondicionado con Bomba de Calor</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Instalación profesional de sistemas <strong className="text-cyan-300">Split, Cassette y Conductos</strong>. Climatización óptima con frío y calor para disfrutar de la temperatura perfecta todo el año.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Particulares y Negocios</span>
                <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold text-white hover:text-cyan-300 flex items-center gap-1">
                  <span>Pedir presupuesto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="interactive-card bg-slate-950 p-6 rounded-3xl border border-blue-900/40 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-sky-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                  <Sun className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Aerotermia y Placas Solares</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Apueste por las energías renovables. Sistemas de aerotermia de alta eficiencia y autoconsumo fotovoltaico para reducir drásticamente la factura energética de su hogar o empresa.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Energía Sostenible</span>
                <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold text-white hover:text-cyan-300 flex items-center gap-1">
                  <span>Pedir presupuesto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="interactive-card bg-slate-950 p-6 rounded-3xl border border-blue-900/40 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                  <Building2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Mantenimiento para Empresas</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Planes de mantenimiento preventivo y normativo para oficinas, locales comerciales y naves. Garantice el rendimiento continuo y alargue la vida útil de sus equipos de climatización.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Planes a Medida</span>
                <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold text-white hover:text-cyan-300 flex items-center gap-1">
                  <span>Pedir presupuesto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service 4 */}
            <div className="interactive-card bg-slate-950 p-6 rounded-3xl border border-blue-900/40 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-sky-600 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-sky-500/20">
                  <Wrench className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Reparaciones Seleccionadas</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Servicio de reparaciones técnicas especializadas, sujetas a previa valoración por parte de nuestros técnicos certificados para asegurar la viabilidad y calidad de la intervención.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Sujeto a Valoración</span>
                <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold text-white hover:text-cyan-300 flex items-center gap-1">
                  <span>Consultar avería</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Installations Showcase Section */}
      <section id="instalaciones" className="py-20 bg-slate-950 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Instalaciones Típicas</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Así es como integramos la climatización en su espacio
            </h3>
            <p className="text-slate-300 mt-4 text-base">
              Montajes limpios, discretos y altamente eficientes adaptados a cada tipo de estancia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Salon / Split AC */}
            <div className="bg-slate-900 rounded-3xl border border-blue-900/50 overflow-hidden shadow-2xl flex flex-col">
              <div className="relative h-64 sm:h-80 bg-slate-800 overflow-hidden group">
                <img 
                  src="/images/slipt.avif" 
                  alt="Salón elegante con aparato de aire acondicionado split instalado en la pared"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-blue-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-700/50 text-xs font-bold text-cyan-300">
                  Viviendas y Estancias Residenciales
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">AIRE ACONDICIONADO SPLIT</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Unidad interior mural instalada en la pared, ideal para salones y dormitorios. Ofrece frío y calor con una distribución directa y eficiente del aire.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Instalación en 1 jornada</span>
                  <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all">
                    Solicitar Split
                  </button>
                </div>
              </div>
            </div>

            {/* Office / Cassette AC */}
            <div className="bg-slate-900 rounded-3xl border border-blue-900/50 overflow-hidden shadow-2xl flex flex-col">
              <div className="relative h-64 sm:h-80 bg-slate-800 overflow-hidden group">
                <img 
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Office%20room%20with%20Westpoint%20ceiling%20cassette%20air%20conditioners.jpg?width=1200" 
                  alt="Oficina con máquina de aire acondicionado cassette instalada en el techo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-blue-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-700/50 text-xs font-bold text-cyan-300">
                  Oficinas y Locales Comerciales
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">AIRE ACONDICIONADO CASSETTE</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Unidad cassette empotrada en el techo de la oficina, con impulsión del aire en varias direcciones para climatizar el espacio de forma uniforme.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Confort uniforme en oficinas</span>
                  <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all">
                    Solicitar Cassette
                  </button>
                </div>
              </div>
            </div>

            {/* Office / Ducted AC */}
            <div className="bg-slate-900 rounded-3xl border border-blue-900/50 overflow-hidden shadow-2xl flex flex-col">
              <div className="relative h-64 sm:h-80 bg-slate-800 overflow-hidden group">
                <img 
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Office%20Drop%20Ceiling%20HVAC%20Vents%20and%20Lights.jpg?width=1200" 
                  alt="Oficina con instalación de aire acondicionado por conductos y rejillas en el techo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-blue-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-700/50 text-xs font-bold text-cyan-300">
                  Climatización Integrada
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">AIRE ACONDICIONADO POR CONDUCTOS</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Unidad interior oculta en el falso techo y conectada a conductos, con rejillas discretas que reparten el aire por toda la oficina o vivienda.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-blue-950 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estética limpia y discreta</span>
                  <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all">
                    Solicitar Conductos
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section - Juan Carlos & Diego in complete equality */}
      <section id="equipo" className="py-20 bg-slate-900/40 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Nuestros Técnicos</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Profesionales Certificados a Su Servicio
            </h3>
            <p className="text-slate-300 mt-4 text-base">
              En PREMIER CLIMA SL contamos con técnicos titulados con amplia cualificación para garantizar el correcto dimensionamiento, instalación y mantenimiento de sus equipos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            
            {/* Juan Carlos */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-blue-900/50 shadow-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  JC
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Juan Carlos</h4>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mt-0.5">Técnico Certificado</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Especialista en instalaciones de climatización, aerotermia y asesoramiento técnico personalizado en Madrid Sur y Toledo.
              </p>
              <div className="space-y-3 pt-4 border-t border-blue-950">
                <a href="tel:629534991" className="flex items-center gap-3 text-sm text-cyan-300 hover:text-white font-medium transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>629 534 991</span>
                </a>
                <a href="mailto:juancarlos.premierclima@gmail.com" className="flex items-center gap-3 text-sm text-cyan-300 hover:text-white font-medium transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>juancarlos.premierclima@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Diego */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-blue-900/50 shadow-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  D
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Diego</h4>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mt-0.5">Técnico Certificado</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Especialista en montaje, mantenimiento industrial y optimización de sistemas de calefacción y aire acondicionado.
              </p>
              <div className="space-y-3 pt-4 border-t border-blue-950">
                <a href="tel:722349785" className="flex items-center gap-3 text-sm text-cyan-300 hover:text-white font-medium transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>722 349 785</span>
                </a>
                <a href="mailto:diego.premierclima@gmail.com" className="flex items-center gap-3 text-sm text-cyan-300 hover:text-white font-medium transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>diego.premierclima@gmail.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Zone Section */}
      <section id="zona" className="py-20 bg-slate-950 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 px-4 py-2 rounded-full text-cyan-300 text-sm font-medium">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Casarrubuelos, Madrid Sur y Toledo</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Área de Cobertura y Desplazamiento
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                Nuestra sede principal está ubicada en <strong className="text-white">Casarrubuelos (Madrid)</strong>, desde donde operamos principalmente en todo el <strong className="text-cyan-300">Madrid Sur y la provincia de Toledo</strong>.
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                Nos desplazamos a otras zonas y localidades según las características y necesidades de cada proyecto. Consúltenos sin compromiso.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-blue-900/40">
                  <h4 className="font-bold text-white text-sm mb-1">Madrid Sur</h4>
                  <p className="text-xs text-slate-400">Getafe, Leganés, Fuenlabrada, Parla, Valdemoro, Casarrubuelos...</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-blue-900/40">
                  <h4 className="font-bold text-white text-sm mb-1">Toledo y Alrededores</h4>
                  <p className="text-xs text-slate-400">Illescas, Seseña, Yeles, Borox y comarca.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-blue-950/60 to-slate-900 p-8 rounded-3xl border border-blue-800/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-blue-800/20 pointer-events-none">
                  <MapPin className="w-48 h-48" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Sede Central PREMIER CLIMA SL</h4>
                <div className="space-y-4 text-slate-300 text-sm relative z-10">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block">Casarrubuelos (Madrid)</strong>
                      <span className="text-slate-400 text-xs">Atención profesional para particulares y empresas</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block">Teléfonos de Contacto Directo:</strong>
                      <span className="text-cyan-300 text-xs block">Juan Carlos: 629 534 991</span>
                      <span className="text-cyan-300 text-xs block">Diego: 722 349 785</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white block">Correo Electrónico:</strong>
                      <span className="text-slate-300 text-xs block">juancarlos.premierclima@gmail.com</span>
                      <span className="text-slate-300 text-xs block">diego.premierclima@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Climate Advisor Section */}
      <section id="asistente" className="py-20 bg-gradient-to-b from-slate-900/60 to-slate-950 border-t border-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 px-4 py-2 rounded-full text-cyan-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Asistente Técnico Inteligente</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ¿Qué sistema de climatización necesita?
            </h3>
            <p className="text-slate-300 mt-3 text-sm">
              Indíquenos los datos básicos de su espacio y nuestro asistente técnico le sugerirá la mejor opción energética.
            </p>
          </div>

          <div className="bg-slate-950 p-8 rounded-3xl border border-blue-900/50 shadow-2xl">
            <form onSubmit={handleAiConsult} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Tipo de Inmueble</label>
                  <select
                    value={aiData.propertyType}
                    onChange={(e) => setAiData({...aiData, propertyType: e.target.value})}
                    className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Piso / Vivienda">Piso / Vivienda</option>
                    <option value="Casa / Chalet unifamiliar">Casa / Chalet unifamiliar</option>
                    <option value="Oficina / Local comercial">Oficina / Local comercial</option>
                    <option value="Nave / Empresa">Nave / Empresa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Superficie (m² aprox.)</label>
                  <input
                    type="text"
                    value={aiData.areaSqm}
                    onChange={(e) => setAiData({...aiData, areaSqm: e.target.value})}
                    className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. 90"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Necesidades o Estancias</label>
                <input
                  type="text"
                  value={aiData.needs}
                  onChange={(e) => setAiData({...aiData, needs: e.target.value})}
                  className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                  placeholder="Ej. Aire acondicionado en salón y dormitorios"
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm uppercase tracking-wider"
              >
                {aiLoading ? (
                  <span>Analizando con criterio técnico...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Obtener Recomendación Técnica</span>
                  </>
                )}
              </button>
            </form>

            {aiResult && (
              <div className="mt-8 p-6 bg-blue-950/60 rounded-2xl border border-cyan-500/40 animate-fadeIn">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500 text-slate-950 rounded-xl font-bold text-xs">
                    {aiResult.systemType}
                  </div>
                  <span className="text-xs font-semibold text-cyan-300">Eficiencia: {aiResult.estimatedEfficiency}</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {aiResult.recommendation}
                </p>
                <div className="mt-4 pt-4 border-t border-blue-900/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">¿Le interesa esta opción?</span>
                  <button onClick={() => scrollToSection('contacto')} className="text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-xl transition-all">
                    Solicitar este presupuesto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact & Quote Form Section */}
      <section id="contacto" className="py-20 bg-slate-900/60 border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 px-4 py-2 rounded-full text-cyan-300 text-sm font-medium">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Contacto Directo</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Hable con nuestros técnicos
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                Contacte directamente con Juan Carlos o Diego por teléfono, correo electrónico, WhatsApp o completando el formulario. Le atenderemos con profesionalidad y cercanía.
              </p>

              <div className="space-y-4 pt-4">
                
                {/* Juan Carlos Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-blue-900/60 flex items-center justify-between shadow-md">
                  <div>
                    <h4 className="font-bold text-white text-base">Juan Carlos</h4>
                    <span className="text-xs text-cyan-400 block mt-0.5">Técnico Certificado</span>
                    <a href="tel:629534991" className="text-sm font-bold text-white hover:text-cyan-300 block mt-2">
                      629 534 991
                    </a>
                    <a href="mailto:juancarlos.premierclima@gmail.com" className="text-xs text-slate-300 hover:text-cyan-300 block">
                      juancarlos.premierclima@gmail.com
                    </a>
                  </div>
                  <a
                    href="https://wa.me/34629534991?text=Hola,%20me%20gustaría%20solicitar%20presupuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg transition-transform hover:scale-105"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                </div>

                {/* Diego Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-blue-900/60 flex items-center justify-between shadow-md">
                  <div>
                    <h4 className="font-bold text-white text-base">Diego</h4>
                    <span className="text-xs text-cyan-400 block mt-0.5">Técnico Certificado</span>
                    <a href="tel:722349785" className="text-sm font-bold text-white hover:text-cyan-300 block mt-2">
                      722 349 785
                    </a>
                    <a href="mailto:diego.premierclima@gmail.com" className="text-xs text-slate-300 hover:text-cyan-300 block">
                      diego.premierclima@gmail.com
                    </a>
                  </div>
                  <a
                    href="https://wa.me/34722349785?text=Hola,%20me%20gustaría%20solicitar%20presupuesto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg transition-transform hover:scale-105"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl border border-blue-900/50 shadow-2xl relative">
                <h4 className="text-2xl font-bold text-white mb-2">Solicitar Presupuesto</h4>
                <p className="text-slate-300 text-sm mb-6">
                  Complete el formulario y se abrirá un correo dirigido a <a href="mailto:juancarlos.premierclima@gmail.com" className="text-cyan-300 hover:text-cyan-200 underline">Juan Carlos</a> para tramitar su solicitud.
                </p>

                {formSubmitted ? (
                  <div className="p-8 bg-blue-950/80 rounded-2xl border border-emerald-500/50 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-white">¡Presupuesto Solicitado con Éxito!</h5>
                    <p className="text-sm text-slate-300">
                      Hemos recibido sus datos correctamente. Juan Carlos o Diego le contactarán muy pronto.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-all"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nombre y Apellidos *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                          placeholder="Su nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Teléfono de Contacto *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                          placeholder="Ej. 600 000 000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                          placeholder="correo@ejemplo.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Servicio Solicitado</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({...formData, service: e.target.value})}
                          className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                        >
                          <option value="split">Aire Acondicionado Split / Bomba de Calor</option>
                          <option value="cassette">Aire Acondicionado Cassette</option>
                          <option value="conductos">Aire Acondicionado por Conductos</option>
                          <option value="aerotermia">Aerotermia y Placas Solares</option>
                          <option value="empresas">Mantenimiento para Empresas</option>
                          <option value="reparacion">Reparación (Sujeta a Valoración)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Localidad / Zona</label>
                      <input
                        type="text"
                        value={formData.zone}
                        onChange={(e) => setFormData({...formData, zone: e.target.value})}
                        className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                        placeholder="Ej. Casarrubuelos, Getafe, Illescas..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Detalles del Proyecto o Consulta</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-900 border border-blue-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                        placeholder="Describa brevemente lo que necesita..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/30 transition-all text-sm uppercase tracking-wider"
                    >
                      {formLoading ? (
                        <span>Enviando presupuesto...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Solicitud de Presupuesto</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-blue-950 py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white">
                  <Fan className="w-6 h-6 animate-spin" style={{ animationDuration: '5s' }} />
                </div>
                <span className="text-xl font-black text-white tracking-tight">PREMIER CLIMA SL</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Empresa especializada en climatización, aire acondicionado con bomba de calor, aerotermia y mantenimiento en Casarrubuelos, Madrid Sur y Toledo.
              </p>
              <div className="text-xs text-slate-500">
                © {new Date().getFullYear()} PREMIER CLIMA SL. Todos los derechos reservados.
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold text-base mb-4">Técnicos de Contacto</h5>
              <div className="space-y-3 text-xs">
                <div>
                  <strong className="text-slate-200 block">Juan Carlos</strong>
                  <a href="tel:629534991" className="text-cyan-400 hover:underline">629 534 991</a> — <a href="mailto:juancarlos.premierclima@gmail.com" className="hover:underline">juancarlos.premierclima@gmail.com</a>
                </div>
                <div>
                  <strong className="text-slate-200 block">Diego</strong>
                  <a href="tel:722349785" className="text-cyan-400 hover:underline">722 349 785</a> — <a href="mailto:diego.premierclima@gmail.com" className="hover:underline">diego.premierclima@gmail.com</a>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold text-base mb-4">Sede y Ubicación</h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Casarrubuelos (Madrid).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trabajos en Madrid Sur, Toledo y proyectos personalizados en otras zonas.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
            PREMIER CLIMA SL — Aire Acondicionado y Calefacción profesional.
          </div>
        </div>
      </footer>

    </div>
  );
}
