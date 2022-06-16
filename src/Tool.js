import maze from 'amazejs';
import { gameMaze, newMaze } from '.';
import { shake } from './Animate';
import { gameTime } from './Config';
import { canControl } from './Control';
import { clearOverlays, updateCanvas } from './Maze';
import { defaultNumberOfPhazes, numberOfPhazes, phazePlayer, phazeToggled, resetPhaze, togglePhaze } from './Phaze';
import { defaultNumberOfQuakes, numberOfQuakes, quakePlayer, quakeToggled, resetQuake, toggleQuake } from './Quake';
import { currentTime, resetTimer, setRunningShared, stopTimer } from './Stopwatch';

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

export function findItem(item) {
    //for each x and y
    for (var x = 0; x < gameMaze.length; x++) {
        for (var y = 0; y < gameMaze.length; y++) {
            if (gameMaze[y][x] === item) {
                return [y, x];   // Found it 
            }
        }
    }

    return false;   // Not found
}

export function getPlayerPosition() {
    var attempt1 = findItem("rainbow")
    var attempt2 = findItem("start")

    if (!(attempt1 === false)) {
        return attempt1
    } else if (!(attempt2 === false)) {
        return attempt2
    } else {
        return false;
    }
}

export function walkOverPath(playerPos, item) {
    if (item === "path")
        gameMaze[playerPos[0]][playerPos[1]] = "space"
    else
        gameMaze[playerPos[0]][playerPos[1]] = "path"
}

export function resetMaze() {
    console.log("resetting maze!")

    clearOverlays()

    newMaze()
    finished = false;

    //stop and reset timer
    stopTimer()
    resetTimer()

    resetPhaze()
    resetQuake()
    //toggle all tools off
    if (phazeToggled)
        togglePhaze()
    if (quakeToggled)
        toggleQuake()
    
    canControl(true)

    boolRunOnce = true

    updateCanvas()
}

export function redoMaze() {
    console.log("redoing maze!")

    clearOverlays()

    replace(gameMaze, "path", "space")
    replace(gameMaze, "rainbow", "space")
    gameMaze[gameMaze.length - 2][1] = "start"

    //stop and reset timer
    stopTimer()
    resetTimer()

    resetPhaze()
    resetQuake()
    //toggle all tools off
    if (phazeToggled)
        togglePhaze()
    if (quakeToggled)
        toggleQuake()
    
    canControl(true)
    
    boolRunOnce = true

    updateCanvas()
}

export function finishedMaze() {
    //stop timer
    stopTimer()

    document.getElementById("finished").style.opacity = 1
    document.getElementById("edit-results-finished").innerHTML += `<br/>${currentTime}/${gameTime}ms Left<br/>${numberOfPhazes}/${defaultNumberOfPhazes} Phazes Left<br/>${numberOfQuakes}/${defaultNumberOfQuakes} Quakes Left`

    finished = true
    console.log("finished!")

    //replace path and finish with rainbow
    replace(gameMaze, "path", "rainbow")

    var finishPos = findItem("finish")
    gameMaze[finishPos[0]][finishPos[1]] = "rainbow"

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
    canControl(false)

    updateCanvas()
    boolRunOnce = true
}

var boolRunOnce = true;

export function movePlayer(direction) {
    if (!finished) {
        //get player pos
        var playerPos = getPlayerPosition(gameMaze)

        //get items nearby
        var itemUp = gameMaze[playerPos[0] - 1][playerPos[1]]
        var itemDown = gameMaze[playerPos[0] + 1][playerPos[1]]
        var itemLeft = gameMaze[playerPos[0]][playerPos[1] - 1]
        var itemRight = gameMaze[playerPos[0]][playerPos[1] + 1]

        //direction provided + check if direction moving in is a space
        //only update canvas if it actually changed something

        //check for phaze being on and direction provided
        if (quakeToggled && !(direction == null)) {
            quakePlayer(direction)
        } else if (phazeToggled && !(direction == null)) {
            phazePlayer(direction)
        } else {
            switch (direction) {
                case "up":
                    if (itemUp === "finish") {
                        finishedMaze()
                    } else if (!(itemUp === "wall")) {
                        walkOverPath(playerPos, itemUp)

                        gameMaze[playerPos[0] - 1][playerPos[1]] = "rainbow"
                        updateCanvas()
                        shake(80, "up")
                    }
                    break;
                case "down":
                    if (itemDown === "finish") {
                        finishedMaze()
                    } else if (!(itemDown === "wall")) {
                        walkOverPath(playerPos, itemDown)

                        gameMaze[playerPos[0] + 1][playerPos[1]] = "rainbow"
                        updateCanvas()
                        shake(80, "down")
                    }
                    break;
                case "left":
                    if (itemLeft === "finish") {
                        finishedMaze()
                    } else if (!(itemLeft === "wall")) {
                        walkOverPath(playerPos, itemLeft)

                        gameMaze[playerPos[0]][playerPos[1] - 1] = "rainbow"
                        updateCanvas()
                        shake(80, "left")
                    }
                    break;
                case "right":
                    if (itemRight === "finish") {
                        finishedMaze()
                    } else if (!(itemRight === "wall")) {
                        walkOverPath(playerPos, itemRight)

                        gameMaze[playerPos[0]][playerPos[1] + 1] = "rainbow"
                        updateCanvas()
                        shake(80, "right")
                    }
                    break;
                default:
                    console.error("NO VALID DIRECTION PROVIDED!!!")
            }
        }

        //if player moved(compare cords), start the timer
        var playerPosNew = getPlayerPosition()
        if (!(playerPos[0] === playerPosNew[0]) || !(playerPos[1] === playerPosNew[1])) {
            if (boolRunOnce && !finished) {
                //start timer
                resetTimer()
                setRunningShared(true)
                boolRunOnce = false
            }
        }
    }
}