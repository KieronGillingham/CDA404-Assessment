var auth2;

var clientConfig = 
{
    scope: "profile email",
    client_id: "791596452369-msa2qsconhf0gcupsq4r030sr7942dq5.apps.googleusercontent.com"
};

var user_panel;

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
    user_panel = document.getElementById("user_panel");
    user_panel.onclick = clickUser; 
    setCurrentUser();
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
            var profileName = profileSection.children[1].children[1];
            var profileEmail = profileSection.children[2].children[1];

            profilePicture.src = profile.getImageUrl();
            profileName.value = profile.getName();
            profileEmail.value = profile.getEmail();
        }
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

function clickUser()
{
    window.location.href = "/login.html";
};

function authError(err)
{
    console.log(err);
}