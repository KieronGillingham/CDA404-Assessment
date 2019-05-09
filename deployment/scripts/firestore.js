window.addEventListener("load", onLoad);

var database;

var apiConfig =
{
    apiKey: "AIzaSyBKaSN9ivqv_KNCtDEeaXzsYztYTms-qxo",
    authDomain: "tourbill.firebaseapp.com",
    projectId: "tourbill"
};

function onLoad()
{
    firebase.initializeApp(apiConfig);
    database = firebase.firestore();
}