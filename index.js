import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const inputTextIncome = document.querySelector("#inputTextInc");
const inputAmountIncome = document.querySelector("#inputAmountInc");
const listWrapperIncome = document.querySelector("#listWrapperInc");
const incomesList = document.querySelector("#listInc");
const formIncome = document.querySelector("#formInc");
const totalIncomes = document.querySelector("#totalIncomes");

const inputTextExpences = document.querySelector("#inputTextExp");
const inputAmountExpences = document.querySelector("#inputAmountExp");
const listWrapperExpences = document.querySelector("#listWrapperExp");
const expencesList = document.querySelector("#listExp");
const formExpences = document.querySelector("#formExp");
const totalExpences = document.querySelector("#totalExpences");
const yourBudget = document.querySelector("#yourBudget");

const incomes = [];
const expences = [];

const getTotalIncomes = () => {
  return incomes.reduce((sum, current) => {
    return sum + current.incomeAmount;
  }, 0);
};
const updataTotalIncomes = () => {
  const totalInc = getTotalIncomes().toFixed(2);
  totalIncomes.innerText = `${totalInc} PLN`;
};

const getTotalExpences = () => {
  return expences.reduce((sum, current) => {
    return sum + current.expenceAmount;
  }, 0);
};
const updataTotalExpences = () => {
  const totalExp = getTotalExpences().toFixed(2);
  totalExpences.innerText = `${totalExp} PLN`;
};

const calculateBudget = () => {
  const totalIncomes = getTotalIncomes();
  const totalExpences = getTotalExpences();
  const totalBudget = totalIncomes - totalExpences;
  return totalBudget;
};

const updateBudgetMessage = () => {
  const budgetDifference = calculateBudget();

  if (budgetDifference > 0) {
    yourBudget.textContent = `Możesz jeszcze wydać: ${budgetDifference.toFixed(
      2
    )} zł`;
    yourBudget.style.color = "yellowgreen";
  } else if (budgetDifference === 0) {
    yourBudget.textContent = "Bilans wynosi: 0,00 zł";
    yourBudget.style.color = "white";
  } else {
    yourBudget.textContent = `Bilans jest ujemny. Jesteś na minusie: ${Math.abs(
      budgetDifference
    ).toFixed(2)} zł`;
    yourBudget.style.color = "red";
  }
};

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
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    const incomeItem = document.createElement("li");
    incomeItem.classList.add("list-item");

    const incomeItemName = document.createElement("span");
    incomeItemName.classList.add("name-style");
    incomeItemName.innerText = income.incomeName;

    const incomeItemAmount = document.createElement("span");
    incomeItemAmount.classList.add("amount-style");
    incomeItemAmount.innerText = income.incomeAmount;

    const optionsBtnsEdDe = document.createElement("div");
    optionsBtnsEdDe.classList.add("btnsOption");

    const optionsBtnsSaCa = document.createElement("div");
    optionsBtnsSaCa.classList.add("btnsOption");

    const deleteBtnInc = document.createElement("button");
    deleteBtnInc.classList.add(
      "item-cto",
      "fa-regular",
      "fa-trash-can",
      "fa-sm"
    );

    deleteBtnInc.addEventListener("click", () => {
      const itemToRemoveIndex = incomes.findIndex(
        (item) => item.id === income.id
      );
      if (itemToRemoveIndex > -1) {
        incomes.splice(itemToRemoveIndex, 1);
        renderIncomesList();
      }
    });

    const editBtnInc = document.createElement("button");
    editBtnInc.classList.add("item-cto");
    editBtnInc.innerText = "edit";
    editBtnInc.addEventListener("click", () => {
      const editForm = document.createElement("form");
      editForm.classList.add("edit-form");

      const editInputIncName = document.createElement("input");
      editInputIncName.placeholder = "edit income name";
      editInputIncName.value = income.incomeName;
      editInputIncName.required = true;
      editInputIncName.style.width = "140px";
      editInputIncName.style.height = "25px";

      const editInputIncAmount = document.createElement("input");
      editInputIncAmount.placeholder = "edit amount";
      editInputIncAmount.value = income.incomeAmount;
      editInputIncAmount.required = true;
      editInputIncAmount.min = "0.01";
      editInputIncAmount.step = "0.01";
      editInputIncAmount.style.width = "70px";
      editInputIncAmount.style.height = "25px";

      incomeItem.innerHTML = "";
      editForm.appendChild(editInputIncName);
      editForm.appendChild(editInputIncAmount);
      editForm.appendChild(optionsBtnsSaCa);
      incomeItem.appendChild(editForm);

      const saveBtnInc = document.createElement("button");
      saveBtnInc.classList.add("item-cto");
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
      cancelBtnInc.classList.add("item-cto");
      cancelBtnInc.innerText = "cancel";
      optionsBtnsSaCa.appendChild(cancelBtnInc);
      cancelBtnInc.addEventListener("click", () => {
        renderIncomesList();
      });
    });

    incomeItem.appendChild(incomeItemName);
    incomeItem.appendChild(incomeItemAmount);
    incomeItem.appendChild(optionsBtnsEdDe);
    optionsBtnsEdDe.appendChild(editBtnInc);
    optionsBtnsEdDe.appendChild(deleteBtnInc);

    incomesList.appendChild(incomeItem);
    listWrapperIncome.appendChild(incomesList);
  });
  updataTotalIncomes();
  updateBudgetMessage();
};

formIncome.addEventListener("submit", (event) => {
  event.preventDefault();
  addIncome();
});

renderIncomesList();

const addExpence = () => {
  const expenceObject = {
    id: uuidv4(),
    expenceName: inputTextExpences.value,
    expenceAmount: Number(inputAmountExpences.value),
  };
  expences.push(expenceObject);
  renderExpencesList();

  inputTextExpences.value = "";
  inputAmountExpences.value = "";
};

const renderExpencesList = () => {
  expencesList.innerHTML = "";
  expences.forEach((expence) => {
    const expenceItem = document.createElement("li");
    expenceItem.classList.add("list-item");

    const expenceItemName = document.createElement("span");
    expenceItemName.classList.add("name-style");
    expenceItemName.innerText = expence.expenceName;

    const expenceItemAmount = document.createElement("span");
    expenceItemAmount.classList.add("amount-style");
    expenceItemAmount.innerText = expence.expenceAmount;

    const optionsBtnsEdDe = document.createElement("div");
    optionsBtnsEdDe.classList.add("btnsOption");

    const optionsBtnsSaCa = document.createElement("div");
    optionsBtnsSaCa.classList.add("btnsOption");

    const deleteBtnExp = document.createElement("button");
    deleteBtnExp.classList.add(
      "item-cto",
      "fa-regular",
      "fa-trash-can",
      "fa-sm"
    );

    deleteBtnExp.addEventListener("click", () => {
      const itemToRemoveIndex = expences.findIndex(
        (item) => item.id === expence.id
      );
      if (itemToRemoveIndex > -1) {
        expences.splice(itemToRemoveIndex, 1);
        renderExpencesList();
      }
    });

    const editBtnExp = document.createElement("button");
    editBtnExp.classList.add("item-cto");
    editBtnExp.innerText = "edit";
    editBtnExp.addEventListener("click", () => {
      const editForm = document.createElement("form");
      editForm.classList.add("edit-form");

      const editInputExpName = document.createElement("input");
      editInputExpName.placeholder = "edit expence name";
      editInputExpName.value = expence.expenceName;
      editInputExpName.required = true;
      editInputExpName.style.width = "140px";
      editInputExpName.style.height = "25px";

      const editInputExpAmount = document.createElement("input");
      editInputExpAmount.placeholder = "edit amount";
      editInputExpAmount.value = expence.expenceAmount;
      editInputExpAmount.required = true;
      editInputExpAmount.min = "0.01";
      editInputExpAmount.step = "0.01";
      editInputExpAmount.style.width = "70px";
      editInputExpAmount.style.height = "25px";

      expenceItem.innerHTML = "";
      editForm.appendChild(editInputExpName);
      editForm.appendChild(editInputExpAmount);
      editForm.appendChild(optionsBtnsSaCa);
      expenceItem.appendChild(editForm);

      const saveBtnExp = document.createElement("button");
      saveBtnExp.classList.add("item-cto");
      saveBtnExp.type = "submit";
      saveBtnExp.innerText = "save";
      optionsBtnsSaCa.appendChild(saveBtnExp);

      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const expenceToChange = expences.find((item) => item.id === expence.id);
        if (expenceToChange) {
          expenceToChange.expenceName = editInputExpName.value;
          expenceToChange.expenceAmount = Number(editInputExpAmount.value);
          renderExpencesList();
        }
      });

      const cancelBtnExp = document.createElement("button");
      cancelBtnExp.classList.add("item-cto");
      cancelBtnExp.innerText = "cancel";
      optionsBtnsSaCa.appendChild(cancelBtnExp);
      cancelBtnExp.addEventListener("click", () => {
        renderExpencesList();
      });
    });

    expenceItem.appendChild(expenceItemName);
    expenceItem.appendChild(expenceItemAmount);
    expenceItem.appendChild(optionsBtnsEdDe);
    optionsBtnsEdDe.appendChild(editBtnExp);
    optionsBtnsEdDe.appendChild(deleteBtnExp);

    expencesList.appendChild(expenceItem);
    listWrapperExpences.appendChild(expencesList);
  });
  updataTotalExpences();
  updateBudgetMessage();
};

formExpences.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpence();
});

renderExpencesList();

updateBudgetMessage();
