"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GenerateForm from "../components/GenerateForm";
import CodeResult from "../components/CodeResult";

export default function Home() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  }
  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!description.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      
      const [resGherkin, resCypress] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/generate/gherkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }),
        fetch("http://127.0.0.1:8000/api/generate/cypress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        })
      ]);

      const dataGherkin = await resGherkin.json();
      const dataCypress = await resCypress.json();

      if (resGherkin.ok && resCypress.ok) {
        
        setResult({
          gherkin: dataGherkin.data,
          cypress: dataCypress.data
        });
      } else {
        setError("Erro ao gerar uma das partes dos testes.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        <Header />

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-6">
            
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Automação com IA</h2>
              <p className="text-slate-500 mt-1">Transforme requisitos em testes Cypress e cenários BDD em segundos.</p>
            </div>

            
            <GenerateForm 
              description={description}
              setDescription={setDescription}
              handleGenerate={handleGenerate}
              handleKeyDown={handleKeyDown}
              loading={loading}
            />

            
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm animate-in fade-in slide-in-from-bottom-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            
            <CodeResult 
              result={result}
              handleCopy={handleCopy}
              copied={copied}
            />

          </div>
        </div>
      </main>
    </div>
  );
}