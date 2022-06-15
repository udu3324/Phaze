import maze from 'amazejs';
import { newMaze } from '.';
import { shake } from './Animate';
import { updateCanvas } from './Maze';
import { phazePlayer, phazeToggled, resetPhaze, togglePhaze } from './Phaze';
import { quakePlayer, quakeToggled, resetQuake, toggleQuake } from './Quake';
import { setRunningShared, setTimeShared } from './Stopwatch';

export var finished = false;

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

export function createMaze(mazeSize) {
    //create a maze
    var m = new maze.Backtracker(mazeSize, mazeSize);
    m.generate();

    var mazeString = m.toString().replaceAll("\u2588", 1).replaceAll(" ", 0)

    //create the array
    var mazeArray = createArray(mazeSize, mazeSize)

    //count lines of maze string
    var countOfLines = mazeString.split(/\r\n|\r|\n/).length - 1

    //convert mazeString to mazeArray
    var startingSubstringTemp = 0;

    for (let index = 0; index < countOfLines; ++index) {
        //get current row in string
        var strRow = mazeString.substring(startingSubstringTemp, countOfLines + 1 + startingSubstringTemp).substring(1)

        //convert it to a array and add it to mazeArray
        mazeArray[index] = Array.from(strRow)

        startingSubstringTemp = countOfLines + 1 + startingSubstringTemp;
    }

    //replace 1s and 0s with walls and spaces
    mazeArray = replace(mazeArray, "0", "space")
    mazeArray = replace(mazeArray, "1", "wall")

    //place down start and ending positions
    mazeArray[countOfLines - 2][1] = "start"
    mazeArray[1][countOfLines - 2] = "finish"

    return mazeArray;
}

export function replace(array, item, replacing) {
    //for each x and y
    for (var x = 0; x < array.length; x++) {
        for (var y = 0; y < array.length; y++) {
            if (array[y][x] === item) {
                array[y][x] = replacing
            }
        }
    }
    return array
}

export function findItem(array, item) {
    //for each x and y
    for (var x = 0; x < array.length; x++) {
        for (var y = 0; y < array.length; y++) {
            if (array[y][x] === item) {
                return [y, x];   // Found it 
            }
        }
    }

    return false;   // Not found
}

export function getPlayerPosition(array) {
    var attempt1 = findItem(array, "rainbow")
    var attempt2 = findItem(array, "start")

    if (!(attempt1 === false)) {
        return attempt1
    } else if (!(attempt2 === false)) {
        return attempt2
    } else {
        return false;
    }
}

export function walkOverPath(array, playerPos, item) {
    if (item === "path") {
        array[playerPos[0]][playerPos[1]] = "space"
    } else {
        array[playerPos[0]][playerPos[1]] = "path"
    }

    return array
}

export function resetMaze() {
    //reset maze by creating a new one and updating canvas
    console.log("resetting maze!")

    newMaze()

    finished = false;

    //stop and reset timer
    setRunningShared(false)
    setTimeShared(0)

    resetPhaze()
    resetQuake()
    updateCanvas()
}

export function redoMaze(array) {
    console.log("redoing maze!")

    //turn all path to space
    //turn all rainbow to space
    //add back start
    replace(array, "path", "space")
    replace(array, "rainbow", "space")
    array[array.length - 2][1] = "start"

    //stop and reset timer
    setRunningShared(false)
    setTimeShared(0)

    resetPhaze()
    resetQuake()
    boolRunOnce = true
    //toggle all tools off
    if (phazeToggled) {
        togglePhaze()
    }
    if (quakeToggled) {
        toggleQuake()
    }

    updateCanvas()
}

export function finishedMaze(array) {
    //stop timer
    setRunningShared(false)

    finished = true
    console.log("finished!")

    //replace path and finish with rainbow
    replace(array, "path", "rainbow")

    var finishPos = findItem(array, "finish")
    array[finishPos[0]][finishPos[1]] = "rainbow"

    //change redo button to reset
    var redobtn = document.querySelector('#redo-reset-btn');
    redobtn.innerHTML = redobtn.innerHTML.substring(0, redobtn.innerHTML.length - 3) + "eset";

    //toggle all tools off
    if (phazeToggled) {
        togglePhaze()
    }
    if (quakeToggled) {
        toggleQuake()
    }

    updateCanvas()
    boolRunOnce = true
}

var boolRunOnce = true;

export function movePlayer(array, direction) {
    if (!finished) {
        //get player pos
        var playerPos = getPlayerPosition(array)

        //get items nearby
        var itemUp = array[playerPos[0] - 1][playerPos[1]]
        var itemDown = array[playerPos[0] + 1][playerPos[1]]
        var itemLeft = array[playerPos[0]][playerPos[1] - 1]
        var itemRight = array[playerPos[0]][playerPos[1] + 1]

        //direction provided + check if direction moving in is a space
        //only update canvas if it actually changed something

        //check for phaze being on and direction provided
        if (quakeToggled && !(direction == null)) {
            quakePlayer(array, direction)
        } else if (phazeToggled && !(direction == null)) {
            phazePlayer(array, direction)
        } else {
            switch (direction) {
                case "up":
                    if (itemUp === "finish") {
                        finishedMaze(array)
                    } else if (!(itemUp === "wall")) {
                        array = walkOverPath(array, playerPos, itemUp)

                        array[playerPos[0] - 1][playerPos[1]] = "rainbow"
                        updateCanvas()
                        shake(80, "up")
                    }
                    break;
                case "down":
                    if (itemDown === "finish") {
                        finishedMaze(array)
                    } else if (!(itemDown === "wall")) {
                        array = walkOverPath(array, playerPos, itemDown)

                        array[playerPos[0] + 1][playerPos[1]] = "rainbow"
                        updateCanvas()
                        shake(80, "down")
                    }
                    break;
                case "left":
                    if (itemLeft === "finish") {
                        finishedMaze(array)
                    } else if (!(itemLeft === "wall")) {
                        array = walkOverPath(array, playerPos, itemLeft)

                        array[playerPos[0]][playerPos[1] - 1] = "rainbow"
                        updateCanvas()
                        shake(80, "left")
                    }
                    break;
                case "right":
                    if (itemRight === "finish") {
                        finishedMaze(array)
                    } else if (!(itemRight === "wall")) {
                        array = walkOverPath(array, playerPos, itemRight)

                        array[playerPos[0]][playerPos[1] + 1] = "rainbow"
                        updateCanvas()
                        shake(80, "right")
                    }
                    break;
                default:
                    console.error("NO VALID DIRECTION PROVIDED!!!")
            }
        }

        //if player moved(compare cords), start the timer
        var playerPosNew = getPlayerPosition(array)
        if (!(playerPos[0] === playerPosNew[0]) || !(playerPos[1] === playerPosNew[1])) {
            if (boolRunOnce && !finished) {
                //start timer
                setRunningShared(true)
                boolRunOnce = false
            }
        }
    }
}