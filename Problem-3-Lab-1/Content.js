function getAllVideos() {
    const allVideos = document.getElementsByTagName('video');
    const divs = document.createElement('div');
    const list = document.createElement('ul');

    // for (let i = 0; i < allVideos.length; i++) {
    //     const listItem = document.createElement('li');
    //     const button = document.createElement('button');


    //     listItem.
    // }
}

function showVideo(videoLink) {

}

function createVideoPlayer() {
    const videoPlayer = document.createElement('div');

    videoPlayer.id = "videoPlayer";
    videoPlayer.style.position = "fixed";
    videoPlayer.style.right = "10px";
    videoPlayer.style.top = "10px";
    videoPlayer.style.margin = "0px";
    videoPlayer.style.backgroundColor = "White";
    videoPlayer.style.width = "100px";
    videoPlayer.style.height = "100px";

    return videoPlayer;
}

function createShowButton() {
    let dialog = document.createElement('dialog');
    let showButton = document.createElement('button');

    showButton.setAttribute("show", "true");
    showButton.id = "ShowButton";
    showButton.innerText = "Show";
    showButton.onclick = () => {
        const buttonRef = document.getElementById("ShowButton");
        if(buttonRef.getAttribute("show") == "true") {
            document.getElementById("videoPlayer").style.display = "none";
            showButton.setAttribute("show", "false");
        } else {
            document.getElementById("videoPlayer").style.display = "block";
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
    const currentBody = document.getElementsByTagName('body')[0];
    currentBody.appendChild(createVideoPlayer())
    currentBody.appendChild(createShowButton());
}

extension();

