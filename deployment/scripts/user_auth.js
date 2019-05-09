var clientConfig = 
{
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    scope: "profile email https://www.googleapis.com/auth/calendar.events",
    client_id: "791596452369-1s4s8irhm3k15onmbjff5slbr36epa84.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
};

var auth2;
var localclient;

// Called when Google platform is loaded
function gapiLoaded()
{
    // Load auth2 and client libraries, calling initAuth() when complete
    gapi.load('auth2:client', initAuthClient);
}

function initAuthClient()   
{
    auth2 = gapi.auth2.init(clientConfig);
    auth2.then(authComplete, printError);

    if (currentPage == "timetable")
    {
        localclient = gapi.client.init(clientConfig);
        localclient.then(loadCalendarAPI, printError);
    }
}

function authComplete()
{
    let signedIn = auth2.isSignedIn.get()

    if (signedIn)
    {
        console.log("User signed in");
        setUser(signedIn);
    }
    else
    {
        auth2.isSignedIn.listen(setUser(signedIn))
    }
}

function signInUser()
{
    user_consent_box = document.getElementById("user_consent");
    if (user_consent_box.checked)
    {
        let user = auth2.signIn();
        user.then(setUser);
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

function setUser(signedIn)
{
    if (!auth2)
    {
        console.log("User authenticator not found.")
    }
    else if (!signedIn)
    {
        console.log("No user detected.");
        
        if (currentPage == "user_dash")
        {
            redirectTo("/login.html");
        }


        setUserPanel(null);
        return;
    }
    else
    {
        console.log("Signed in user detected.");

        let profile = auth2.currentUser.get().getBasicProfile();
        // var id_token = auth2.currentUser.get().getAuthResponse().id_token;

        setUserPanel(profile);

        if (currentPage == "user_dash")
        {
            let profileSection = document.getElementById("profile");
            if (profileSection)
            {
                let image = profileSection.querySelector("img");
                let name = profileSection.querySelectorAll("input")[0];
                let email = profileSection.querySelectorAll("input")[1];

                image.src = profile.getImageUrl();
                image.alt = "The profile picture of " + profile.getName() + ".";
                name.value = profile.getName();
                email.value = profile.getEmail();
            }
        }
        if (currentPage == "contact")
        {
            let contactForm = document.getElementById("contact");
            if (contactForm)
            {
                let name = contactForm.querySelectorAll("input")[0];
                var email = contactForm.querySelectorAll("input")[1];

                name.value = profile.getName();
                email.value = profile.getEmail();
            }
        }
        if(currentPage == "timetable")
        {
            // Check timetable exists and calender is loaded
            if (timetableContainer && gapi.client.calendar)
            {
                timetableLoad();
            }
        }
    }
}