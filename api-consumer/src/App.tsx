import { useState, useMemo, useEffect } from 'react';
import { useProducts } from './hooks/useProduct';
import { ProductDisplay } from './components/ProductDisplay';
import { 
  LayoutGrid, List, ShoppingBag, ChevronLeft, 
  ChevronRight, Search, Filter, PackageOpen 
} from 'lucide-react';

function App() {
  const { products, loading } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Extrair categorias únicas para o filtro
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['todos', ...Array.from(new Set(cats))];
  }, [products]);

  // Lógica de Filtragem (UX: Filtra conforme digita)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Paginação baseada nos filtrados
  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Função para mudar a busca e resetar a página ao mesmo tempo
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset direto no evento
  };

  // Função para mudar a categoria e resetar a página
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset direto no evento
  };

  // UX: Voltar ao topo ao mudar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">Preparando vitrine...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER DINÂMICO */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-blue-200 shadow-lg">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Katayama<span className="text-blue-600">.</span>
              </h1>
            </div>

            {/* BARRA DE BUSCA (UI: Input com ícone e foco estilizado) */}
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-700"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* CONTROLES DE VIEW */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* FILTRO DE CATEGORIAS (UI: Chips deslizantes) */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTAGEM OU EMPTY STATE */}
        {filteredProducts.length > 0 ? (
          <section className={`
            grid gap-8 transition-all duration-500
            ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
          `}>
            {currentItems.map(p => (
              <ProductDisplay key={p.id} product={p} viewMode={viewMode} />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <PackageOpen size={80} strokeWidth={1} className="mb-4" />
            <h2 className="text-xl font-semibold text-slate-600">Nenhum produto encontrado</h2>
            <p>Tente ajustar sua busca ou mudar o filtro.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('todos')}}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        {/* PAGINAÇÃO (UI: Botões numéricos ajudam o usuário a saber a extensão da lista) */}
        {totalPages > 1 && (
          <footer className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Mostrando {currentItems.length} de {filteredProducts.length} produtos
            </p>
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;