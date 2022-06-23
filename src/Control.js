import { toggleConfig } from "./Config"
import { togglePhaze } from "./Phaze"
import { toggleQuake } from "./Quake"
import { finished, movePlayer, redoMaze, resetMaze } from "./Tool"

export var controlls = true

export function canControl(bool) {
    controlls = bool
}
export function createControls() {

    //keyboard controls
    document.addEventListener('keydown', function (event) {
        if (event.key === "a" || event.key === "ArrowLeft") {
            movePlayer("left")
            document.getElementById("left-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "d" || event.key === "ArrowRight") {
            movePlayer("right")
            document.getElementById("right-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "w" || event.key === "ArrowUp") {
            movePlayer("up")
            document.getElementById("up-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "s" || event.key === "ArrowDown") {
            movePlayer("down")
            document.getElementById("down-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "c") {
            toggleConfig()
            document.getElementById("config-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "e") {
            togglePhaze()
            document.getElementById("phaze-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "q") {
            toggleQuake()
            document.getElementById("quake-btn").style.backgroundColor = "#00000086"
        } else if (event.key === "r") {
            document.getElementById("redo-reset-btn").style.backgroundColor = "#00000086"
            if (finished) {
                //change reset button to redo
                var redobtn = document.querySelector('#redo-reset-btn');
                redobtn.innerHTML = redobtn.innerHTML.substring(0, redobtn.innerHTML.length - 4) + "edo";

                resetMaze()
            } else {
                redoMaze()
            }
        }
    })

    document.addEventListener('keyup', function (event) {
        if (event.key === "a" || event.key === "ArrowLeft") {
            document.getElementById("left-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "d" || event.key === "ArrowRight") {
            document.getElementById("right-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "w" || event.key === "ArrowUp") {
            document.getElementById("up-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "s" || event.key === "ArrowDown") {
            document.getElementById("down-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "c") {
            document.getElementById("config-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "e") {
            document.getElementById("phaze-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "q") {
            document.getElementById("quake-btn").style.backgroundColor = "#00000000"
        } else if (event.key === "r") {
            document.getElementById("redo-reset-btn").style.backgroundColor = "#00000000"
        }
    })


    //touch controls
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* right swipe */
            movePlayer("right")
        } else {
            /* left swipe */
            movePlayer("left")
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
            movePlayer("down")
        } else {
            /* up swipe */
            movePlayer("up")
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
