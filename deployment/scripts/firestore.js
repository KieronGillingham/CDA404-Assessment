window.addEventListener("load", onLoad);

var apiConfig =
{
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    authDomain: "tourbill.firebaseapp.com",
    projectId: "tourbill"
};

function firebaseLoaded()
{
    firebase.initializeApp(apiConfig);
    var database = firebase.firestore();
    console.log(database)
}

function onLoad()
{
    console.log("onLoad - firestore.js");
}