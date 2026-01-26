import type { Product } from '../@types/product';
import { Star, ShoppingCart, ExternalLink } from 'lucide-react';

interface Props {
  product: Product;
  viewMode: 'grid' | 'list';
}

export const ProductDisplay = ({ product, viewMode }: Props) => {
  const isGrid = viewMode === 'grid';

  return (
    <div className={`
      group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-500 
      hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)]
      ${isGrid ? 'flex flex-col' : 'flex flex-col md:flex-row items-center p-5 gap-8'}
    `}>
      
      {/* Container da Imagem com Badge de Rating */}
      <div className={`
        relative overflow-hidden bg-white p-6
        ${isGrid ? 'w-full h-72' : 'w-full md:w-48 h-48 shrink-0 rounded-xl bg-slate-50'}
      `}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-100 flex items-center gap-1 shadow-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-slate-700">{product.rating.rate}</span>
        </div>
      </div>

      {/* Conteúdo Informativo */}
      <div className={`flex flex-col p-5 pt-0 ${isGrid ? 'w-full' : 'flex-1 md:pt-5'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {product.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {product.rating.count} avaliações
          </span>
        </div>

        <h3 className="text-slate-800 font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {product.title}
        </h3>
        
        {!isGrid && (
          <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className={`mt-auto pt-4 flex items-center justify-between border-t border-slate-50`}>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Preço</span>
            <span className="text-2xl font-black text-slate-900">
              <span className="text-sm mr-1 font-bold text-blue-600">$</span>
              {product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2">
            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
              <ExternalLink size={20} />
            </button>
            
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
              <ShoppingCart size={18} />
              {/* CORREÇÃO AQUI: Se não for grid, mostre o texto. Se for grid, o CSS cuidará de esconder se necessário ou você mantém só o ícone */}
              {!isGrid && "Comprar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};