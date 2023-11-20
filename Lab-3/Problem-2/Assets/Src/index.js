import * as rxjs from 'rxjs';

function startCountdown() {
    const hours = parseInt(document.forms["countdownForm"]["hours"].value);
    const minutes = parseInt(document.forms["countdownForm"]["minutes"].value);
    const seconds = parseInt(document.forms["countdownForm"]["seconds"].value);
    let totalSeconds = 0;

    if (seconds > 0) {
        totalSeconds = seconds;
    }

    if (minutes > 0) {
        totalSeconds += minutes * 60;
    }

    if (hours > 0) {
        totalSeconds += hours * 3600;
    }

    const timeInterval = rxjs.interval(1000).pipe(
        rxjs.take(totalSeconds+1)
    );
timeInterval.subscribe({
        next(value) {
        console.log(value);
        displayTime(totalSeconds);
        totalSeconds -= 1;
    },
    complete() {
        console.log("Timer is done!")
    }
})
}

function displayTime(totalSeconds) {
    const timer = document.getElementById("countdown");
    const hoursRem = Math.floor(totalSeconds / 3600);
    totalSeconds -= hoursRem * 3600;
    const minutesRem = Math.floor((totalSeconds / 60));
    totalSeconds -= minutesRem * 60;
    const secondsRem = totalSeconds;

    console.log(hoursRem);
    console.log(minutesRem);
    console.log(secondsRem);

    const secondsStr = (secondsRem < 10) ? `0${secondsRem}` : secondsRem;
    let timeStr = `${secondsStr}`;
    
    if (minutesRem != 0 || hoursRem != 0) {
        const minutesStr = (minutesRem < 10) ? `0${minutesRem}` : minutesRem;
        timeStr = minutesStr + ":" + timeStr;
    }

    if (hoursRem != 0) {
        const hoursStr = (hoursRem < 10) ? `0${hoursRem}`: hoursRem;
        timeStr = hoursStr + ":" + timeStr;
    }
    timer.innerText = timeStr;
}

const startCountdownBtn = document.getElementById("startCountdown");
rxjs.fromEvent(startCountdownBtn, "click").subscribe(() => startCountdown());