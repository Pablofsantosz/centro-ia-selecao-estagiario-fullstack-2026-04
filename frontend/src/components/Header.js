export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 md:px-10 justify-between shrink-0">
      <div className="text-sm text-slate-500">
        Workspace <span className="mx-2">/</span> <span className="font-semibold text-slate-800">Gerador BDD</span>
      </div>
    </header>
  );
}