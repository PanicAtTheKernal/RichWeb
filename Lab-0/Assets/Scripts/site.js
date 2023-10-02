let state = false;

function buttonClick() {
    document.getElementById("text").style.color = (state) ? "blue" : "black";
    state = !state;
}