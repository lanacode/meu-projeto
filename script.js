const tableBody = document.getElementById('shoppingListBody');
const productForm = document.getElementById('productForm');

function renderTable() {
    const products = JSON.parse(localStorage.getItem('productsList')) || [];

    tableBody.innerHTML = '';
    let totalGeral = 0;

    products.forEach((product, index) => {
        const newRow = tableBody.insertRow();

        const amount = product.amount || 0;
        const value = product.value || 0;
        const subtotal = amount * value;

        const formattedSubtotal = `R$ ${value.toFixed(2).replace('.', ',')}`;

        newRow.insertCell().textContent = product.name;
        newRow.insertCell().textContent = amount;
        newRow.insertCell().textContent = formattedSubtotal;

        const removeCell = newRow.insertCell();

        const iconContainer = document.createElement('span');
        iconContainer.style.cursor = 'pointer';
        iconContainer.setAttribute('aria-label', 'Remover produto');
        iconContainer.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 text-danger" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            `;

        iconContainer.onclick = () => {
            removeProduct(index);
        };
        removeCell.appendChild(iconContainer);

        totalGeral += subtotal;
    });


    if (products.length > 0) {
        const totalRow = tableBody.insertRow();
        totalRow.style.fontWeight = 'bold';

        totalRow.insertCell().textContent = 'Total:';

        const totalCell = totalRow.insertCell();
        totalCell.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
        totalCell.colSpan = 3;
    }
}

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('productsList')) || [];
    products.splice(index, 1);
    localStorage.setItem('productsList', JSON.stringify(products));
    renderTable();
}

productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('nameProduct').value.trim();
    const amount = document.getElementById('amountProduct').value;
    const value = document.getElementById('valueProduct').value;

    const parsedAmount = parseInt(amount);
    const parsedValue = parseFloat(value);

    if (name.length < 3 || name.length > 20) {
        alert("Nome inválido. Deve ter entre 3 e 20 caracteres.");
        return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Quantidade inválida. Deve ser um número inteiro maior que zero.");
        return;
    }

    if (isNaN(parsedValue) || parsedValue <= 0) {
        alert("Valor inválido. Insira um número válido e positivo.");
        return;
    }

    const productData = {
        name: name,
        amount: parsedAmount,
        value: parsedValue
    };

    let products = JSON.parse(localStorage.getItem('productsList')) || [];
    products.push(productData);
    localStorage.setItem('productsList', JSON.stringify(products));

    this.reset();
    renderTable();
});

document.addEventListener('DOMContentLoaded', renderTable);