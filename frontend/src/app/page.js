"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [mensagem, setMensagem] = useState("Carregando...");

  useEffect(() => {
    // Faz a chamada para o nosso Back-end FastAPI
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => setMensagem(data.mensagem))
      .catch((error) => setMensagem("Erro ao conectar com a API"));
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mt-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Voz & Sinal Fácil 🗣️👐
        </h1>
        <p className="text-gray-700 text-lg">
          Status do Back-end: <br />
          <strong className="text-green-600 block mt-2">{mensagem}</strong>
        </p>
      </div>
    </main>
  );
}