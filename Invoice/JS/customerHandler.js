function addNewCustomer(){
    let ID = document.getElementById('create_customer_ID').value;
    let customerName = document.getElementById('create_customer_name').value;
    let addOne = document.getElementById('create_customer_addOne').value;
    let addTwo = document.getElementById('create_customer_addTwo').value;
    let city = document.getElementById('create_customer_city').value;
    let country = document.getElementById('create_customer_country').value;
    userMasterDict['customer'][ID] = {'customerName': customerName, 'addOne': addOne, 'addTwo': addTwo, 'city': city, 'country': country}
    UpdateCustomer();
    changePage('PAGE_invoice');
}

function UpdateCustomer(){
    let elem = '<label for="customerSelection">Choose A Customer</label>';
    elem += '<select name="customerSelection" id="customerSelection">';
    Object.keys(userMasterDict["customer"]).forEach(customerID => {
        elem += `<option value="${customerID}">${customerID}</option>`;
    });
    elem += '</select>';
    document.getElementById("customer_selection_box").innerHTML = elem;
}