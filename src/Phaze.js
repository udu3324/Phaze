import { gameMaze } from ".";
import { shakeHard } from "./Animate";
import { updateCanvas } from "./Maze";
import { quakeToggled, toggleQuake } from "./Quake";
import { finishedMaze, getPlayerPosition, movePlayer, walkOverPath } from "./Tool";

export var phazeToggled = false
export const defaultNumberOfPhazes = 10
export var numberOfPhazes = defaultNumberOfPhazes

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

export function phazePlayer(direction) {
    //check if phazes is more than 0
    if (!(numberOfPhazes < 1)) {

        //get player pos
        var originalPlayerPos = getPlayerPosition()
        var playerPosGhost = originalPlayerPos

        //get items nearby
        var itemUp = gameMaze[playerPosGhost[0] - 1][playerPosGhost[1]]
        var itemDown = gameMaze[playerPosGhost[0] + 1][playerPosGhost[1]]
        var itemLeft = gameMaze[playerPosGhost[0]][playerPosGhost[1] - 1]
        var itemRight = gameMaze[playerPosGhost[0]][playerPosGhost[1] + 1]

        //direction provided + check if direction moving in is a space
        //only update canvas if it actually changed something
        switch (direction) {
            case "up":
                if (itemUp === "finish") {
                    removeAPhaze()
                    finishedMaze()
                } else if (!(itemUp === "wall")) {
                    walkOverPath(playerPosGhost, itemUp)
                    for (let i = 0; i < gameMaze.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[0] = playerPosGhost[0] - 1

                        //get new nearby items
                        itemUp = gameMaze[playerPosGhost[0] - 1][playerPosGhost[1]]

                        itemLeft = gameMaze[playerPosGhost[0]][playerPosGhost[1] - 1]
                        itemRight = gameMaze[playerPosGhost[0]][playerPosGhost[1] + 1]

                        //check if item is finish
                        if (itemUp === "finish") {
                            walkOverPath(playerPosGhost, itemUp)
                            finishedMaze()
                            break
                        }

                        //check if item in front is a wall
                        if (itemUp === "wall") {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        //check if left or right is not a wall
                        if (!(itemLeft === "wall") || !(itemRight === "wall")) {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        walkOverPath(playerPosGhost, itemUp)
                        gameMaze[playerPosGhost[0] - 1][playerPosGhost[1]] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                    shakeHard(80, "up")
                }
                break;
            case "down":
                if (itemDown === "finish") {
                    removeAPhaze()
                    finishedMaze()
                } else if (!(itemDown === "wall")) {
                    walkOverPath(playerPosGhost, itemDown)
                    for (let i = 0; i < gameMaze.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[0] = playerPosGhost[0] + 1

                        //get new nearby items
                        itemDown = gameMaze[playerPosGhost[0] + 1][playerPosGhost[1]]

                        itemLeft = gameMaze[playerPosGhost[0]][playerPosGhost[1] - 1]
                        itemRight = gameMaze[playerPosGhost[0]][playerPosGhost[1] + 1]

                        //check if item is finish
                        if (itemDown === "finish") {
                            walkOverPath(playerPosGhost, itemDown)
                            finishedMaze()
                            break
                        }

                        //check if item behind is a wall
                        if (itemDown === "wall") {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        //check if left or right is not a wall
                        if (!(itemLeft === "wall") || !(itemRight === "wall")) {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        walkOverPath(playerPosGhost, itemDown)
                        gameMaze[playerPosGhost[0] + 1][playerPosGhost[1]] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                    shakeHard(80, "down")
                }
                break;
            case "left":
                if (itemLeft === "finish") {
                    removeAPhaze()
                    finishedMaze()
                } else if (!(itemLeft === "wall")) {
                    walkOverPath(playerPosGhost, itemLeft)
                    for (let i = 0; i < gameMaze.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[1] = playerPosGhost[1] - 1

                        //get new nearby items
                        itemLeft = gameMaze[playerPosGhost[0]][playerPosGhost[1] - 1]

                        itemUp = gameMaze[playerPosGhost[0] - 1][playerPosGhost[1]]
                        itemDown = gameMaze[playerPosGhost[0] + 1][playerPosGhost[1]]

                        //check if item is finish
                        if (itemLeft === "finish") {
                            walkOverPath(playerPosGhost, itemLeft)
                            finishedMaze()
                            break
                        }

                        //check if item in front is a wall
                        if (itemLeft === "wall") {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        //check if up or down is not a wall
                        if (!(itemUp === "wall") || !(itemDown === "wall")) {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        walkOverPath(playerPosGhost, itemLeft)
                        gameMaze[playerPosGhost[0]][playerPosGhost[1] - 1] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                    shakeHard(80, "left")
                }
                break;
            case "right":
                if (itemRight === "finish") {
                    removeAPhaze()
                    finishedMaze()
                } else if (!(itemRight === "wall")) {
                    walkOverPath(playerPosGhost, itemRight)
                    for (let i = 0; i < gameMaze.length - 2; i++) {
                        //move up one since there is a space
                        playerPosGhost[1] = playerPosGhost[1] + 1

                        //get new nearby items
                        itemRight = gameMaze[playerPosGhost[0]][playerPosGhost[1] + 1]

                        itemUp = gameMaze[playerPosGhost[0] - 1][playerPosGhost[1]]
                        itemDown = gameMaze[playerPosGhost[0] + 1][playerPosGhost[1]]

                        //check if item is finish
                        if (itemRight === "finish") {
                            walkOverPath(playerPosGhost, itemRight)
                            finishedMaze()
                            break
                        }

                        //check if item in front is a wall
                        if (itemRight === "wall") {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        //check if up or down is not a wall
                        if (!(itemUp === "wall") || !(itemDown === "wall")) {
                            gameMaze[playerPosGhost[0]][playerPosGhost[1]] = "rainbow"
                            break
                        }

                        walkOverPath(playerPosGhost, itemRight)
                        gameMaze[playerPosGhost[0]][playerPosGhost[1] + 1] = "rainbow"

                        //else it would continue to loop
                    }

                    removeAPhaze()
                    updateCanvas()
                    shakeHard(80, "right")
                }
                break;
            default:
                console.error("NO VALID DIRECTION PROVIDED!!! (phaze)")
        }
    } else {
        togglePhaze()
        movePlayer(direction)
    }
}