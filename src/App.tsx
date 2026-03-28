/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { PRODUCTS, Product } from './constants';
import { Printer, ChevronLeft, Calculator, Package, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetAmount, setTargetAmount] = useState<number | string>('');
  const [customBaseAmount, setCustomBaseAmount] = useState<number | string>('');

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setTargetAmount(product.baseAmount);
    setCustomBaseAmount(product.baseAmount);
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setTargetAmount('');
    setCustomBaseAmount('');
  };

  const calculatedIngredients = useMemo(() => {
    if (!selectedProduct || targetAmount === '') return [];
    const base = selectedProduct.id === 'dagasztas' ? Number(customBaseAmount) : selectedProduct.baseAmount;
    const ratio = Number(targetAmount) / (base || 1);
    return selectedProduct.ingredients.map(ing => ({
      ...ing,
      calculatedAmount: (ing.amount * ratio).toFixed(2)
    }));
  }, [selectedProduct, targetAmount, customBaseAmount]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-orange-100 relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed -top-20 -left-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating Bread Images (Decorative) */}
      <div className="fixed top-40 -left-12 opacity-10 pointer-events-none rotate-12 hidden lg:block">
        <img 
          src="https://picsum.photos/seed/bread1/300/300" 
          alt="Bread decoration" 
          className="rounded-full w-48 h-48 object-cover border-8 border-white shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="fixed bottom-20 -right-12 opacity-10 pointer-events-none -rotate-12 hidden lg:block">
        <img 
          src="https://picsum.photos/seed/bread2/300/300" 
          alt="Bread decoration" 
          className="rounded-full w-56 h-56 object-cover border-8 border-white shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200"
            >
              <Package size={24} />
            </motion.div>
            <h1 className="text-xl font-black tracking-tight text-stone-900">Kenyér dagasztás kalkulátor</h1>
          </div>
          {selectedProduct && (
            <button
              onClick={handlePrint}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg transition-all text-sm font-bold shadow-sm active:scale-95"
            >
              <Printer size={18} />
              Nyomtatás
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {PRODUCTS.map((product, idx) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="group bg-white p-6 rounded-3xl border-2 border-stone-100 text-left hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <img 
                      src={`https://picsum.photos/seed/bread-${idx}/200/200`} 
                      alt="Bread bg" 
                      className="w-32 h-32 object-cover rounded-full rotate-12"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="p-3 bg-amber-50 rounded-2xl group-hover:bg-amber-100 transition-colors">
                      <Calculator className="text-amber-600" size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
                      {product.baseAmount} {product.baseUnit}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black mb-2 group-hover:text-orange-600 transition-colors relative z-10 leading-tight">{product.name}</h2>
                  <p className="text-stone-500 text-sm line-clamp-2 relative z-10 font-medium">
                    {product.ingredients.map(i => i.name).join(', ')}
                  </p>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] border-2 border-stone-100 shadow-2xl shadow-stone-200/50 overflow-hidden print:border-none print:shadow-none"
            >
              {/* Detail Header */}
              <div className="p-6 md:p-10 border-b border-stone-100 bg-gradient-to-br from-amber-50/50 to-orange-50/50 print:bg-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none print:hidden">
                  <img 
                    src="https://picsum.photos/seed/bread-detail/200/200" 
                    alt="Bread decoration" 
                    className="w-32 h-32 object-cover rounded-full rotate-12 border-4 border-white shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-stone-400 hover:text-orange-600 font-bold transition-colors mb-8 print:hidden group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  Vissza a listához
                </button>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                  <div>
                    <h2 className="text-4xl font-black text-stone-900 mb-3 leading-tight">{selectedProduct.name}</h2>
                    <p className="text-amber-700 font-bold flex items-center gap-2 bg-amber-100/50 w-fit px-3 py-1 rounded-full text-sm">
                      <Info size={16} />
                      Alap recept: {selectedProduct.baseAmount} {selectedProduct.baseUnit}
                    </p>
                  </div>
                  
                  <div className="print:hidden flex flex-col md:flex-row gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">
                        {selectedProduct.id === 'dagasztas' ? 'Összes súly (kg)' : `Kívánt mennyiség (${selectedProduct.baseUnit})`}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={targetAmount}
                          onChange={(e) => setTargetAmount(e.target.value)}
                          className="w-full md:w-48 bg-white border-3 border-stone-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:ring-0 transition-all text-xl font-black shadow-sm"
                          placeholder="Mennyiség..."
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-300 font-black">
                          {selectedProduct.baseUnit}
                        </div>
                      </div>
                    </div>
                    {selectedProduct.id === 'dagasztas' && (
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">
                          Csésze súlya (kg)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={customBaseAmount}
                            onChange={(e) => setCustomBaseAmount(e.target.value)}
                            className="w-full md:w-40 bg-white border-3 border-stone-100 rounded-2xl px-5 py-4 focus:border-orange-500 focus:ring-0 transition-all text-xl font-black shadow-sm"
                            placeholder="Csésze kg..."
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden print:block text-right">
                    {selectedProduct.id === 'dagasztas' && (
                      <p className="text-sm text-amber-700 font-bold mb-1">Csésze súlya: {customBaseAmount} kg</p>
                    )}
                    <p className="text-2xl font-black text-orange-600">Számított: {targetAmount} {selectedProduct.baseUnit}</p>
                    <p className="text-sm text-stone-400 font-medium">{new Date().toLocaleDateString('hu-HU')}</p>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 gap-2">
                  <div className="grid grid-cols-2 py-4 px-6 text-xs font-black uppercase tracking-widest text-stone-400 border-b-2 border-stone-50">
                    <span>Összetevő</span>
                    <span className="text-right">Mennyiség</span>
                  </div>
                  {calculatedIngredients.map((ing, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-2 py-5 px-6 items-center border-b border-stone-50 last:border-0 hover:bg-amber-50/30 rounded-2xl transition-colors"
                    >
                      <span className="font-bold text-stone-700 text-lg">{ing.name}</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-stone-900">{ing.calculatedAmount}</span>
                        <span className="ml-2 text-amber-500 text-sm font-black uppercase tracking-wider">{ing.unit}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedProduct.note && (
                  <div className="mt-10 p-6 bg-amber-50 rounded-[2rem] border-2 border-amber-100 flex gap-4 italic text-amber-900 font-medium leading-relaxed">
                    <Info className="shrink-0 text-amber-400" size={24} />
                    <p>{selectedProduct.note}</p>
                  </div>
                )}
              </div>

              {/* Footer for print */}
              <div className="hidden print:block p-8 border-t border-stone-100 text-center text-xs text-stone-400">
                Pékáru Kalkulátor - Generálva: {new Date().toLocaleString('hu-HU')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Print Button */}
      {selectedProduct && (
        <button
          onClick={handlePrint}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center print:hidden active:scale-95 transition-transform"
        >
          <Printer size={24} />
        </button>
      )}

      <style>{`
        @media print {
          body {
            background-color: white;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  );
}
