import { useState } from 'react';
import { Header } from './components/Header';
import { ProductForm } from './components/ProductForm';
import { ShoppingTable } from './components/ShoppingTable';
import "./index.css"; // Garanta que seu index.css tem o @import "tailwindcss";

export default function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <main className="w-full px-4 flex flex-col items-center max-w-5xl">
        <ProductForm onAddProduct={handleAddProduct} />
        
        {products.length === 0 ? (
          <p className="text-gray-400 italic mt-10">Sua lista está vazia. Comece adicionando produtos!</p>
        ) : (
          <ShoppingTable products={products} onDelete={handleDeleteProduct} />
        )}
      </main>
      <footer className="mt-auto py-6 text-gray-500 text-sm">
        © 2026 - Desenvolvido com React & Tailwind por Ilana
      </footer>
    </div>
  );
}