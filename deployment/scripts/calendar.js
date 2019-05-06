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
    gapi.client.calendar.events.list({'calendarId' : 'primary'}).then(function(response)
    {
        let events = response.result.items;
        for (e of events)
        {
            let date = new Date(e.start.dateTime);
            console.log(date);
            let hour = date.getHours();
            let weekday = date.getDay();
            timetableContainer.firstChild.firstChild.children[hour+1].children[weekday].style.backgroundColor = "black";
        }
    });
    
}