import { gameMaze } from ".";
import { shake } from "./Animate";
import { updateCanvas } from "./Maze";
import { phazeToggled, togglePhaze } from "./Phaze";
import { getPlayerPosition, movePlayer, walkOverPath } from "./Tool";

export var quakeToggled = false
export const defaultNumberOfQuakes = 3
export var numberOfQuakes = defaultNumberOfQuakes

export var quakedWalls = []

export function resetQuake() {
    quakedWalls = []
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
            if (phazeToggled)
                togglePhaze()

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
    if (indexOfStatus1 === -1)
        indexOfStatus1 = redobtn.innerHTML.lastIndexOf("(")

    if (styled == null || !styled)
        redobtn.innerHTML = redobtn.innerHTML.substring(0, indexOfStatus1) + "(" + status + ")";
    else
        redobtn.innerHTML = redobtn.innerHTML.substring(0, indexOfStatus1) + "[" + status + "]";
}

export function removeAQuake() {
    //remove one Quake
    numberOfQuakes = numberOfQuakes - 1
    setButtonStatus(numberOfQuakes, true)
}

export function quakePlayer(direction) {
    //check if Quakes is more than 0
    if (numberOfQuakes < 1) {
        toggleQuake()
        movePlayer(direction)
        return
    }

    //get player pos
    var playerPos = getPlayerPosition()

    //get items nearby
    var itemUp = gameMaze[playerPos[0] - 1][playerPos[1]]
    var itemDown = gameMaze[playerPos[0] + 1][playerPos[1]]
    var itemLeft = gameMaze[playerPos[0]][playerPos[1] - 1]
    var itemRight = gameMaze[playerPos[0]][playerPos[1] + 1]

    //direction provided + check if direction moving in is a space
    //only update canvas if it actually changed something
    switch (direction) {
        case "up":
            if (itemUp === "wall") {
                if (!((playerPos[0] - 1) === 0)) {
                    walkOverPath(playerPos, itemUp)

                    quakedWalls.push([[playerPos[0] - 1], [playerPos[1]]])
                    gameMaze[playerPos[0] - 1][playerPos[1]] = "rainbow"

                    removeAQuake()
                    toggleQuake()
                    updateCanvas()
                    shake(130)
                }
            } else {
                toggleQuake()
                movePlayer(direction)
            }
            break;
        case "down":
            if (itemDown === "wall") {
                if (!((playerPos[0] + 1) === 24)) {
                    walkOverPath(playerPos, itemDown)

                    quakedWalls.push([[playerPos[0] + 1], [playerPos[1]]])
                    gameMaze[playerPos[0] + 1][playerPos[1]] = "rainbow"

                    removeAQuake()
                    toggleQuake()
                    updateCanvas()
                    shake(130)
                }
            } else {
                toggleQuake()
                movePlayer(direction)
            }
            break;
        case "left":
            if (itemLeft === "wall") {
                if (!((playerPos[1] - 1) === 0)) {
                    walkOverPath(playerPos, itemLeft)

                    quakedWalls.push([[playerPos[0]], [playerPos[1] - 1]])
                    gameMaze[playerPos[0]][playerPos[1] - 1] = "rainbow"

                    removeAQuake()
                    toggleQuake()
                    updateCanvas()
                    shake(130)
                }
            } else {
                toggleQuake()
                movePlayer(direction)
            }
            break;
        case "right":
            if (itemRight === "wall") {
                if (!((playerPos[1] + 1) === 24)) {
                    walkOverPath(playerPos, itemRight)

                    quakedWalls.push([[playerPos[0]], [playerPos[1] + 1]])
                    gameMaze[playerPos[0]][playerPos[1] + 1] = "rainbow"

                    removeAQuake()
                    toggleQuake()
                    updateCanvas()
                    shake(130)
                }
            } else {
                toggleQuake()
                movePlayer(direction)
            }
            break;
        default:
            console.error("NO VALID DIRECTION PROVIDED!!! (quake)")
    }
}