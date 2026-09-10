// ============================
// DASHBOARD.JS
// Handles adding/deleting transactions and updating totals
// Note: data is stored in-memory only (resets on page refresh)
// ============================

let transactions = [
  { id: 1, name: "Salary", amount: 4500, type: "income" },
  { id: 2, name: "Latte", amount: 50, type: "expense" },
  { id: 3, name: "Milkshake", amount: 80, type: "expense" },
];
let selectedType = "income";
let nextId = 4;

const txListEl = document.getElementById("txList");
const emptyStateEl = document.getElementById("emptyState");
const countPillEl = document.getElementById("countPill");
const balanceEl = document.getElementById("balanceAmount");
const incomeEl = document.getElementById("incomeAmount");
const expenseEl = document.getElementById("expenseAmount");
const descInput = document.getElementById("txDesc");
const amountInput = document.getElementById("txAmount");
const errorMsg = document.getElementById("errorMsg");
const typeBtns = document.querySelectorAll(".type-btn");

typeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    typeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
  });
});

function formatMoney(n){
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function iconFor(type){
  return type === "income" ? "fa-solid fa-arrow-down" : "fa-solid fa-arrow-up";
}

function render(){
  const income = transactions.filter(t => t.type === "income").reduce((s,t)=>s+t.amount,0);
  const expense = transactions.filter(t => t.type === "expense").reduce((s,t)=>s+t.amount,0);
  const balance = income - expense;

  incomeEl.textContent = formatMoney(income);
  expenseEl.textContent = formatMoney(expense);
  balanceEl.textContent = formatMoney(balance);
  balanceEl.style.color = balance >= 0 ? "#F5B94D" : "#FF6B7A";

  txListEl.innerHTML = "";
  countPillEl.textContent = transactions.length + (transactions.length === 1 ? " item" : " items");

  if(transactions.length === 0){
    emptyStateEl.style.display = "block";
  } else {
    emptyStateEl.style.display = "none";
    transactions.slice().reverse().forEach(t => {
      const li = document.createElement("li");
      li.className = "tx-item " + t.type;
      li.innerHTML = `
        <div class="tx-left">
          <div class="tx-icon"><i class="${iconFor(t.type)}"></i></div>
          <div>
            <div class="tx-name">${t.name}</div>
            <div class="tx-date">${t.type === "income" ? "Income" : "Expense"}</div>
          </div>
        </div>
        <div class="tx-right">
          <div class="tx-amount">${t.type === "income" ? "+" : "-"}${formatMoney(t.amount)}</div>
          <button class="del-btn" data-id="${t.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      txListEl.appendChild(li);
    });

    document.querySelectorAll(".del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        transactions = transactions.filter(t => t.id !== id);
        render();
      });
    });
  }
}

document.getElementById("addBtn").addEventListener("click", () => {
  const name = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if(!name || isNaN(amount) || amount <= 0){
    errorMsg.style.display = "block";
    return;
  }
  errorMsg.style.display = "none";

  transactions.push({ id: nextId++, name, amount, type: selectedType });
  descInput.value = "";
  amountInput.value = "";
  render();
});

amountInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") document.getElementById("addBtn").click();
});

render();
