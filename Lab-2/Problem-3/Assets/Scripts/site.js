async function fetchUserData() {
    const searchStr = document.getElementById("usernameSearch").value.trim();
    const response = await fetch(`https://api.github.com/users/${searchStr}`);
    const body = await response.json();    
    if (response.status == "404") {
        showDialog("User not found");
        return;
    }
    console.log(body);

    fetchUserImage(body["avatar_url"]);
    document.getElementById("userNameValue").innerText = body["name"];
    document.getElementById("userUsernameValue").innerText = body["login"];
    document.getElementById("userEmailValue").innerText = body["email"] ?? "Private email";
    document.getElementById("userLocationValue").innerText = body["location"] ?? "Private location";
    document.getElementById("userNoOfGistsValue").innerText = body["public_gists"];

}

function showDialog(message) {
    const dialog = document.getElementById("dialog");
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.innerText = message;
    dialog.showModal();
}

function closeDialog() {
    const dialog = document.getElementById("dialog");
    dialog.close();
}

function fetchUserImage(url) {
    document.getElementById("userImage").src = url;
}

function createRepoObject() {

}