let DOM_Blocks_taxes = {
    tax_card: function (ID){
        return `<div class="tax_item" taxYear="${ID}" onclick="loadTaxData(event)" style="cursor: pointer;">`
        +          `<p>${ID}</p>`
        +      '</div>';

    }, 
    tax_row: function (date, description, amount){
        return `<div class="tax_row">`
        +          `<p>${date}</p>`
        +          `<p>${description}</p>`
        +          `<p>$${amount}</p>`
        +      '</div>';

    }
}