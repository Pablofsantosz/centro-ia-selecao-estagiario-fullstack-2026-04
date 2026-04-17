export default function Sidebar({ history = [], onSelectItem }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
      
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 tracking-tight">QA Assistant</h1>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">MVP v1.0</p>
        </div>
      </div>

      
      <nav className="px-4 pt-6 space-y-1">
        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ferramentas</p>
        <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm transition-colors mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
          Gerador BDD
        </button>
      </nav>

      
      <div className="flex-1 px-4 overflow-y-auto pb-4">
        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Histórico Recente</p>
        <div className="space-y-1">
          {history.length === 0 ? (
            <p className="px-3 text-[11px] text-slate-400 italic mt-2">Nenhum teste gerado ainda...</p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
              >
                <p className="text-[12px] font-medium text-slate-700 truncate group-hover:text-blue-600">
                  {item.userStory}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 rounded uppercase">BDD</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
            PF
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">Pablo Felipe</p>
            <p className="text-xs text-slate-500 truncate">QA & Fullstack</p>
          </div>
        </div>
      </div>
    </aside>
  );
}