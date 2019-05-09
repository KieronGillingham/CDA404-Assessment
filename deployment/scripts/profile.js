window.addEventListener("load", onLoad);

function onLoad()
{
    var profileInput = document.getElementById("profile");
    if (profileInput)
    {
        profileInput.onsubmit = function(e)
        {
            preventDefault(e);
            database.collection("users").add({
                name: profileInput.elements.namedItem("name").value,
                email: profileInput.elements.namedItem("email").value,
                location: profileInput.elements.namedItem("location").value,
                placeofstudy: profileInput.elements.namedItem("place-of-study").value,
            }).then(function(){
                alert("Your profile details have been ammended.");
            }).catch(printError);
        }
    }
}