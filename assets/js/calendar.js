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
                'A': 'Harsha and Arko',
                'B': 'Somya and Sandra',
                'C': 'Krishna and Prateek'
            }
        },
        14: {
            semester: 6,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Harsha and Abhijit',
            }
        },
        21: {
            semester: 4,
            speakers: {
                'A': 'Harsha and Abhijit',
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
                'B': 'Harsha and Abhijit',
                'C': 'Somya and Sandra',
            }
        },
        21: {
            semester: 4,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Harsha and Abhijit',
            }
        },
        28: {
            semester: 6,
            speakers: {
                'A': 'Harsha and Abhijit',
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
                'B': 'Harsha and Abhijit',
                'C': 'Somya and Sandra',
            }
        },
        23: {
            semester: 6,
            speakers: {
                'A': 'Somya and Sandra',
                'B': 'Krishna and Prateek',
                'C': 'Harsha and Abhijit',
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
    var currentDay = new Date(year, month - 1, 1).getDay();
    var monthData = data[month];

    var cal = '<tr class="week">';
    for (var i = 0; i < currentDay; ++i) cal += '<td></td>';
    for (var i = 1; i <= numOfDays; ++i) {
    
        if (i in monthData)
            cal += '<td><button id="day' + i + '" class="daybtn">' + i + '</button></td>';
        else
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
        $('#day' + day).click(displayInfo);
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


/* Function to display event information. */
var displayInfo = function (event) {
    var date = event.target.id.slice(3);
    var monthname = $('#monthname').text();
    $('#monthname').text(monthname + ' ' + date);
    $('.daysoftheweek').hide();
    $('.week').each(function () {
        $(this).remove();
    })

    if (monthname == 'February')
        var month = 2;
    else if (monthname == 'March')
        var month = 3;
    else if (monthname == 'April')
        var month = 4;

    var spk = data[month][date].speakers;
    var sem = data[month][date].semester;
    eventinfo = '<tr class="event-info"><td colspan=7><ul>';
    eventinfo += '<li><span class="room">' + sem + 'A' + '</span><span class="speaker">' + spk.A + '</span></li>';
    eventinfo += '<li><span class="room">' + sem + 'B' + '</span><span class="speaker">' + spk.B + '</span></li>';
    eventinfo += '<li><span class="room">' + sem + 'C' + '</span><span class="speaker">' + spk.C + '</span></li>';
    eventinfo += '</ul></td></tr>';
    $('.calendar').append(eventinfo);

    $('#next').attr('disabled', true);
    $('#prev').attr('disabled', false);

    $('#prev').off('click');
    $('#prev').click(displayCal);

}

var k = 0;
var displayCal = function () {
    k++;
    var monthname = $('#monthname').text();
    if (monthname.startsWith('February'))
        var month = 2;
    if (monthname.startsWith('March'))
        var month = 3;
    if (monthname.startsWith('April'))
        var month = 4;
    $('.event-info').each(function () { $(this).remove(); });
    $('.daysoftheweek').show();
    calendarSetup(month);
}


$(document).ready(function () {
    calendarSetup();
});
