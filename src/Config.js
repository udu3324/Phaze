import React from "react";
import { setCookie } from "./Cookies";
import { resetMaze } from "./Tool";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faFloppyDisk, faRulerCombined, faStop } from '@fortawesome/free-solid-svg-icons'

//default values (can be changed by the config)
export var size = 25
export var gameObjSize = 3.2;

var configUIOpen = false;

var changedSize = 0;
var changedGameObjSize = 0;

export function toggleConfig() {
    var configDiv = document.getElementById('config-div');
    if (configUIOpen) { //opened
        console.log("closing config")
        //set display to none
        configDiv.style.display = "none"

        configUIOpen = false;
    } else { //not opened
        console.log("opening config")
        //set display to block
        configDiv.style.display = "block"

        configUIOpen = true;
    }
}

export function changeSize(int) {
    size = int
}

export function changeGameObjSize(int) {
    gameObjSize = int
    document.documentElement.style.setProperty('--gameObjectSize', gameObjSize + "vmin");
}


class Config extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.saveConfig = this.saveConfig.bind(this);
        this.closeConfig = this.closeConfig.bind(this);

        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleGameObjChangeSize = this.handleGameObjChangeSize.bind(this);
    }

    handleChangeSize(event) {
        console.log("size changed to: " + event.target.value)
        changedSize = event.target.value;
    }

    handleGameObjChangeSize(event) {
        console.log("game obj size changed to: " + event.target.value)
        changedGameObjSize = event.target.value;
    }

    saveConfig() {
        console.log("saving config \n" +
            "size = " + changedSize + "\n" +
            "gameObjSize = " + changedGameObjSize)

        //fallback for if size or gameObj size is set to less than recommended sizes
        //set cookies if they have been altered
        if (changedSize === 0) {
            //its not changed
            changedSize = size
        } else if (changedSize < 5) {
            //its glitched
            changedSize = 5
        } else {
            //its changed
            size = changedSize
        }
        setCookie("size", size, 99999)

        var boolReloadPage = false

        if (changedGameObjSize === 0) {
            //its not changed
            changedGameObjSize = gameObjSize
        } else if (changedGameObjSize < 1) {
            //its glitched
            changedGameObjSize = 1
        } else {
            //its changed
            gameObjSize = changedGameObjSize
            boolReloadPage = true
        }
        setCookie("gameObjSize", gameObjSize, 99999)

        //change img size
        document.documentElement.style.setProperty('--gameObjSize', gameObjSize + "px");

        //reload page 
        if (boolReloadPage) {
            window.location.reload();
        }
        //reset maze
        resetMaze()
    }

    closeConfig() {
        toggleConfig()
    }

    componentDidMount() {
        //set input values from cookies/default
        var sizeInput = document.getElementById('maze-size-input')
        var gameObjSizeInput = document.getElementById('game-obj-size-input')

        sizeInput.value = size
        gameObjSizeInput.value = gameObjSize
    }

    render() {
        return <div className="config-div" id="config-div">
            <div className="config-box">
                <h1>Phaze - Config</h1>
                <p>
                    <input onChange={this.handleChangeSize} type="number" id="maze-size-input" min="5" max="5000">
                    </input> Maze Size <FontAwesomeIcon icon={faRulerCombined} />
                </p>

                <p>
                    <input onChange={this.handleGameObjChangeSize} type="number" id="game-obj-size-input" min="1" max="500">
                    </input> Game Object Size <FontAwesomeIcon icon={faStop} />
                </p>

                <button onClick={this.saveConfig} className="top-btn" type="button"><FontAwesomeIcon icon={faFloppyDisk} />Save</button>
                <button onClick={this.closeConfig} className="top-btn" type="button"><FontAwesomeIcon icon={faCircleXmark} /><u>C</u>lose</button>

                <h3>Credits ❤️</h3>
                <p>
                    <a href="https://reactjs.org/">React</a>, <a href="https://www.npmjs.com/package/amazejs">Amaze</a>, and <a href="https://fontawesome.com/">FontAwesome</a> were used to create Phaze. <br />
                    You can contribute by sending issues, pull requests, forking, and starring the repo here! <a href="https://github.com/udu3324/phaze">udu3324/phaze</a>
                </p>
            </div>
        </div>;
    }
}

export default Config;
