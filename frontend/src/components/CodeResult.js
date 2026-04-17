"use client";
import { useState } from "react";

export default function CodeResult({ result, handleCopy, copied }) {
  
  const [activeTab, setActiveTab] = useState("gherkin");

  if (!result || !result.gherkin) return null;

  
  const currentContent = activeTab === "gherkin" ? result.gherkin : result.cypress;
  const currentFileName = activeTab === "gherkin" ? "cenarios.feature" : "testes.cy.js";

  return (
    <div className="bg-[#0E1117] rounded-xl shadow-lg border border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      
      <div className="flex border-b border-slate-800 bg-[#0A0C10]">
        <button
          onClick={() => setActiveTab("gherkin")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "gherkin" 
              ? "text-blue-400 border-b-2 border-blue-500 bg-[#161B22]" 
              : "text-slate-500 hover:text-slate-300 hover:bg-[#161B22]/50"
          }`}
        >
          📝 Cenários BDD (Gherkin)
        </button>
        <button
          onClick={() => setActiveTab("cypress")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "cypress" 
              ? "text-green-400 border-b-2 border-green-500 bg-[#161B22]" 
              : "text-slate-500 hover:text-slate-300 hover:bg-[#161B22]/50"
          }`}
        >
          💻 Código Cypress
        </button>
      </div>

      
      <div className="bg-[#161B22] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs font-mono text-slate-400">{currentFileName}</span>
        </div>
        
        <button 
          onClick={() => handleCopy(currentContent)}
          className="text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
        >
          {copied ? "Copiado ✓" : "Copiar"}
        </button>
      </div>

      
      <div className="p-6 overflow-x-auto max-h-[400px] overflow-y-auto">
        <pre className="text-blue-100 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {currentContent}
        </pre>
      </div>
    </div>
  );
}