window.addEventListener("load", onLoad);

var timetableContainer;

function onLoad()
{
    timetableContainer = document.getElementById("table-frame");
    if (timetableContainer)
    {
        timetableContainer.innerHTML = "<p>No timetable found.</p>"
    }
}

function timetableLoad()
{
    console.log("Loading timetable...");
    timetableContainer.innerHTML = "Loading timetable...";
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    table = "<table><tr>";
    for (let day = 0; day < 7; day++)
    {
        table += "<th>" + days[day] + "</th>";
    }
    table += "</tr>";
        
    for (let row = 0; row < 24; row++)
    {
        table += "<tr>";
        for (let day = 0; day < 7; day++)
        {
            table += "<td></td>";
        }
    }
    table += "</table>";
    timetableContainer.innerHTML = table;

    let tNow = new Date();
    let tNowDay = tNow.getDay();
    let tWeekBeginDate = tNow.getDate() - tNowDay;
    let tWeekBegin = new Date();
    tWeekBegin.setDate(tWeekBeginDate);
    tWeekBegin.setHours(0);
    tWeekBegin.setMinutes(0);
    tWeekBegin.setSeconds(0);
    let tWeekEnd = new Date(tWeekBegin);
    tWeekEnd.setDate(tWeekEnd.getDate()+7);

    console.log(tWeekBegin + " - " + tWeekEnd)

    let weeksEvents =
    {
        'calendarId' : 'primary',
        'singleEvents' : true,
        'timeMin' : tWeekBegin.toISOString(),
        'timeMax' : tWeekEnd.toISOString()
    }

    gapi.client.calendar.events.list(weeksEvents).then(function(response)
    {
        let events = response.result.items;
        for (e of events)
        {
            let date;
            if (e.start.date)
            {
                date = new Date(e.start.date);
            }
            else if (e.start.dateTime)
            {
                date = new Date(e.start.dateTime);
            }
            
            console.log(date);
            let hour = date.getHours();
            let weekday = date.getDay();
            let eventStartCell = timetableContainer.firstChild.firstChild.children[hour+1].children[weekday]
            eventStartCell.innerHTML = e.summary;

            while (hour < new Date(e.end.dateTime).getHours())
            {
                let nextCell = timetableContainer.firstChild.firstChild.children[hour+1].children[weekday];
                nextCell.style.backgroundColor = "#8dd35f";
                hour += 1;
            }
        }
    });
    
}