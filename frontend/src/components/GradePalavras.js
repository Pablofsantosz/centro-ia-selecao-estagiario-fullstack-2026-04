
const PALAVRAS = [
  { id: "agua", label: "Água", emoji: "💧" },
  { id: "comida", label: "Comida", emoji: "🍎" },
  { id: "banheiro", label: "Banheiro", emoji: "🚽" },
  { id: "dor", label: "Dor", emoji: "🤕" },
  { id: "feliz", label: "Feliz", emoji: "😊" },
  { id: "cansado", label: "Cansado", emoji: "🥱" },
];

export default function GradePalavras({ onPalavraClick, bloqueado }) {
  return (
    <section className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 gap-4">
      {PALAVRAS.map((item) => (
        <button
          key={item.id}
          onClick={() => onPalavraClick(item)}
          disabled={bloqueado}
          className="bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center transition-all shadow-sm disabled:opacity-50"
        >
          <span className="text-5xl mb-3">{item.emoji}</span>
          <span className="text-lg font-bold text-gray-700">{item.label}</span>
        </button>
      ))}
    </section>
  );
}
