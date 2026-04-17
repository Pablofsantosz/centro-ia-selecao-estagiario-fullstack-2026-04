"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            QA
          </div>
          <span className="text-xl font-bold tracking-tight">Assistant</span>
        </div>
        <Link 
          href="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md shadow-blue-200"
        >
          Aceder ao App
        </Link>
      </nav>

      
      <main className="max-w-5xl mx-auto px-8 py-20 text-center">
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          IA para Engenharia de Qualidade
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mt-6 tracking-tight">
          Transforme requisitos em <br />
          <span className="text-blue-600">testes automatizados.</span>
        </h1>
        <p className="text-lg text-slate-500 mt-8 max-w-2xl mx-auto leading-relaxed">
          O QA Assistant utiliza inteligência artificial para converter User Stories em 
          cenários BDD Gherkin e código Cypress pronto para produção. 
          Economize 80% do tempo de escrita de testes.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Começar a Gerar Gratuitamente
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto text-slate-600 font-medium px-8 py-4 hover:text-blue-600 transition-colors"
          >
            Ver funcionalidades ↓
          </a>
        </div>

        
        <div className="mt-20 relative p-2 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-700">
          <div className="bg-slate-900 rounded-2xl p-6 text-left font-mono text-sm text-blue-300">
             <p>{"// Exemplo de saída IA"}</p>
             <p className="mt-2 text-green-400 font-bold">Cenário: Login com sucesso</p>
             <p>Dado que estou na página de login...</p>
             <p>Quando insiro credenciais válidas...</p>
             <p>Então devo ser redirecionado ao dashboard.</p>
          </div>
        </div>
      </main>

      
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="text-xl font-bold">Geração Instantânea</h3>
            <p className="text-slate-500 leading-relaxed">Converta qualquer história de usuário em cenários de teste em menos de 3 segundos.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-bold">Padrão Gherkin</h3>
            <p className="text-slate-500 leading-relaxed">Cenários estruturados para BDD, prontos para serem compartilhados com stakeholders e devs.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="text-xl font-bold">Automação Cypress</h3>
            <p className="text-slate-500 leading-relaxed">Geração de código Cypress limpo, modular e seguindo as melhores práticas da indústria.</p>
          </div>
        </div>
      </section>

      
      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-100">
        © 2026 QA Assistant - Projeto de Desafio Técnico por Pablo Felipe
      </footer>
    </div>
  );
}