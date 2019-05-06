var clientConfig = 
{
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    scope: "profile email https://www.googleapis.com/auth/calendar.events",
    client_id: "791596452369-1s4s8irhm3k15onmbjff5slbr36epa84.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
};

var auth2;

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

    let localclient = gapi.client.init(clientConfig);
    localclient.then(loadCalendarAPI, printError);
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

function loadCalendarAPI()
{
    gapi.client.load("https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", calendarLoaded);
}

function calendarLoaded()
{
    console.log("Calendar loaded");
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

function printError(err)
{
    console.log(err);
}