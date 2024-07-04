import {
  deleteFromPieChart,
  deleteFromColumnChart,
  deleteFromLineChart,
} from "./chart.view";
import { format, compareAsc } from "date-fns";
import { onDeleteCallback } from "./script";

export const addToTable = function (
  date,
  description,
  category,
  amount,
  id,
  type,
  onDeleteCallback,
  loadingAll = false
) {
  const table = document.getElementById("expense-list");

  const row = document.createElement("tr");
  row.id = `row-${id}`;

  row.classList.add("bg-white", "border-b", "dark:bg-gray-800");

  // Assegnazione colore
  const amountClass = type === "Entrata" ? "text-green-500" : "text-red-500";

  // Assegnazione valore (positivo/negativo)
  const displayAmount = type === "Entrata" ? `${amount}€` : `-${amount}€`;
  const dateFormatted = format(new Date(date), "dd/MM/yyyy");

  row.innerHTML = `
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${dateFormatted}</th>
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
    deleteFromPieChart(category, amount);
    deleteFromColumnChart(category, amount);
    deleteFromLineChart(category, amount);
  });

  if (!loadingAll) {
    // Local Storage Tabella
    const storeData = loadFromLocalStorage("tableData");
    storeData.push({ date, description, category, amount, id, type });
    saveToLocalStorage("tableData", storeData);
  }
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const takeFromLocalStorage = () => {
  const storedData = loadFromLocalStorage("tableData");
  storedData.forEach((item) => {
    addToTable(
      item.date,
      item.description,
      item.category,
      item.amount,
      item.id,
      item.type,
      onDeleteCallback,
      true
    );
  });
};

window.addEventListener("load", takeFromLocalStorage);

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
