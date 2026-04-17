export default function CodeResult({ result, handleCopy, copied }) {
  if (!result) return null;

  return (
    <div className="bg-[#0E1117] rounded-xl shadow-lg border border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#161B22] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs font-mono text-slate-400">cypress/e2e/testes.cy.js</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className="text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
        >
          {copied ? "Copiado ✓" : "Copiar"}
        </button>
      </div>

      <div className="p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
        <pre className="text-blue-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {result}
        </pre>
      </div>
    </div>
  );
}