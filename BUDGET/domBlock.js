let DOM_Blocks_Budget = {
    month_button: function (month, year){
        return `<button onclick="budgetGen(event)" month="${month}" year="${year}" class="project_week_buttons">${month}</button>`
    },
    year_button: function (year){
        return `<button onclick="monthButtonGen(event)" year="${year}" class="project_week_buttons">${year}</button>`
    },
    budget_card: function (name, ID, y1, y2){
        return `<div class="budget_item" budgetid="${ID}" onclick="" style="cursor: pointer;">`
        +          `<p>${name}</p>`
        +          `<p>${y1} - ${y2}</p>`
        +      '</div>';

    },
}