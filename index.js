import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// --- Dodanie elementów DOM, powiązanych z działaniem .js---
const inputTextIncome = document.querySelector("#inputTextInc");
const inputAmountIncome = document.querySelector("#inputAmountInc");
const btnAddIncome = document.querySelector("#btnAddInc");
const listWrapperIncome = document.querySelector("#listWrapperInc");
const incomeList = document.querySelector("#listInc");
const formIncome = document.querySelector("#formInc");
const totalIncomes = document.querySelector("#totalIncomes");

// ---tworzenie tablicy---

const incomes = [];

// funkcja sumująca przychody

const getTotalIncomes = () => {
  return incomes.reduce((sum, current) => {
    return sum + current.incomeAmount;
  }, 0);
};
const updataTotalIncomes = () => {
  const total = getTotalIncomes().toFixed(2);
  totalIncomes.innerText = `${total} PLN`;
};

// ---funkcja dodająca element (obiekt-nazwę i wartość dochodu) do tablicy

const addIncome = () => {
  const incomeObject = {
    id: uuidv4(),
    incomeName: inputTextIncome.value,
    incomeAmount: Number(inputAmountIncome.value),
  };
  incomes.push(incomeObject);
  renderIncomesList();

  inputTextIncome.value = "";
  inputAmountIncome.value = "";
};

const renderIncomesList = () => {
  incomeList.innerHTML = "";
  incomes.forEach((income) => {
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

    // --- utworzenie pojemnika na przyciski edit i delete , aby był ostylowany
    const optionsBtnsEdDe = document.createElement("div");
    optionsBtnsEdDe.classList.add("incOption");

    // --- utworzenie pojemnika na przyciski save i cancel, aby był ostylowany
    const optionsBtnsSaCa = document.createElement("div");
    optionsBtnsSaCa.classList.add("incOption");

    const deleteBtnInc = document.createElement("button");
    deleteBtnInc.classList.add(
      "item-income-cto",
      "fa-regular",
      "fa-trash-can",
      "fa-xl"
    );

    deleteBtnInc.addEventListener("click", () => {
      // Funkcja obsługująca usunięcie elementu z listy
      const itemToRemoveIndex = incomes.findIndex(
        (item) => item.id === income.id
      );
      if (itemToRemoveIndex > -1) {
        incomes.splice(itemToRemoveIndex, 1);
        renderIncomesList();
      }
      // Renderowanie listy po usunięciu elementu
    });

    // PRZYCISK EDYCJA + SAVE I CANCEL :

    const editBtnInc = document.createElement("button");
    editBtnInc.classList.add("item-income-cto");
    editBtnInc.innerText = "edit";
    editBtnInc.addEventListener("click", () => {
      const editForm = document.createElement("form");

      // edycja nazwy przychodu
      const editInputIncName = document.createElement("input");
      editInputIncName.placeholder = "edit income name";
      editInputIncName.value = income.incomeName;
      editInputIncName.required = true;
      // edycja wartości przychodu
      const editInputIncAmount = document.createElement("input");
      editInputIncAmount.placeholder = "edit amount";
      editInputIncAmount.value = income.incomeAmount;
      editInputIncAmount.required = true;
      editInputIncAmount.min = "0.01";
      editInputIncAmount.step = "0.01";

      incomeItem.innerHTML = "";
      editForm.appendChild(editInputIncName);
      editForm.appendChild(editInputIncAmount);
      editForm.appendChild(optionsBtnsSaCa);
      incomeItem.appendChild(editForm);

      const saveBtnInc = document.createElement("button");
      saveBtnInc.classList.add("item-income-cto");
      saveBtnInc.type = "submit";
      saveBtnInc.innerText = "save";
      optionsBtnsSaCa.appendChild(saveBtnInc);
      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const incomeToChange = incomes.find((item) => item.id === income.id);
        if (incomeToChange) {
          incomeToChange.incomeName = editInputIncName.value;
          incomeToChange.incomeAmount = Number(editInputIncAmount.value);
          renderIncomesList();
        }
      });

      const cancelBtnInc = document.createElement("button");
      cancelBtnInc.classList.add("item-income-cto");
      cancelBtnInc.innerText = "cancel";
      optionsBtnsSaCa.appendChild(cancelBtnInc);
      cancelBtnInc.addEventListener("click", () => {
        renderIncomesList();
      });
    });

    // --- przypisanie treści span i przycisków do elementu listy li ---

    incomeItem.appendChild(incomeItemName);
    incomeItem.appendChild(incomeItemAmount);
    incomeItem.appendChild(optionsBtnsEdDe);
    optionsBtnsEdDe.appendChild(editBtnInc);
    optionsBtnsEdDe.appendChild(deleteBtnInc);

    // --- przypisanie nowych elementów li do listy Ul w HTML ---
    incomeList.appendChild(incomeItem);
    listWrapperIncome.appendChild(incomeList);
  });
  updataTotalIncomes();
};

// --- Funkcja obsługująca zdarzenie po naciśnięciu przycisku Add ---

formIncome.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

renderIncomesList();
