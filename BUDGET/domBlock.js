let DOM_Blocks_Budget = {
    month_button: function (month){
        return `<button onclick="budgetGenTable(event)" month="${month}" class="budget_month_buttons">${month}</button>`
    },
    year_button: function (year){
        return `<button onclick="loadMonthData(event)" year="${year}" class="budget_year_buttons">${year}</button>`
    },
    budget_card: function (name, ID, y1, y2){
        return `<div class="budget_item" budgetid="${ID}" onclick="loadBudgetData(event)" style="cursor: pointer;">`
        +          `<p>${name}</p>`
        +          `<p>${y1} - ${y2}</p>`
        +      '</div>';

    },
    income_line: function (income, amount){
        return `<div style="cursor: none;">`
        +       `<div>${income}</div>`
        +       `<div>${amount}</div>`
        +      '</div>';

    },
}