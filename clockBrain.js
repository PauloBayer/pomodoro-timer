let breakIncrement = document.getElementById("break-increment");
let breakDecrement = document.getElementById("break-decrement");

let sessionIncrement = document.getElementById("session-increment");
let sessionDecrement = document.getElementById("session-decrement");

let startStopButton = document.getElementById("start_stop");
let resetButton = document.getElementById("reset");

let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left")
let breakOrSession = document.getElementById("break-or-session");

let timer;
let isItBreak = false;
let timerStatus = "begin";

// Start/Stop Button
startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "stopped") {
        timeLeft.innerText = decrementTime(timeLeft.innerText);
        console.log("start the timer");
        timerStatus = "counting";
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText); 
        }, 1000);
    } else if (timerStatus === "counting") {
        console.log("stop the timer");
        timerStatus = "stopped";
        clearInterval(timer);
    }
})

// Reset Button
resetButton.addEventListener("click", () => {
    console.log("reset button click");
    clearInterval(timer);
    timeLeft.innerText = "25:00";
    sessionLength.innerText = "25";
    breakLength.innerText = "5";
});

// Function for the time
function decrementTime(timeString) {
    let timeDisplay = timeString.split(":");
    let minuteDisplay = parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if (secondDisplay === -1) {
        secondDisplay = 59;
        minuteDisplay -= 1;
    };

    if (secondDisplay < 10) {
        secondDisplay = "0" + secondDisplay;
    }

    if (minuteDisplay < 10) {
        minuteDisplay = "0" + minuteDisplay;
    }

    return minuteDisplay + ":" + secondDisplay;
}

// Session Length

    //Incrementing
sessionIncrement.addEventListener("click", () => {
    
    // To keep it always as 60 max
    if (parseInt(sessionLength.innerText) === 60) {
        sessionLength.innerText = 60;
    } else {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        };

    // Updating display when incrementing
sessionIncrement.addEventListener("click", () => {
    let timeDisplay = timeLeft.innerText.split(":");
    let secondDisplay = parseInt(timeDisplay[1]);
    let minuteDisplay = parseInt(sessionLength.innerText);

    if (minuteDisplay < 10) {
        minuteDisplay = "0" + minuteDisplay;
    }

    if (secondDisplay < 10) {
        secondDisplay = "0" + secondDisplay;
    }

    timeLeft.innerText = minuteDisplay + ":" + secondDisplay;
});
    });

    // Decrementing
sessionDecrement.addEventListener("click", () => {

    // To keep it always as 1 at least
    if (parseInt(sessionLength.innerText) === 1) {
        sessionLength.innerText = 1;
    } else {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        };
    });

    // Updating display when decrementing
sessionDecrement.addEventListener("click", () => {
    let timeDisplay = timeLeft.innerText.split(":");
    let secondDisplay = parseInt(timeDisplay[1]);
    let minuteDisplay = parseInt(sessionLength.innerText);

    if (minuteDisplay < 10) {
        minuteDisplay = "0" + minuteDisplay;
    }

    if (secondDisplay < 10) {
        secondDisplay = "0" + secondDisplay;
    }

    timeLeft.innerText = minuteDisplay + ":" + secondDisplay;
});

// Break Length

    //Incrementing
    breakIncrement.addEventListener("click", () => {
    
    // To keep it always as 60 max
    if (parseInt(breakLength.innerText) === 60) {
        breakLength.innerText = 60;
    } else {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
        };
    });
    
    // Decrementing
    breakDecrement.addEventListener("click", () => {
    
    // To keep it always as 1 at least
    if (parseInt(breakLength.innerText) === 1) {
        breakLength.innerText = 1;
    } else {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
        };
    });

// Time finishes and break starts HOW TO ACTIVATE? MAYBE SETINTERVAL

    // Function to start break;
function breakTime() {
    if (!isItBreak) {
        isItBreak = true;
        if (parseInt(breakLength.innerText) < 10) {
            timeLeft.innerText = "0" + breakLength.innerText + ":00";
        } else {
        timeLeft.innerText = breakLength.innerText + ":00";
        };
    } else {
        isItBreak = false;
        if (parseInt(sessionLength.innerText) < 10) {
            timeLeft.innerText = "0" + sessionLength.innerText + ":00";
        } else {
            timeLeft.innerText = sessionLength.innerText + ":00";
        }
    };
};

// Function to play beep
function play(id) {
    let audio = document.getElementById(id);
    audio.play();
}

// Interval to check the DOM
setInterval(() => {
    // Running the function and the beep
    if (timeLeft.innerText === "00:00" || timeLeft.innerText === "-1:59") {
        breakTime();
        play("beep");
    }
    // Making sure time is always above 0
    if (parseInt(timeLeft.innerText.split(":")) < 10) {
        if (timeLeft.innerText.split(":")[0].length < 2) {
            timeLeft.innerText = "0" + timeLeft.innerText.split(":")[0] + ":" + timeLeft.innerText.split(":")[1];
        }
    }
    // Changing the text to break or session
    if (!isItBreak) {
        breakOrSession.innerText = "Time for a session";
    } else if (isItBreak) {
        breakOrSession.innerText = "It's break time!";
    };
}, 10)
