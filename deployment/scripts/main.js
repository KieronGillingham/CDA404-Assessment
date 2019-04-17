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
    setCurrentUser();
    user_panel = document.getElementById("user_panel");
    user_panel.onclick = clickUser; 
}

function signInToGoogle()
{
    auth2.signIn();
}

function setCurrentUser()
{
    if (!auth2)
    {
        console.log("No auth2 found.");
        return;
    }
    else if (!auth2.isSignedIn.get())
    {
        console.log("No user detected.");
        return;
    }
    else
    {
        console.log("Signed in user detected.");

        var profile = auth2.currentUser.get().getBasicProfile();
        /*
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        */
        // The ID token you need to pass to your backend:
        var id_token = auth2.currentUser.get().getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        var user_panel = document.getElementById("user_panel");
        user_panel.children[1].innerHTML = profile.getName();
        user_panel.children[0].src = profile.getImageUrl();

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

function clickUser()
{
    window.location.href = "/login.html";
};

function authError(err)
{
    console.log(err);
}