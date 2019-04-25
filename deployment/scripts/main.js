var currentPage;

const headerContent =
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

const navContent =
'<ul>' +
'    <a href="/user_dash.html"><li data-pagename="user_dash">Dashboard</li></a>' +
'    <a href="/timetable.html"><li data-pagename="timetable">My Timetable</li></a>' +
'    <a href="/health.html"><li data-pagename="health">Health</li></a>' +
'    <a href="/legal.html"><li data-pagename="legal">Legal</li></a>' +
'    <a href="/about.html"><li data-pagename="about">About Us</li></a>' +
'</ul>';

const footerContent =
'<ul>' +
'    <li><a href="/legal.html">Legal</a></li>' + 
'    <li><a href="/about.html">About Us</a></li>' +
'    <li><a href="/contact.html">Contact</a></li>' +
'</ul>' +
'<p>Kieron Gillingham - 2019</p>';

const clientConfig = 
{
    scope: "profile email",
    clientId: "791596452369-msa2qsconhf0gcupsq4r030sr7942dq5.apps.googleusercontent.com"
};
const firebaseConfig = {
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    authDomain: "tourbill.firebaseapp.com",
    projectId: "tourbill"
};

var auth2;
var gapi;

var firebase = require("firebase");
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();

// init is called when the Google platform library is loaded
function gapiLoaded()
{
    // Load the auth2 module from the library
    gapi.load('auth2', initAuth);
    //gapi.load('auth2:client', initAuth); // Dual loading if needed
}

function initAuth()   
{
    auth2 = gapi.auth2.init(clientConfig);
    auth2.then(setCurrentUser,authError);
    console.log("auth2 ready.");
    
}

function onLoad()
{
    console.log("onLoad");

    loadSharedElements();

    currentPage = document.head.dataset.pagename;

    navShowCurrentPage();
 
    userPanel = document.getElementById("user_panel");
    userPanel.onclick = clickUser; 

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

    for (let e of document.getElementsByClassName("quick_start_main"))
    {
        e.onclick = function()
        {
            window.location.href = "/timetable.html";
        }
    }
}

function loadSharedElements()
{
    function setContent(HTMLelement, content)
    {
        for (let e of document.getElementsByClassName(HTMLelement))
        {
            e.innerHTML = content;
        }
    }
    
    setContent("header", headerContent);
    setContent("nav", navContent);
    setContent("footer", footerContent);
}

function signInUser()
{
    var userConsentBox = document.getElementById("user_consent");
    
    if (userConsentBox)
    {
        if (userConsentBox.checked)
        {
            auth2.signIn().then(setCurrentUser);
        }
        else
        {
            alert("Please accept the Terms of Use and Privacy Policy before continuing.")
        }   
    }
}

function signOutUser()
{
    auth2.signOut().then(setCurrentUser);
}

function setCurrentUser()
{
    if (!auth2)
    {
        console.log("No auth2 found.");
        setUserPanel(null);
        return;
    }
    else if (!auth2.isSignedIn.get())
    {
        console.log("No user detected.");
        if (document.head.dataset.pagename == "user_dash")
        {
            window.location.href = "/login.html";
        }
        setUserPanel(null);
        return;
    }
    else
    {
        console.log("Signed in user detected.");

        var profile = auth2.currentUser.get().getBasicProfile();
        // var id_token = auth2.currentUser.get().getAuthResponse().id_token;

        setUserPanel(profile);

        var profileSection = document.getElementById("profile");
        if (profileSection)
        {
            var profilePicture = profileSection.children[0];
            var profileName = profileSection.children[1].children[2];
            var profileEmail = profileSection.children[2].children[2];

            profilePicture.src = profile.getImageUrl();
            profilePicture.alt = "The profile picture of " + profile.getName() + ".";
            profileName.value = profile.getName();
            profileEmail.value = profile.getEmail();
        }
    }
}

function setUserPanel(profile)
{
    if (!profile)
    {
        userPanel.children[1].innerHTML = "Sign-in";
        userPanel.children[0].src = "images/user_icon.png";
    }
    else
    {
        userPanel.children[1].innerHTML = profile.getName();
        userPanel.children[0].src = profile.getImageUrl();
    }
}

function clickUser()
{
    window.location.href = "/login.html";
};

function authError(err)
{
    console.log(err);
}

// Style nav list to show current page
function navShowCurrentPage()
{
    var navTabs = document.querySelectorAll('nav li');
    for (let tab of navTabs)
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
            output.innerHTML += "You should spend " + calcTime + " hours studying for " + unitName + " outside of class.<br>"; 
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