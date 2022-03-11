let DOM_Blocks_taxes = {
    tax_card: function (ID){
        return `<div class="tax_item" taxYear="${ID}" onclick="loadTaxData(event)" style="cursor: pointer;">`
        +          `<p>${ID}</p>`
        +      '</div>';

    }, 
    tax_header: function (date, description, amount){
        return `<div class="tax_row" style="cursor: default;">`
        +          `<p>${date}</p>`
        +          `<p>${description}</p>`
        +          `<p>$${amount}</p>`
        +      '</div>';

    },
    tax_row: function (type, ID, date, description, amount){
        return `<div type="${type}" rowid=${ID} class="tax_row" style="cursor: pointer;" onclick="editRow()">`
        +          `<p>${date}</p>`
        +          `<p>${description}</p>`
        +          `<p>$${amount}</p>`
        +      '</div>';

    }
}