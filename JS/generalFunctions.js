function reDoDate(elem){
	let startDateList = $("#" + elem).val().split("-")
	let startDate = startDateList[2] + "/" + startDateList[1] + "/" + startDateList[0].substr(2, 3)
	let day = parseInt(startDate.split("/")[0]);
	let month = parseInt(startDate.split("/")[1]);
	let year = parseInt(startDate.split("/")[2]);
	let newDate = day.toString() + "/" + month.toString() + "/" + year.toString()
	return newDate;
}

function generateID() {
	let length = 5;
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//Gets the number of days for a given month indexed with 1. Returns number.
function getMonthDays(month, year){
    let days_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return leapYear(year) && month == 2 ? 29 : days_per_month[month - 1];
}

//Check if the current year is a leap year. Returns boolean.
function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function addToDate(date, daysToAdd){
    let day = parseInt(date.split("/")[0]);
    let month = parseInt(date.split("/")[1]);
    let year = parseInt(date.split("/")[2]);

	day += daysToAdd;

	while(day > getMonthDays(month, year)){
		day -= getMonthDays(month, year);
		month++;
        if(month > 12){
            month -= 12;
            year++;
        }
	}
    if(day < 10 && month < 10){
        return "0" + day.toString() + "/" + "0" + month.toString() + "/" + year.toString()
    }else if(day < 10 && month >= 10){
        return "0" + day.toString() + "/" + month.toString() + "/" + year.toString()
    }else if(day >= 10 && month < 10){
        return day.toString() + "/" + "0" +  month.toString() + "/" + year.toString()
    }else{
        return day.toString() + "/" + month.toString() + "/" + year.toString()
    } 
}

function addToDateNoYear(date, daysToAdd, year = 0){
    let day = parseInt(date.split("/")[0]);
    let month = parseInt(date.split("/")[1]);

	day += daysToAdd;

	while(day > getMonthDays(month, year)){
		day -= getMonthDays(month, year);
		month++;
        if(month > 12){
            month -= 12;
            year++;
        }
	}
    if(day < 10 && month < 10){
        return "0" + day.toString() + "/" + "0" + month.toString()
    }else if(day < 10 && month >= 10){
        return "0" + day.toString() + "/" + month.toString()
    }else if(day >= 10 && month < 10){
        return day.toString() + "/" + "0" +  month.toString()
    }else{
        return day.toString() + "/" + month.toString()
    } 
}

function mericaDate(date){
    let day = parseInt(date.split("/")[0]);
    let month = parseInt(date.split("/")[1]);
    let year = parseInt(date.split("/")[2]);
    return month + "/" + day + "/" + year
}

function calculateTax(amount){
    let accPercent = 0.014;
    let firstTax = [0.105, 14000];
    let secondTax = [0.175, 48000];
    let thirdTax = [0.3, 70000];
    let fourthTax = [0.33, 180000];
    let fifthTax = [0.39]; 

    let accAmount = amount * accPercent;

    let firstAmount = amount > firstTax[1] ? firstTax[1] * firstTax[0]: amount * firstTax[0];
    
    amount = Math.max(0, amount - firstTax[1]);

    let secondAmount = amount > secondTax[1] ? secondTax[1] * secondTax[0]: amount * secondTax[0];
    amount = Math.max(0, amount - secondTax[1]);

    let thirdAmount = amount > thirdTax[1] ? thirdTax[1] * thirdTax[0]: amount * thirdTax[0];
    amount = Math.max(0, amount - thirdTax[1]);

    let fourthAmount = amount > fourthTax[1] ? fourthTax[1] * fourthTax[0]: amount * fourthTax[0];
    amount = Math.max(0, amount - fourthTax[1]);
    
    let fifthAmount = amount * fifthTax[0];

    let totalTax = firstAmount + secondAmount + thirdAmount + fourthAmount + fifthAmount;

    return totalTax + accAmount
}