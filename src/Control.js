import { gameMaze } from "."

import { toggleConfig } from "./Config"
import { togglePhaze } from "./Phaze"
import { toggleQuake } from "./Quake"
import { finished, movePlayer, redoMaze, resetMaze } from "./Tool"

export function createControls() {

    //keyboard controls
    document.addEventListener('keydown', function (event) {
        if (event.key === "a" || event.key === "ArrowLeft") {
            movePlayer(gameMaze, "left")
        } else if (event.key === "d" || event.key === "ArrowRight") {
            movePlayer(gameMaze, "right")
        } else if (event.key === "w" || event.key === "ArrowUp") {
            movePlayer(gameMaze, "up")
        } else if (event.key === "s" || event.key === "ArrowDown") {
            movePlayer(gameMaze, "down")
        } else if (event.key === "r") {
            if (finished) {
                //change reset button to redo
                var redobtn = document.querySelector('#redo-reset-btn');
                redobtn.innerHTML = redobtn.innerHTML.substring(0, redobtn.innerHTML.length - 4) + "edo";

                resetMaze(gameMaze)
            } else {
                redoMaze(gameMaze)
            }
        } else if (event.key === "c") {
            toggleConfig()
        } else if (event.key === "e") {
            togglePhaze()
        } else if (event.key === "q") {
            toggleQuake()
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
            movePlayer(gameMaze, "right")
        } else {
            /* left swipe */
            movePlayer(gameMaze, "left")
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
            movePlayer(gameMaze, "down")
        } else {
            /* up swipe */
            movePlayer(gameMaze, "up")
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
