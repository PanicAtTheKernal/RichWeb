function getAllLinks() {
    const allLinks = document.getElementsByTagName("a");
    const div = document.createElement("div");
    const list = document.createElement("ul");

    if (allLinks.length == 0) {
        div.innerText = "No links found";
        return div;
    }

    for (let i = 0; i < allLinks.length; i++) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.title = allLinks[i].title;
        link.innerText = allLinks[i].innerText;
        link.href = allLinks[i].href;

        listItem.appendChild(link);
        list.appendChild(listItem);
    }

    div.appendChild(list);
    return div;
}

function createlinks() {
    const links = document.createElement("div");

    links.id = "links";
    links.style.position = "fixed";
    links.style.right = "10px";
    links.style.bottom = "10px";
    links.style.margin = "0px";
    links.style.padding = "10px";
    links.style.width = "fitContent";
    links.style.maxHeight = "200px";
    links.style.overflow = "scroll";
    links.style.backgroundColor = "White";
    links.style.border = "1px solid black";

    links.appendChild(getAllLinks());

    return links;
}

function createShowButton() {
    let dialog = document.createElement("dialog");
    let showButton = document.createElement("button");

    showButton.setAttribute("show", "true");
    showButton.id = "ShowButton";
    showButton.innerText = "Show";
    showButton.onclick = () => {
        const buttonRef = document.getElementById("ShowButton");
        if(buttonRef.getAttribute("show") == "true") {
            document.getElementById("links").style.display = "none";
            showButton.setAttribute("show", "false");
        } else {
            document.getElementById("links").style.display = "block";
            showButton.setAttribute("show", "true");
        }
    }

    dialog.appendChild(showButton);
    dialog.style.position = "fixed";
    dialog.style.left = "10px";
    dialog.style.bottom = "10px";
    dialog.style.margin = "0px";
    dialog.style.padding = "0px";
    dialog.show();

    return dialog
}

function extension() {
    const currentBody = document.getElementsByTagName("body")[0];
    currentBody.appendChild(createlinks())
    currentBody.appendChild(createShowButton());
}

extension();

