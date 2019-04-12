function onSignIn(googleUser)
{
    // Useful data for your client-side scripts:
    // var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    //if (id_token != null)
    //    window.location.href = "/user_dash.html";
    //else
    //    window.location.href = "/login.html";
}