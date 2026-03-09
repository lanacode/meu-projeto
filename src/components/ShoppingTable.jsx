export function ShoppingTable({ products, onDelete }) {
  const totalGeral = products.reduce((acc, p) => acc + (p.amount * p.value), 0);

  return (
    <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Produto</th>
              <th className="px-6 py-4">Qtd</th>
              <th className="px-6 py-4">Unitário</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.amount}</td>
                <td className="px-6 py-4 text-gray-600">R$ {product.value.toFixed(2)}</td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  R$ {(product.amount * product.value).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => onDelete(product.id)}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {products.length > 0 && (
            <tfoot className="bg-blue-50">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right font-bold text-gray-700 italic">Total Geral:</td>
                <td colSpan="2" className="px-6 py-4 text-2xl font-black text-blue-700">
                  R$ {totalGeral.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </section>
  );
}