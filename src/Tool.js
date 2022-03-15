import maze from 'amazejs';
import { updateCanvas } from './Maze';

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
        var strRow = mazeString.substring(startingSubstringTemp, mazeSize + 1 + startingSubstringTemp).substring(1)

        //convert it to a array and add it to mazeArray
        mazeArray[index] = Array.from(strRow)

        startingSubstringTemp = mazeSize + 1 + startingSubstringTemp;
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

function walkOverPath(array, playerPos, item) {
    if (item === "path") {
        array[playerPos[0]][playerPos[1]] = "space"
    } else {
        array[playerPos[0]][playerPos[1]] = "path"
    }

    return array
}

var finished = false;

function finishedMaze(array) {
    finished = true

    //replace path with rainbow and finish item
    replace(array, "path", "rainbow")

    var finishPos = findItem(array, "finish")
    array[finishPos[0]][finishPos[1]] = "rainbow"
}

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
        switch (direction) {
            case "up":
                if (itemUp === "space" || itemUp === "path") {
                    console.log("up")

                    array = walkOverPath(array, playerPos, itemUp)

                    array[playerPos[0] - 1][playerPos[1]] = "rainbow"
                } else if (itemUp === "finish") {
                    console.log("finished!")
                    finishedMaze(array)
                }
                break;
            case "down":
                if (itemDown === "space" || itemDown === "path") {
                    console.log("down")

                    array = walkOverPath(array, playerPos, itemDown)

                    array[playerPos[0] + 1][playerPos[1]] = "rainbow"
                } else if (itemDown === "finish") {
                    console.log("finished!")
                    finishedMaze(array)
                }
                break;
            case "left":
                if (itemLeft === "space" || itemLeft === "path") {
                    console.log("left")

                    array = walkOverPath(array, playerPos, itemLeft)

                    array[playerPos[0]][playerPos[1] - 1] = "rainbow"
                } else if (itemLeft === "finish") {
                    console.log("finished!")
                    finishedMaze(array)
                }
                break;
            case "right":
                if (itemRight === "space" || itemRight === "path") {
                    console.log("right")

                    array = walkOverPath(array, playerPos, itemRight)

                    array[playerPos[0]][playerPos[1] + 1] = "rainbow"
                } else if (itemRight === "finish") {
                    console.log("finished!")
                    finishedMaze(array)
                }
                break;
            default:
                console.error("NO VALID DIRECTION PROVIDED!!!")
        }
    }

    updateCanvas()
}