/*
    Calendar that actually looks good and looks simple
    without any HAML or Pug bullshit.

*/

var data = {

    // Feb data
    2: {
        7: {
            semester: 4,
            speakers: {
                'A': 'Vamsi and Arko',
                'B': 'Somya and Sandra',
                'C': 'Krishna and Prateek'
            }
        },
        14: {
            semester: 6,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Vamsi and Jerry',
            }
        },
        21: {
            semester: 4,
            speakers: {
                'A': 'Vamsi and Jerry',
                'B': 'Somya and Sandra',
                'C': 'Krishna and Prateek',
            }
        }
    },

    // March Data
    3: {
        7: {
            semester: 6,
            speakers: {
                'A': 'Krishna and Prateek',
                'B': 'Vamsi and Jerry',
                'C': 'Somya and Sandra',
            }
        },
        21: {
            semester: 4,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Vamsi and Jerry',
            }
        },
        28: {
            semester: 6,
            speakers: {
                'A': 'Vamsi and Jerry',
                'B': 'Somya and Sandra',
                'C': 'Krishna and Prateek',
            }
        },
    },

    // April Data
    4: {
        16: {
            semester: 4,
            speakers: {
                'A': 'Krishna and Prateek',
                'B': 'Vamsi and Jerry',
                'C': 'Somya and Sandra',
            }
        },
        23: {
            semester: 6,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Vamsi and Jerry',
            }
        },
    }
}



/* This is going to set up the calendar. */
var calendarSetup = function (month) {
    month == null && (month = new Date().getMonth() + 1);
    var year = 2018;

    $('.week').each(function () { $(this).remove(); })

    switch (month) {
        case 1:
            month = 2;
        case 2:
            $('#monthname').text('February');
            $('#prev').attr('disabled', true);
            $('#next').attr('disabled', false);
            break;
        case 3:
            $('#monthname').text('March');
            $('#prev').attr('disabled', false);
            $('#next').attr('disabled', false);
            break;
        case 12:
        case 11:
        case 10:
        case 9:
        case 8:
        case 7:
        case 6:
        case 5:
            month = 4;
        case 4:
            $('#monthname').text('April');
            $('#prev').attr('disabled', false);
            $('#next').attr('disabled', true);
        default:
            break;
    }

    var numOfDays = new Date(year, month, 0).getDate();
    var currentDay = new Date(year, month-1, 1).getDay();
    console.log(currentDay);

    var cal = '<tr class="week">';
    for (var i = 0; i < currentDay; ++i) cal += '<td></td>';
    for (var i = 1; i <= numOfDays; ++i) {
        cal += '<td id="day' + i + '">' + i + '</td>';
        currentDay++;
        if (currentDay == 7) {
            cal += '</tr><tr class="week">';
            currentDay = 0;
        }
    }
    for (; currentDay < 7; currentDay++) cal += '<td></td>';
    cal += '</tr>';
    $('.calendar').append(cal);

    var today = new Date();
    if (today.getFullYear() == 2018 && (today.getMonth() + 1) == month) {
        $('#day' + today.getDate()).addClass('current-date');
    }

    for (var day in data[month]) {
        switch (data[month][day]['semester']) {
            case 4:
                $('#day' + day).addClass('sem4-asd');
                break;
            case 6:
                $('#day' + day).addClass('sem6-asd');
                break;
        }
    }
}


/* Functions used to switch calendars. */
var prevMonth = function () {
    var monthname = $('#monthname').text();
    if (monthname == 'March')
        calendarSetup(2);
    else if (monthname == 'April')
        calendarSetup(3);    
}

var nextMonth = function () {
    var monthname = $('#monthname').text();
    if (monthname == 'February')
        calendarSetup(3);
    else if (monthname == 'March')
        calendarSetup(4);
}



$(document).ready(function () {
    calendarSetup();
});