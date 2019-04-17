function onLoad()
{
    console.log("signinRedirect")

    gapi.load('auth2', function()
    {
        auth2 = gapi.auth2.init(clientConfig);
        auth2.then(redirect,authError);
    });
}

function redirect()
{
    if(!auth2.isSignedIn.get())
        window.location.href = "/login.html";
}