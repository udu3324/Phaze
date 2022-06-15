import React from "react";

import { gameMaze } from ".";

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
            <div id="maze-canvas" dangerouslySetInnerHTML={createMarkup(gameMaze)} />
        );
    }
}

export function updateCanvas() {
    const div = document.getElementById("maze-canvas");

    div.innerHTML = makeImageTable(gameMaze);
}

export default Maze;
