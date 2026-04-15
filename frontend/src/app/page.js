"use client";

import { useState } from "react";
import GradePalavras from "../components/GradePalavras";
import AreaExibicao from "../components/AreaExibicao";


export default function Home() {
    const [modoLibras, setModoLibras] = useState(false);
    const [fraseGerada, setFraseGerada] = useState("Clique em um ícone para começar...");
    const [carregando, setCarregando] = useState(false);

    const handlePalavraClick = async (palavra) => {
      setCarregando(true);
      setFraseGerada(`Gerando frase para: ${palavra.label}...`);
      
      //teste
      setTimeout(() => {
        setFraseGerada(`Eu quero ${palavra.label.toLowerCase()} agora`);
        setCarregando(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center font-sans">
     <header className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Voz Fácil 🗣️</h1>
        
        <button 
          onClick={() => setModoLibras(!modoLibras)}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            modoLibras ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {modoLibras ? "👐 LIBRAS Ativo" : "🗣️ Voz Ativa"}
        </button>
      </header>


      <AreaExibicao 
        texto={fraseGerada} 
        carregando={carregando} 
        modoLibras={modoLibras} 
      />
      <GradePalavras 
        onPalavraClick={handlePalavraClick} 
        bloqueado={carregando} 
      />

    </main>
  );
}