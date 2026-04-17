"use client";
import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data.data);
      } else {
        setResult("Erro ao gerar testes: " + (data.detail || "Erro desconhecido"));
      }
    } catch (error) {
      setResult("Erro de conexão. Verifique se o back-end está rodando.");
    } finally {
      setLoading(false);
    }
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
            placeholder="Ex: Como usuário, quero poder redefinir minha senha..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Aguarde..." : "Gerar Cenários e Automação"}
          </button>
        </form>

        {result && (
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md overflow-auto border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Resultado Gerado:</h2>
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {result}
            </pre>
          </div>
        )}

      </div>
    </main>
  );
}