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
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getMonthDays(month, year){
    if( month == 1){ //Jan
        return 31
    } else if(month == 2){ // Feb
        if(leapYear(year)){
            return 29
        } else {
            return 28
        }
    } else if(month == 3){ // Mar
        return 31
    } else if(month == 4){ // Apr
        return 30
    } else if(month == 5){ // May
        return 31
    } else if(month == 6){ // Jun
        return 30
    } else if(month == 7){ // Jul
        return 31
    } else if(month == 8){ // Aug
        return 31
    } else if(month == 9){ // Sep
        return 30
    } else if(month == 10){ // Oct
        return 31
    } else if(month == 11){ // Nov
        return 30
    } else if(month == 12){ // Dec
        return 31
    } else {
        return 30
    }

}

function leapYear(year)
{
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