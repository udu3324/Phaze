import React from "react";

import { gameMaze } from ".";

export function clearOverlays() {
    document.getElementById("ran-out-of-time").style.opacity = 0
    document.getElementById("finished").style.opacity = 0

    var time = document.getElementById("edit-results-time").innerHTML
    if (time.lastIndexOf("(") > 1)
        document.getElementById("edit-results-time").innerHTML = time.substring(0, time.lastIndexOf("("))

    var finished = document.getElementById("edit-results-finished").innerHTML
    if (finished.indexOf("<br/>") > 1)
        document.getElementById("edit-results-finished").innerHTML = finished.substring(0, finished.indexOf("<br/>"))
}

// https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
function makeImageTable(myArray) {
    var result = "";

    for (var i = 0; i < myArray.length; i++) {
        result += "<div id=\"" + i + "\">";
        for (var j = 0; j < myArray[i].length; j++) {
            switch (myArray[i][j]) {
                case "space":
                    result += "<div class=\"space\"></div>";
                    break;
                case "wall":
                    result += "<div class=\"wall\"></div>";
                    break;
                case "start":
                    result += "<div class=\"start\"></div>";
                    break;
                case "finish":
                    result += "<div class=\"finish\"></div>";
                    break;
                case "path":
                    result += "<div class=\"path\"></div>";
                    break;
                case "rainbow":
                    result += "<div class=\"rainbow\"></div>";
                    break;
                default:
                    //not correctly set img
                    result += "<div class=\"missing\"></div>";
                    console.error("NO VALID ITEM SET!!!")
            }
        }
        result += "</div>";
    }
    return result;
}

function createMarkup(array) {
    return { __html: makeImageTable(array) };
}

class Maze extends React.Component {
    render() {
        return (
            <div id="maze">
                <div id="ran-out-of-time" className="maze-overlay">
                    <p id="edit-results-time">You didn't finish the maze in time! </p>
                    <p>Try using Quake and Phaze more strategically, or change the time in the config. </p>

                    <p>Press R or the Redo Button to retry the maze.</p>
                </div>

                <div id="finished" className="maze-overlay">
                    <p id="edit-results-finished">
                        You finished the maze!
                    </p>
                    <p>You can make the maze more challenging by changing the game config. </p>

                    <p>Press R or the Reset Button to make a new maze.</p>
                </div>

                <div id="maze-canvas" dangerouslySetInnerHTML={createMarkup(gameMaze)} />
            </div>
        );
    }
}

export function updateCanvas() {
    const div = document.getElementById("maze-canvas");

    div.innerHTML = makeImageTable(gameMaze);
}

export default Maze;
