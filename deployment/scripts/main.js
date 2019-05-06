window.addEventListener("load", onLoad);

var header_content =
'<h1>Tourbill</h1>' +
'<a href=/index.html><img class="main_logo" src="images/logo.png" alt="Logo"></a>' +
'<div id="home_buttons">' +
'    <a id="sign_in" href="/login.html"><img src="images/user_icon.png" alt="User icon."></a>' +
'    <a id="quick_start" href="/timetable.html"><img src="images/forward_arrow.png" alt="A forward arrow."></a>' +
'</div> <!-- /home_buttons -->' +
'<section id="user_panel">' +
'    <img src="images/user_icon.png" alt="User icon.">' +
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
'    <li><a href="/legal.html">Legal</a></li>' + 
'    <li><a href="/about.html">About Us</a></li>' +
'    <li><a href="/contact.html">Contact</a></li>' +
'</ul>' +
'<p>Kieron Gillingham - 2019</p>';

var user_panel;
var currentPage;

function onLoad()
{
    console.log("onLoad - main.js");

    // Get name of current page
    currentPage = document.head.dataset.pagename;

    // Load in shared elements
    setContent("header", header_content);
    setContent("nav", nav_content);
    setContent("footer", footer_content);

    // Offset nav element if it links to the current page
    navShowCurrentPage();

    user_panel = document.getElementById("user_panel");
    user_panel.addEventListener("click",clickUser); 

    if (currentPage == "timetable")
    {
        var calcInput = document.getElementById("calculator");
        if (calcInput)
        {
            calcInput.onsubmit = function(e)
            {
                e.preventDefault();
                calculateTimetable(calcInput);
            }
        }
    }

    if (currentPage == "user_dash")
    {
        var profileInput = document.getElementById("profile");
        if (profileInput)
        {
            profileInput.onsubmit = function(e)
            {
                e.preventDefault();
                database.collection("users").add({
                    name: profileInput.elements.namedItem("name").value,
                    email: profileInput.elements.namedItem("email").value,
                    location: profileInput.elements.namedItem("location").value,
                    placeofstudy: profileInput.elements.namedItem("place-of-study").value,
                })
            }
        }
    }

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

function signInUser()
{
    user_consent_box = document.getElementById("user_consent");
    if (user_consent_box.checked)
    {
        auth2.signIn().then(setUser);
    }
    else
    {
        alert("Please accept the Terms of Use and Privacy Policy before continuing.")
    }
}

function signOutUser()
{
    auth2.signOut().then(setUser);
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

// Style nav list to show current page
function navShowCurrentPage()
{
    let navTabs = document.querySelectorAll('nav li');
    for (tab of navTabs)
    {
        if (tab.dataset.pagename == currentPage)
        {
            tab.classList.add("active");
            break;
        }
    }
}

function calculateTimetable(calcInput)
{
    var output = document.getElementById("output");

    output.innerHTML = "";

    function writeLine(unitName, calcTime)
    {
        if (unitName && calcTime)
        {
            output.innerHTML += "You should spend " + calcTime + " hours studying for " + unitName + " outside of class.<br>"; 
        }
    }
    writeLine
    (
        calcInput.elements.namedItem("unit1").value,
        2 * parseInt(calcInput.elements.namedItem("unit1_hours").value)
    );
    writeLine
    (
        calcInput.elements.namedItem("unit2").value,
        2 * parseInt(calcInput.elements.namedItem("unit2_hours").value)
    );
    writeLine
    (
        calcInput.elements.namedItem("unit3").value,
        2 * parseInt(calcInput.elements.namedItem("unit3_hours").value)
    );
}

function redirectTo(address)
{
    window.location.href = address;
}