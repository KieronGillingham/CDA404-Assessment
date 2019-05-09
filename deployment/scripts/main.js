window.addEventListener("load", onLoad);

var header_content =
'<h1>Tourbill</h1>' +
'<a href=/index.html><img class="main_logo" src="images/logo.png" alt="Main Tourbill logo."></a>' +
'<div id="home_buttons">' +
'    <a id="sign_in" href="/login.html"><img src="images/user_icon.png" alt=""></a>' +
'    <a id="quick_start" href="/timetable.html"><img src="images/forward_arrow.png" alt=""></a>' +
'</div> <!-- /home_buttons -->' +
'<section id="user_panel">' +
'    <img src="images/user_icon.png" alt="">' +
'    <p>Sign-in</p>' +
'</section>'

var nav_content =
'<ul>' +
'    <a href="/user_dash.html"><li data-pagename="user_dash">Dashboard</li></a>' +
'    <a href="/timetable.html"><li data-pagename="timetable">My Timetable</li></a>' +
'    <a href="/health.html"><li data-pagename="health">Health</li></a>' +
'    <a href="/legal.html"><li data-pagename="legal">Legal</li></a>' +
'    <a href="/about.html"><li data-pagename="about">About Us</li></a>' +
'</ul>';

var footer_content =
'<ul>' +
'    <li><a href="/legal.html" data-pagename="legal">Legal</a></li>' + 
'    <li><a href="/about.html" data-pagename="about">About Us</a></li>' +
'    <li><a href="/contact.html" data-pagename="contact">Contact</a></li>' +
'</ul>' +
'<p>Kieron Gillingham - 2019</p>' +
'<p>Background Image: Petr Kratochvil</p>';

var user_panel;
var currentPage;

function onLoad()
{
    // Get name of current page
    currentPage = document.head.dataset.pagename;

    // Load in shared elements
    setContent("header", header_content);
    setContent("nav", nav_content);
    setContent("footer", footer_content);

    // Offset nav element if it links to the current page
    navCurrentPage();

    user_panel = document.getElementById("user_panel");
    user_panel.addEventListener("click", clickUser); 

    for (e of document.getElementsByClassName("quick_start_main"))
    {
        e.onclick = function()
        {
            window.location.href = "/timetable.html";
        }
    }
}

function setContent(HTMLelement, content)
{
    for (e of document.getElementsByClassName(HTMLelement))
    {
        e.innerHTML = content;
    }
}

function setUserPanel(profile)
{
    if (!profile)
    {
        user_panel.children[1].innerHTML = "Sign-in";
        user_panel.children[0].src = "images/user_icon.png";
    }
    else
    {
        user_panel.children[1].innerHTML = profile.getName();
        user_panel.children[0].src = profile.getImageUrl();
    }
}

// User panel links to login page
function clickUser()
{
    window.location.href = "/login.html";
};


function navCurrentPage()
{
    // Disable nav bar for current page
    let navTabs = document.querySelectorAll('nav a');
    for (link of navTabs)
    {
        let tab = link.firstChild;
        if (tab.dataset.pagename == currentPage)
        {
            tab.classList.add("active");
            link.tabIndex = "-1";
            link.addEventListener("click", preventDefault);
            break;
        }
    }

    // Disable footer nav for current page
    let footLinks = document.querySelectorAll('footer li a');
    for (link of footLinks)
    {
        if (link.dataset.pagename == currentPage)
        {
            link.classList.add("active");
            link.tabIndex = "-1";
            link.addEventListener("click", preventDefault);
            break;
        }
    }
}

function preventDefault(event)
{
    event.preventDefault();
}

function redirectTo(address)
{
    window.location.href = address;
}

function printError(err)
{
    console.log(err);
}