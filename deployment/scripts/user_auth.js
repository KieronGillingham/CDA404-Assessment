window.addEventListener("load", onLoad);

var clientConfig = 
{
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    scope: "profile email https://www.googleapis.com/auth/calendar.events",
    client_id: "791596452369-1s4s8irhm3k15onmbjff5slbr36epa84.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
};

var auth2;
var localclient;

//onreadystatechange="if (this.readyState === 'complete') this.onload()">

// Called when Google platform is loaded
function gapiLoaded()
{
    // Load auth2 and client libraries, calling initAuth() when complete
    gapi.load('auth2:client', initAuth);
}

function initAuth()   
{
    auth2 = gapi.auth2.init(clientConfig);
    auth2.then(setCurrentUser, authError);
    console.log("auth2 ready.");

    localclient = gapi.client.init(clientConfig);
    localclient.then(setClient, authError);
    
    console.log("client ready.");
}

function setClient()
{
    gapi.client.load("https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest").then(listUpcomingEvents);

      // Listen for sign-in state changes.
      //auth2.isSignedIn.listen(setCurrentUser);

      // Handle the initial sign-in state.
      //setCurrentUser();
    }

function onLoad()
{
    console.log("onLoad - user_auth");
}

function signInUser()
{
    user_consent_box = document.getElementById("user_consent");
    if (user_consent_box.checked)
    {
        auth2.signIn().then(setCurrentUser);
    }
    else
    {
        alert("Please accept the Terms of Use and Privacy Policy before continuing.")
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

function authError(err)
{
    console.log("user_auth.js: " + err);
}