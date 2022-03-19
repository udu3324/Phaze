import React from "react";

import wall from "./assets/wall.png";
import space from "./assets/space.png";
import start from "./assets/start.png";
import finish from "./assets/finish.png";
import rainbow from "./assets/rainbow.gif";
import path from "./assets/path.png";

import missing from "./assets/missing.png";

import { gameMaze } from ".";

// https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
function makeImageTable(myArray) {
    var result = "";

    for (var i = 0; i < myArray.length; i++) {
        for (var j = 0; j < myArray[i].length; j++) {
            switch (myArray[i][j]) {
                case "space":
                    result += "<img src=" + space + ' id="game-obj" alt="space" />';
                    break;
                case "wall":
                    result += "<img src=" + wall + ' id="game-obj" alt="wall" />';
                    break;
                case "start":
                    result += "<img src=" + start + ' id="game-obj" alt="start" />';
                    break;
                case "finish":
                    result += "<img src=" + finish + ' id="game-obj" alt="finish" />';
                    break;
                case "path":
                    result += "<img src=" + path + ' id="game-obj" alt="path" />';
                    break;
                case "rainbow":
                    result += "<img src=" + rainbow + ' id="game-obj" alt="rainbow" />';
                    break;
                default:
                    //not correctly set img
                    result += "<img src=" + missing + ' id="game-obj" alt="missing" />';
                    console.error("NO VALID ITEM SET!!!")
            }
        }
        result += "<br>";
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
    //updates the canvas
    const div = document.getElementById("maze-canvas");

    div.innerHTML = makeImageTable(gameMaze);
}

export default Maze;
