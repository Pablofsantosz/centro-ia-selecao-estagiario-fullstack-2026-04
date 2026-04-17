"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GenerateForm from "../components/GenerateForm";
import CodeResult from "../components/CodeResult";

export default function Home() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  

  const [history, setHistory] = useState([]);

 
  useEffect(() => {
    const saved = localStorage.getItem("qa_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  const saveToHistory = (newResult) => {
    const historyItem = {
      id: Date.now(),
      userStory: description,
      gherkin: newResult.gherkin,
      cypress: newResult.cypress,
      date: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedHistory = [historyItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("qa_history", JSON.stringify(updatedHistory));
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!description.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

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

      if (!resGherkin.ok || !resCypress.ok) throw new Error("Erro na geração.");

      const dataGherkin = await resGherkin.json();
      const dataCypress = await resCypress.json();

      const finalResult = {
        gherkin: dataGherkin.data,
        cypress: dataCypress.data
      };

      setResult(finalResult);
      saveToHistory(finalResult); 

    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      
      <Sidebar 
        history={history} 
        onSelectItem={(item) => {
          setResult({ gherkin: item.gherkin, cypress: item.cypress });
          setDescription(item.userStory);
        }} 
      />

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
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
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