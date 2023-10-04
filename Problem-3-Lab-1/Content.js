function createVideoPlayer() {

}

function createShowButton() {
    let dialog = document.createElement('dialog');
    let showButton = document.createElement('button');

    showButton.setAttribute("show", "true");
    showButton.id = "ShowButton";
    showButton.innerText = "Show";
    showButton.onclick = () => {
        const buttonRef = document.getElementById("ShowButton");
        if(buttonRef.getAttribute("show") == "false") {
            showButton.setAttribute("show", "true");
        } else {
            showButton.setAttribute("show", "false");
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
    const currentBody = document.getElementsByTagName('body')[0];
    currentBody.appendChild(Dialog);
}

extension();

