export const addToTable = function (
  date,
  description,
  category,
  amount,
  id,
  type,
  onDeleteCallback
) {
  const table = document.getElementById("expense-list");

  const row = document.createElement("tr");
  row.id = `row-${id}`;

  row.classList.add("bg-white", "border-b", "dark:bg-gray-800");

  // Assegnazione colore
  const amountClass = type === "Entrata" ? "text-green-500" : "text-red-500";

  // Assegnazione valore (positivo/negativo)
  const displayAmount = type === "Entrata" ? `${amount}€` : `-${amount}€`;

  row.innerHTML = `
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${date}</th>
    <td class="px-6 py-4">${description}</td>
    <td class="px-6 py-4">${category}</td>
    <td class="px-6 py-4 ${amountClass}">${displayAmount}</td>
    <td class="px-6 py-4">
      <ion-icon class="trash-icon mr-4 cursor-pointer" name="trash-outline" data-row-id="${id}"></ion-icon>
      <ion-icon class="cursor-pointer" name="create-outline"></ion-icon>
    </td>
  `;
  table.appendChild(row);

  row.querySelector(".trash-icon").addEventListener("click", (event) => {
    event.preventDefault();
    const rowId = event.target.dataset.rowId;
    row.remove();
    onDeleteCallback(rowId);
  });
};

export const addToTotal = function (type, amount) {
  const totalIncome = document.getElementById("total-income");
  const totalExpense = document.getElementById("total-expense");
  const total = document.getElementById("total-balance");

  let incomeValue = parseFloat(totalIncome.textContent) || 0;
  let expenseValue = parseFloat(totalExpense.textContent) || 0;
  let amountValue = parseFloat(amount) || 0;

  if (type === "Entrata") {
    incomeValue += amountValue;
    totalIncome.textContent = `${incomeValue}€`;
  } else {
    expenseValue += amountValue;
    totalExpense.textContent = `${expenseValue}€`;
  }

  const totalValue = incomeValue - expenseValue;
  total.textContent = `${totalValue}€`;
};
