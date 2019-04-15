var auth2;

var clientConfig = 
{
    scope: 'profile email',
    client_id: '791596452369-msa2qsconhf0gcupsq4r030sr7942dq5.apps.googleusercontent.com'
};

function init()
{
    gapi.load('auth2', function()
    {
        auth2 = gapi.auth2.init(clientConfig);
        auth2.then(setCurrentUser,authError);
        console.log("auth ready.");
    });
}

function onLoad()
{
    console.log("onLoad");
    setCurrentUser();
    userpanel = document.getElementById("user_panel");
    console.log(userpanel);
    userpanel.onclick = function()
    {
        console.log("click");
        window.location.href = "/login.html";
    };
}

function onSignIn(googleUser)
{
    // Useful data for your client-side scripts:
    //var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
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

        var user_panel = document.getElementById("user_panel")
        user_panel.children[1].innerHTML = profile.getName();
        user_panel.children[0].src = profile.getImageUrl();
    }
}

function clickUser()
{
    console.log("Clicked user panel");
}

function authError(err)
{
    console.log(err);
}