import React from "react";
import { setCookie } from "./Cookies";
import { resetMaze } from "./Tool";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faCircleXmark, faFloppyDisk, faRulerCombined, faStop } from '@fortawesome/free-solid-svg-icons'

//default values (can be changed by the config)
export var size = 25
export var gameObjectSize = 3.2;

var configUIOpen = false;

var changedSize = 0;
var changedGameObjectSize = 0;

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

export function changeGameObjectSize(int) {
    gameObjectSize = int
    document.documentElement.style.setProperty('--gameObjectSize', gameObjectSize + "vmin");
}


class Config extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.saveConfig = this.saveConfig.bind(this);
        this.closeConfig = this.closeConfig.bind(this);

        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleGameObjChangeSize = this.handleGameObjChangeSize.bind(this);

        this.gameObjectSizeUp = this.gameObjectSizeUp.bind(this);
        this.gameObjectSizeDown = this.gameObjectSizeDown.bind(this);

        this.mazeSizeUp = this.mazeSizeUp.bind(this);
        this.mazeSizeDown = this.mazeSizeDown.bind(this);
    }

    mazeSizeUp() {
        var element = document.getElementById("maze-size-input");
        var changedVal = parseInt(element.value) + 2

        console.log("size changed to: " + changedVal)
        changedSize = changedVal;
        element.value = changedVal
    }

    mazeSizeDown() {
        var element = document.getElementById("maze-size-input");
        var changedVal = parseInt(element.value) - 2

        //if more than or equal to 5 (stops glitches)
        if (changedVal >= 5) {
            console.log("size changed to: " + changedVal)
            changedSize = changedVal;
            element.value = changedVal
        }
    }

    handleChangeSize(event) {
        console.log("size changed to: " + event.target.value)
        changedSize = event.target.value;
    }

    gameObjectSizeUp() {
        var element = document.getElementById("game-obj-size-input");
        var changedVal = (parseFloat(element.value) + 0.1).toFixed(1)

        console.log("game obj size changed to: " + changedVal)
        changedGameObjectSize = changedVal;
        element.value = changedVal
    }

    gameObjectSizeDown() {
        var element = document.getElementById("game-obj-size-input");
        var changedVal = (parseFloat(element.value) - 0.1).toFixed(1)

        if (changedVal >= 0.1) {
            console.log("game obj size changed to: " + changedVal)
            changedGameObjectSize = changedVal;
            element.value = changedVal
        }
    }

    handleGameObjChangeSize(event) {
        console.log("game obj size changed to: " + event.target.value)
        changedGameObjectSize = event.target.value;
    }

    saveConfig() {
        console.log("saving config \n" +
            "size = " + changedSize + "\n" +
            "gameObjectSize = " + changedGameObjectSize)

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

        if (changedGameObjectSize === 0) {
            //its not changed
            changedGameObjectSize = gameObjectSize
        } else if (changedGameObjectSize < 1) {
            //its glitched
            changedGameObjectSize = 1
        } else {
            //its changed
            gameObjectSize = changedGameObjectSize
        }
        setCookie("gameObjectSize", gameObjectSize, 99999)

        //change img size
        document.documentElement.style.setProperty('--gameObjectSize', gameObjectSize + "vmin");

        //reset maze
        resetMaze()
    }

    closeConfig() {
        toggleConfig()
    }

    componentDidMount() {
        //set input values from cookies/default
        var sizeInput = document.getElementById('maze-size-input')
        var gameObjectSizeInput = document.getElementById('game-obj-size-input')

        sizeInput.value = size
        gameObjectSizeInput.value = gameObjectSize
    }

    render() {
        return <div className="config-div" id="config-div">
            <div className="config-box" id="config-box">
                <h1>Config</h1>
                <a href="https://github.com/udu3324/phaze" target="_blank" rel="noopener noreferrer">udu3324/phaze</a>
                <p>
                    Maze Size <FontAwesomeIcon icon={faRulerCombined} />
                    <br />
                    <input onChange={this.handleChangeSize} type="number" id="maze-size-input" min="5" max="5000" />
                    <button onClick={this.mazeSizeUp} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowUp} /></button>
                    <button style={{ borderRadius: '0px 3px 3px 0px' }} onClick={this.mazeSizeDown} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowDown} /></button>
                </p>

                <p>
                    Game Object Size <FontAwesomeIcon icon={faStop} />
                    <br />
                    <input onChange={this.handleGameObjChangeSize} type="number" id="game-obj-size-input" min="1" max="500" />
                    <button onClick={this.gameObjectSizeUp} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowUp} /></button>
                    <button style={{ borderRadius: '0px 3px 3px 0px' }} onClick={this.gameObjectSizeDown} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowDown} /></button>

                </p>

                <button onClick={this.saveConfig} className="top-btn" type="button"><FontAwesomeIcon icon={faFloppyDisk} />Save</button>
                <button onClick={this.closeConfig} className="top-btn" type="button"><FontAwesomeIcon icon={faCircleXmark} /><u>C</u>lose</button>

            </div>
        </div>;
    }
}

window.addEventListener('click', function (e) {
    //check for hovering out of config div, if config ui is open, and if hovering on config button
    if (!document.getElementById("config-box").contains(e.target) && configUIOpen && !document.getElementById("right").matches(':hover')) {
        toggleConfig()
        console.log("1")
    }
});

export default Config;
