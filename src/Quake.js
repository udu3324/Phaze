import { shake } from "./Animate";
import { updateCanvas } from "./Maze";
import { phazeToggled, togglePhaze } from "./Phaze";
import { getPlayerPosition, movePlayer, walkOverPath } from "./Tool";

export var quakeToggled = false
export const defaultNumberOfQuakes = 3
var numberOfQuakes = defaultNumberOfQuakes

export function resetQuake() {
    numberOfQuakes = defaultNumberOfQuakes
    setButtonStatus(numberOfQuakes)
}

export function toggleQuake() {
    if (quakeToggled) {
        quakeToggled = false
        setButtonStatus(numberOfQuakes)
    } else {
        if (!(numberOfQuakes < 1)) {
            //dont allow phaze to be toggled at the same time
            if (phazeToggled) {
                togglePhaze()
            }

            quakeToggled = true
            setButtonStatus(numberOfQuakes, true)
        }
    }
    console.log("quake has been toggled to " + quakeToggled)
}

export function setButtonStatus(status, styled) {
    var redobtn = document.querySelector('#quake-btn');

    //fix numbers longer than 2 messing up substring
    var indexOfStatus1 = redobtn.innerHTML.lastIndexOf("[")
    if (indexOfStatus1 === -1) {
        indexOfStatus1 = redobtn.innerHTML.lastIndexOf("(")
    }

    if (styled == null || !styled) {
        redobtn.innerHTML = redobtn.innerHTML.substring(0, indexOfStatus1) + "(" + status + ")";
    } else {
        redobtn.innerHTML = redobtn.innerHTML.substring(0, indexOfStatus1) + "[" + status + "]";
    }
}

export function removeAQuake() {
    //remove one Quake
    numberOfQuakes = numberOfQuakes - 1
    setButtonStatus(numberOfQuakes, true)
}

export function quakePlayer(array, direction) {
    //check if Quakes is more than 0
    if (!(numberOfQuakes < 1)) {

        //get player pos
        var playerPos = getPlayerPosition(array)

        //get items nearby
        var itemUp = array[playerPos[0] - 1][playerPos[1]]
        var itemDown = array[playerPos[0] + 1][playerPos[1]]
        var itemLeft = array[playerPos[0]][playerPos[1] - 1]
        var itemRight = array[playerPos[0]][playerPos[1] + 1]

        //direction provided + check if direction moving in is a space
        //only update canvas if it actually changed something
        switch (direction) {
            case "up":
                if (itemUp === "wall") {
                    if (!((playerPos[0] - 1) === 0)) {
                        array = walkOverPath(array, playerPos, itemUp)

                        array[playerPos[0] - 1][playerPos[1]] = "rainbow"

                        removeAQuake()
                        toggleQuake()
                        updateCanvas()
                        shake(130)
                    } else if (!(itemUp === "wall")) {
                        toggleQuake()
                        movePlayer(array, direction)
                    }
                }
                break;
            case "down":
                if (itemDown === "wall") {
                    if (!((playerPos[0] + 1) === 24)) {
                        array = walkOverPath(array, playerPos, itemDown)

                        array[playerPos[0] + 1][playerPos[1]] = "rainbow"
                        removeAQuake()
                        toggleQuake()
                        updateCanvas()
                        shake(130)
                    } else if (!(itemDown === "wall")) {
                        toggleQuake()
                        movePlayer(array, direction)
                    }
                }
                break;
            case "left":
                if (itemLeft === "wall") {
                    if (!((playerPos[1] - 1) === 0)) {
                        console.log(playerPos[1] - 1)
                        console.log(playerPos[0])
                        array = walkOverPath(array, playerPos, itemLeft)

                        array[playerPos[0]][playerPos[1] - 1] = "rainbow"

                        removeAQuake()
                        toggleQuake()
                        updateCanvas()
                        shake(130)
                    } else if (!(itemLeft === "wall")) {
                        toggleQuake()
                        movePlayer(array, direction)
                    }
                }
                break;
            case "right":
                if (itemRight === "wall") {
                    if (!((playerPos[1] + 1) === 24)) {
                        array = walkOverPath(array, playerPos, itemRight)

                        array[playerPos[0]][playerPos[1] + 1] = "rainbow"

                        removeAQuake()
                        toggleQuake()
                        updateCanvas()
                        shake(130)
                    } else if (!(itemRight === "wall")) {
                        toggleQuake()
                        movePlayer(array, direction)
                    }
                }
                break;
            default:
                console.error("NO VALID DIRECTION PROVIDED!!! (quake)")
        }
    } else {
        toggleQuake()
        movePlayer(array, direction)
    }
}