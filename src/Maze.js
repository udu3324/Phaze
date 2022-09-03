import React from "react";

import { gameMaze } from ".";

export function clearOverlays() {
    document.getElementById("ran-out-of-time").style.display = "none"
    document.getElementById("finished").style.display = "none"

    document.getElementById("edit-results-time").innerHTML = "You didn't finish the maze in time! "

    document.getElementById("edit-results-finished").innerHTML = "You finished the maze! "
}

function makeImageTable(arr) {
    var result = "";
    
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            result += '<div class="'
            switch (arr[i][j]) {
                case "space":
                    result += 'o';
                    break;
                case "wall":
                    result += 'w';
                    break;
                case "start":
                    result += 's';
                    break;
                case "finish":
                    result += 'f';
                    break;
                case "path":
                    result += 'v';
                    break;
                case "rainbow":
                    result += 'x';
                    break;
                default:
                    result += 'missing';
            }
            result += '"></div>'
        }
        result += "<br/>";
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
                    <p id="edit-results-time" className="overlay-p">You didn't finish the maze in time! </p>
                    <p className="overlay-p">Try using Quake and Phaze more strategically, or change the time in the config. </p>

                    <p className="overlay-p">Press R or the Redo Button to retry the maze.</p>
                </div>

                <div id="finished" className="maze-overlay">
                    <p id="edit-results-finished" className="overlay-p">
                        You finished the maze!
                    </p>
                    <p className="overlay-p">You can make the maze more challenging by changing the game config. </p>

                    <p className="overlay-p">Press R or the Reset Button to make a new maze.</p>
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
