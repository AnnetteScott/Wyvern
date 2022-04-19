export function generateID(check = {}){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let length = 5;
    let result = '';
    let is_duplicate = true;
    while(is_duplicate){
        //Generate an ID.
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        //Check if it already exists. If so, generate again. If not, continue.
        if(typeof ([result, result, result, result, result, result].reduce((check, level) => check && check[level], check)) == 'undefined'){
            is_duplicate = false;
        }
    }
    return result;
}

function getMonthDays(month, year){
    let days_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return leapYear(year) && month == 2 ? 29 : days_per_month[month - 1];
}

//Check if the current year is a leap year. Returns boolean.
function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

export function addToDate(date, daysToAdd){
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

export function reDoDate(startingDate){
	let startDateList = startingDate.split("-")
	let startDate = startDateList[2] + "/" + startDateList[1] + "/" + startDateList[0].substr(2, 3)
	let day = parseInt(startDate.split("/")[0]);
	let month = parseInt(startDate.split("/")[1]);
	let year = parseInt(startDate.split("/")[2]);
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

export function dateToAmerica(date){
    date = date.split('/');
    return date[1] + '/' + date[0] + '/' + date [2];
}