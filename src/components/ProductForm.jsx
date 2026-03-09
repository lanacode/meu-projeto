import { useState } from 'react';

export function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || amount <= 0) return;
    onAddProduct({
      id: Math.random(),
      name,
      amount: Number(amount),
      value: Number(value)
    });
    setName('');
    setAmount(1);
    setValue(0);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl mb-10 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Nome do Produto</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Arroz 5kg"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Quantidade</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            min="1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Valor Unitário (R$)</label>
          <input 
            type="number" 
            step="0.01" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95"
      >
        + Adicionar Produto
      </button>
    </form>
  );
}