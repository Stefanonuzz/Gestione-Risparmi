import { addToTable } from "./view";
import { addToTotal } from "./view";
import { updateChart, updateLineChart } from "./chart.view";
import { updateColumnChart } from "./chart.view";
import { saveToLocalStorage } from "./view";
import { loadFromLocalStorage } from "./view";

class Expense {
  constructor(amount, category, date, description, type, id) {
    this.id = id;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.type = type;
  }
}

class OperationsList {
  constructor() {
    this.expenseList = [];
  }
}
export const operations = new OperationsList();

export const onDeleteCallback = (expenseId) => {
  const expense = operations.expenseList.find((exp) => exp.id === expenseId);

  if (expense) {
    addToTotal(expense.type, -expense.amount);
  }
  operations.expenseList = operations.expenseList.filter(
    (exp) => exp.id !== expenseId
  );

  const storeData = loadFromLocalStorage("tableData");
  const updatedData = storeData.filter((item) => item.id !== expenseId);
  saveToLocalStorage("tableData", updatedData);
};

const form = document.getElementById("income-form");
const radioButtons = form.elements["type"];
const categorySelect = document.getElementById("income-category");

// Lista categorie
const incomeCategories = [
  { value: "Stipendio", text: "Stipendio" },
  { value: "Vendita", text: "Vendita" },
  { value: "Accredito", text: "Accredito" },
  { value: "Altro", text: "Altro" },
];

export const expenseCategories = [
  { value: "Alimentari", text: "Alimentari" },
  { value: "Trasporti", text: "Trasporti" },
  { value: "Salute", text: "Salute" },
  { value: "Svago", text: "Svago" },
  { value: "Altro", text: "Altro" },
];

radioButtons.forEach((button) => {
  button.addEventListener("change", updateCategoryOptions);
});

// Funzione per aggiornare le categorie in base al type
function updateCategoryOptions() {
  const selectedType = form.elements["type"].value;
  categorySelect.innerHTML = "";

  // Definizione delle categorie
  const categories =
    selectedType === "Entrata" ? incomeCategories : expenseCategories;

  // Display delle categorie
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.text;
    categorySelect.appendChild(option);
  });
}

////////////////////////////////////////////////
////////////////////////////////////////////////

document.getElementById("income-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = document.getElementById("income-amount").value;
  const category = document.getElementById("income-category").value;
  const date = document.getElementById("income-date").value;
  const description = document.getElementById("income-description").value;
  const type = document.querySelector('input[name="type"]:checked').value;

  const newIncomeId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newIncome = new Expense(
    amount,
    category,
    date,
    description,
    type,
    newIncomeId
  );
  operations.expenseList.push(newIncome);

  addToTable(
    date,
    description,
    category,
    amount,
    newIncomeId,
    type,
    onDeleteCallback
  );
  updateChart(category, amount, type);
  updateColumnChart(category, amount, type);
  updateLineChart(amount, type);

  addToTotal(type, amount);

  console.log(newIncome);
  console.log(operations.expenseList);
});
