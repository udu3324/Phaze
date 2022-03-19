import { updateCanvas } from "./Maze";
import { quakeToggled, toggleQuake } from "./Quake";
import { finishedMaze, getPlayerPosition, movePlayer, walkOverPath } from "./Tool";

export var phazeToggled = false
export const defaultNumberOfPhazes = 10
var numberOfPhazes = defaultNumberOfPhazes

export function resetPhaze() {
    numberOfPhazes = defaultNumberOfPhazes
    setButtonStatus(numberOfPhazes)
}
export function togglePhaze() {
    if (phazeToggled) {
        phazeToggled = false
        setButtonStatus(numberOfPhazes)
    } else {
        if (!(numberOfPhazes < 1)) {
            //dont allow quake to be toggled at the same time
            if (quakeToggled) {
                toggleQuake()
            }

            phazeToggled = true
            setButtonStatus(numberOfPhazes, true)
        }
    }
    console.log("phaze has been toggled to " + phazeToggled)
}

export function setButtonStatus(status, styled) {
    var redobtn = document.querySelector('#phaze-btn');

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

export function removeAPhaze() {
    //remove one phaze
    numberOfPhazes = numberOfPhazes - 1
    setButtonStatus(numberOfPhazes, true)
}

export function phazePlayer(array, direction) {
    //check if phazes is more than 0
    if (!(numberOfPhazes < 1)) {

        //get player pos
        var originalPlayerPos = getPlayerPosition(array)
        var playerPosGhost = originalPlayerPos


        //get items nearby
        var itemUp = array[playerPosGhost[0] - 1][playerPosGhost[1]]
        var itemDown = array[playerPosGhost[0] + 1][playerPosGhost[1]]
        var itemLeft = array[playerPosGhost[0]][playerPosGhost[1] - 1]
        var itemRight = array[playerPosGhost[0]][playerPosGhost[1] + 1]

        //direction provided + check if direction moving in is a space
        //only update canvas if it actually changed something
        switch (direction) {
            case "up":
                if (itemUp === "finish") {
                    removeAPhaze()
                    finishedMaze(array)
                } else if (!(itemUp === "wall")) {
                    array = walkOverPath(array, playerPosGhost, itemUp)
                    for (let i = 0; i < array.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[0] = playerPosGhost[0] - 1

                        //get new nearby items
                        itemUp = array[playerPosGhost[0] - 1][playerPosGhost[1]]

                        itemLeft = array[playerPosGhost[0]][playerPosGhost[1] - 1]
                        itemRight = array[playerPosGhost[0]][playerPosGhost[1] + 1]

                        //check if item is finish
                        if (itemUp === "finish") {
                            array = walkOverPath(array, playerPosGhost, itemUp)
                            finishedMaze(array)
                            break
                        }

                        //check if item in front is a wall
                        if (itemUp === "wall") {
                            break
                        }

                        //check if left or right is not a wall
                        if (!(itemLeft === "wall") || !(itemRight === "wall")) {
                            break
                        }

                        array = walkOverPath(array, playerPosGhost, itemUp)
                        array[playerPosGhost[0] - 1][playerPosGhost[1]] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                }
                break;
            case "down":
                if (itemDown === "finish") {
                    removeAPhaze()
                    finishedMaze(array)
                } else if (!(itemDown === "wall")) {
                    array = walkOverPath(array, playerPosGhost, itemDown)
                    for (let i = 0; i < array.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[0] = playerPosGhost[0] + 1

                        //get new nearby items
                        itemDown = array[playerPosGhost[0] + 1][playerPosGhost[1]]

                        itemLeft = array[playerPosGhost[0]][playerPosGhost[1] - 1]
                        itemRight = array[playerPosGhost[0]][playerPosGhost[1] + 1]

                        //check if item is finish
                        if (itemDown === "finish") {
                            array = walkOverPath(array, playerPosGhost, itemDown)
                            finishedMaze(array)
                            break
                        }

                        //check if item behind is a wall
                        if (itemDown === "wall") {
                            break
                        }

                        //check if left or right is not a wall
                        if (!(itemLeft === "wall") || !(itemRight === "wall")) {
                            break
                        }

                        array = walkOverPath(array, playerPosGhost, itemDown)
                        array[playerPosGhost[0] + 1][playerPosGhost[1]] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                }
                break;
            case "left":
                if (itemLeft === "finish") {
                    removeAPhaze()
                    finishedMaze(array)
                } else if (!(itemLeft === "wall")) {
                    array = walkOverPath(array, playerPosGhost, itemLeft)
                    for (let i = 0; i < array.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[1] = playerPosGhost[1] - 1

                        //get new nearby items
                        itemLeft = array[playerPosGhost[0]][playerPosGhost[1] - 1]

                        itemUp = array[playerPosGhost[0] - 1][playerPosGhost[1]]
                        itemDown = array[playerPosGhost[0] + 1][playerPosGhost[1]]

                        //check if item is finish
                        if (itemLeft === "finish") {
                            array = walkOverPath(array, playerPosGhost, itemLeft)
                            finishedMaze(array)
                            break
                        }

                        //check if item in front is a wall
                        if (itemLeft === "wall") {
                            break
                        }

                        //check if up or down is not a wall
                        if (!(itemUp === "wall") || !(itemDown === "wall")) {
                            break
                        }

                        array = walkOverPath(array, playerPosGhost, itemLeft)
                        array[playerPosGhost[0]][playerPosGhost[1] - 1] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                }
                break;
            case "right":
                if (itemRight === "finish") {
                    removeAPhaze()
                    finishedMaze(array)
                } else if (!(itemRight === "wall")) {
                    array = walkOverPath(array, playerPosGhost, itemRight)
                    for (let i = 0; i < array.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[1] = playerPosGhost[1] + 1

                        //get new nearby items
                        itemRight = array[playerPosGhost[0]][playerPosGhost[1] + 1]

                        itemUp = array[playerPosGhost[0] - 1][playerPosGhost[1]]
                        itemDown = array[playerPosGhost[0] + 1][playerPosGhost[1]]

                        //check if item is finish
                        if (itemRight === "finish") {
                            array = walkOverPath(array, playerPosGhost, itemRight)
                            finishedMaze(array)
                            break
                        }

                        //check if item in front is a wall
                        if (itemRight === "wall") {
                            break
                        }

                        //check if up or down is not a wall
                        if (!(itemUp === "wall") || !(itemDown === "wall")) {
                            break
                        }

                        array = walkOverPath(array, playerPosGhost, itemRight)
                        array[playerPosGhost[0]][playerPosGhost[1] + 1] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                }
                break;
            default:
                console.error("NO VALID DIRECTION PROVIDED!!! (phaze)")
        }
    } else {
        togglePhaze()
        movePlayer(array, direction)
    }
}