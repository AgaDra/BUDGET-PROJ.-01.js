import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// --- Dodanie elementów DOM, powiązanych z działaniem .js---
const inputTextIncome = document.querySelector("#inputTextInc");
const inputAmountIncome = document.querySelector("#inputAmountInc");
const btnAddIncome = document.querySelector("#btnAddInc");
const listWrapperIncome = document.querySelector("#listWrapperInc");
const incomeList = document.querySelector("#listInc");
const formIncome = document.querySelector("#formInc");

// ---tworzenie tablicy---

const incomeArray = [];

// ---funkcja dodająca element (obiekt-nazwę i wartość dochodu) do tablicy

const addIncomeToArray = () => {
  const incomeObject = {
    id: uuidv4(),
    incomeName: inputTextIncome.value,
    incomeAmount: inputAmountIncome.value,
  };
  incomeArray.push(incomeObject);
  renderIncomList();

  inputTextIncome.value = "";
  inputAmountIncome.value = "";
};

// --- funkcja renderująca listę  ---

const renderIncomList = () => {
  incomeList.innerHTML = "";
  incomeArray.forEach((income) => {
    const incomeItem = document.createElement("li");
    // ---dodajemy classę aby nowy element wyglądał tak jak zdefiniowaliśmy w css
    incomeItem.classList.add("income-list-item");

    const incomeItemName = document.createElement("span");
    incomeItemName.classList.add("income-name-style");
    // --- uzupełnienie span'a tekstem ze zmiennej let textIncome ---
    incomeItemName.innerText = income.incomeName;

    const incomeItemAmount = document.createElement("span");
    incomeItemAmount.classList.add("income-amount-style");
    // --- uzupełnienie span'a tekstem (liczbą) ze zmiennej let amountIncome ---
    incomeItemAmount.innerText = income.incomeAmount;

    // --- utworzenie pojemnika na przyciski, aby był ostylowany
    const optionsBtns = document.createElement("div");
    optionsBtns.classList.add("incOption");

    const editBtnInc = document.createElement("button");
    editBtnInc.classList.add("item-income-cto");
    editBtnInc.innerText = "edit";
    editBtnInc.addEventListener("click", () => {
      let editInputInc = document.createElement("input");
    });

    const deleteBtnInc = document.createElement("button");
    deleteBtnInc.classList.add("item-income-cto");

    const trashImg = document.createElement("i");
    trashImg.classList.add("fa-regular", "fa-trash-can", "fa-xl");
    deleteBtnInc.appendChild(trashImg);

    // --- przypisanie treści span i przycisków do elementu listy li ---

    incomeItem.appendChild(incomeItemName);
    incomeItem.appendChild(incomeItemAmount);
    incomeItem.appendChild(optionsBtns);
    optionsBtns.appendChild(editBtnInc);
    optionsBtns.appendChild(deleteBtnInc);

    // --- przypisanie nowych elementów li do listy Ul w HTML ---
    incomeList.appendChild(incomeItem);
    listWrapperIncome.appendChild(incomeList);
  });
};

// --- Funkcja obsługująca zdarzenie po naciśnięciu przycisku Add ---

formIncome.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncomeToArray();
});

// htmlElement.contentEditable = true
