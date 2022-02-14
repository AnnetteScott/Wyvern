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

    return day.toString() + "/" + month.toString() + "/" + year.toString()
}