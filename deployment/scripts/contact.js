window.addEventListener("load", onLoad);

function onLoad()
{
    var contactForm = document.getElementById("contact");
    if (contactForm)
    {
        contactForm.onsubmit = function(e)
        {
            preventDefault(e);

            let details = {
                name: contactForm.elements.namedItem("name").value,
                email: contactForm.elements.namedItem("email").value,
                topic: contactForm.elements.namedItem("topic").value,
                message: contactForm.elements.namedItem("message").value
            }

            database.collection("contactForm").add(details)
        }
    }
}