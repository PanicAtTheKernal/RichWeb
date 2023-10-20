async function fetchUserData() {
    const searchStr = document.getElementById("usernameSearch").value.trim();
    const response = await fetch(`https://api.github.com/users/${searchStr}`);
    const body = await response.json();    
    if (response.status == "404") {
        showDialog("User not found");
        return;
    }
    console.log(response);

    fetchUserImage(body["avatar_url"]);
    createRepoObjects(body["repos_url"]);
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

async function createRepoObjects(url) {
    const response = await fetch(url);
    const repos = await response.json();
    const reposDiv = document.getElementById("userReposContent");
    reposDiv.innerHTML = "";

    console.log(repos);
    repos.forEach(repo => {
        createRepoObject(repo, reposDiv);
    });
}

function createRepoObject(repo, reposDiv) {
    const repoDiv = document.createElement("div");

    repoDiv.className = "repoItem border";
    repoDiv.appendChild(createRepoValue(repo["name"], "name"));
    repoDiv.appendChild(createRepoValue(repo["description"], "description"));
    reposDiv.appendChild(repoDiv);
}

function createRepoValue(value, title) {
    const repoValueDiv = document.createElement("div");
    const titleValue = document.createElement("p");
    const valueValue = document.createElement("p");

    titleValue.innerText = `${title}:`;
    valueValue.innerText = value ?? `No ${title} found`;

    repoValueDiv.className = "userValueDiv";
    repoValueDiv.appendChild(titleValue);
    repoValueDiv.appendChild(valueValue);
    return repoValueDiv;
}