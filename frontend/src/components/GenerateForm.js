export default function GenerateForm({ description, setDescription, handleGenerate, handleKeyDown, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        Descrição da funcionalidade (User Story)
      </label>

      <textarea
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-y min-h-[120px]"
        placeholder="Ex: Como utilizador, quero fazer login com e-mail e password para aceder ao sistema..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <span className="text-xs text-slate-400 hidden sm:block">
          Dica: Pressione <kbd className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 font-mono">Ctrl</kbd> + <kbd className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 font-mono">Enter</kbd> para gerar
        </span>
        
        <button 
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 px-6 rounded-lg transition-all active:scale-[0.98]"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              A processar...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5,3 19,12 5,21"/></svg>
              Gerar código Cypress
            </>
          )}
        </button>
      </div>
    </div>
  );
}