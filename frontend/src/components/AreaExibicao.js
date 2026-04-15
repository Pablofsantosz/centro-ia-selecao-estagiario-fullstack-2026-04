

export default function AreaExibicao({ texto, carregando, modoLibras }) {
  return (
    <section className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md mb-8 border-2 border-blue-100 min-h-[160px] flex flex-col items-center justify-center text-center">
      
      {/*texto */}
      {carregando ? (
        <p className="text-xl text-gray-400 animate-pulse">{texto}</p>
      ) : (
        <p className="text-2xl md:text-3xl font-semibold text-gray-800">{texto}</p>
      )}

      {/*area exclusiva para libras ,so vai aparecer se tiver ativado */}
      {modoLibras && !carregando && texto !== "Clique em um ícone para começar..." && (
        <div className="mt-6 p-4 w-full bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center">
          <p className="text-sm text-purple-600 font-bold mb-2">Tradução em LIBRAS (Letra por Letra):</p>
          
          <div className="flex flex-wrap justify-center gap-2">
             {/*letras no formato de quadradinhos */}
             {texto.split('').map((letra, index) => (
                letra.trim() !== "" ? (
                  <span key={index} className="w-8 h-8 bg-purple-200 text-purple-800 font-bold flex items-center justify-center rounded">
                    {letra.toUpperCase()}
                  </span>
                ) : <span key={index} className="w-4"></span> 
             ))}
          </div>
        </div>
      )}
      
    </section>
  );
}