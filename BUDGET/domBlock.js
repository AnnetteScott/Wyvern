let DOM_Blocks_budget = {
    month_button: function (month, year){
        return `<button onclick="budgetGen(event)" month="${month}" year="${year}" class="project_week_buttons">${month}</button>`
    },
    year_button: function (year){
        return `<button onclick="monthButtonGen(event)" year="${year}" class="project_week_buttons">${year}</button>`
    }
}