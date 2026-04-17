"use client";
import { useState } from "react";

export default function Home() {

  const [description, setDescription] = useState("");

  
  const handleGenerate = (e) => {
    e.preventDefault(); 
    alert("forms pegando " + description);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-600">QA Assistant AI</h1>
          <p className="text-gray-600">Gerador automático de cenários BDD e automação em Cypress</p>
        </header>


        <form onSubmit={handleGenerate} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <label className="block text-sm font-medium text-gray-700">
            Descreva a Funcionalidade (User Story):
          </label>
          
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            rows="4"
            placeholder="Ex: Como usuário, quero poder redefinir minha senha clicando em 'Esqueci minha senha' na tela de login."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Gerar Cenários e Automação
          </button>
        </form>
        

      </div>
    </main>
  );
}