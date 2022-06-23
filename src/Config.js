import React from "react";
import { getCookie, setCookie } from "./Cookies";
import { resetMaze } from "./Tool";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faCircleXmark, faFloppyDisk, faKeyboard, faRotate, faRulerCombined, faStop, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { setTimeShared } from "./Stopwatch";

//default values (can be changed by the config)
export var gameTime = 15000
export var size = 25
export var gameObjectSize = 3.0;
export var screenShake = true;
export var lowerButtonControls = true;

var configUIOpen = false;

var changedGameTime = 0;
var changedSize = 0;
var changedGameObjectSize = 0;
var changedScreenShake;
var changedLowerButtonControls;

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

export function changeGameTime(int) {
    gameTime = int
}

export function changeSize(int) {
    size = int
}

export function changeGameObjectSize(int) {
    gameObjectSize = int
    document.documentElement.style.setProperty('--gameObjectSize', gameObjectSize + "vmin");
}

export function changeScreenShake(bool) {
    screenShake = (bool === 'true')
}

export function changeLowerButtonControls(bool) {
    lowerButtonControls = (bool === 'true')
}

class Config extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.saveConfig = this.saveConfig.bind(this);
        this.closeConfig = this.closeConfig.bind(this);

        this.handleScreenShake = this.handleScreenShake.bind(this);

        this.handleLowerButtonControls = this.handleLowerButtonControls.bind(this);

        this.handleGameObjChangeSize = this.handleGameObjChangeSize.bind(this);
        this.gameObjectSizeUp = this.gameObjectSizeUp.bind(this);
        this.gameObjectSizeDown = this.gameObjectSizeDown.bind(this);

        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.mazeSizeUp = this.mazeSizeUp.bind(this);
        this.mazeSizeDown = this.mazeSizeDown.bind(this);

        this.handleGameTime = this.handleGameTime.bind(this);
        this.gameTimeUp = this.gameTimeUp.bind(this);
        this.gameTimeDown = this.gameTimeDown.bind(this);
    }

    handleScreenShake() {
        var element = document.getElementById("screen-shake-checkbox");
        var changedVal = element.checked

        console.log("screen shake changed to: " + changedVal)
        changedScreenShake = changedVal;
    }

    handleLowerButtonControls() {
        var element = document.getElementById("lower-button-controls-checkbox");
        var changedVal = element.checked

        console.log("lower button controls changed to: " + changedVal)
        changedLowerButtonControls = changedVal;
    }

    gameTimeUp() {
        var element = document.getElementById("game-time-input");
        var changedVal = parseInt(element.value) + 1000

        console.log("game time changed to: " + changedVal)
        changedGameTime = changedVal;
        element.value = changedVal
    }

    gameTimeDown() {
        var element = document.getElementById("game-time-input");
        var changedVal = parseInt(element.value) - 1000

        //if more than or equal to 10 (stops glitches)
        if (changedVal >= 10) {
            console.log("game time changed to: " + changedVal)
            changedGameTime = changedVal;
            element.value = changedVal
        }
    }

    handleGameTime(event) {
        console.log("game time changed to: " + event.target.value)
        changedGameTime = event.target.value;
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
            "screenShake = " + changedScreenShake + "\n" +
            "lowerButtonControls = " + changedLowerButtonControls + "\n" +
            "gameTime = " + changedGameTime + "\n" +
            "size = " + changedSize + "\n" +
            "gameObjectSize = " + changedGameObjectSize)

        //fallback for if size or gameObj size is set to less than recommended sizes
        //set cookies if they have been altered
        if (changedGameTime === 0) {
            //its not changed
            changedGameTime = gameTime
        } else if (changedGameTime < 10) {
            //its glitched
            changedGameTime = 10
        } else {
            //its changed
            gameTime = changedGameTime
        }
        setCookie("gameTime", gameTime, 99999)

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

        if (changedScreenShake == null) {
            //its not changed
            changedScreenShake = screenShake
        } else {
            //its changed
            screenShake = changedScreenShake
        }
        setCookie("screenShake", screenShake, 99999)

        if (changedLowerButtonControls == null) {
            //its not changed
            changedLowerButtonControls = lowerButtonControls
        } else {
            //its changed
            lowerButtonControls = changedLowerButtonControls
        }
        setCookie("lowerButtonControls", lowerButtonControls, 99999)

        //change the time
        setTimeShared(gameTime)

        //change img size
        document.documentElement.style.setProperty('--gameObjectSize', gameObjectSize + "vmin");

        //reset maze
        resetMaze()

        //lower controls
        if (getCookie("lowerButtonControls") === "false") {
            document.querySelector("#down-div").style.setProperty('display', 'none');
        } else {
            document.querySelector("#down-div").style.setProperty('display', 'inherit');
        }
    }

    closeConfig() {
        toggleConfig()
    }

    componentDidMount() {
        //set input values from cookies/default
        var gameTimeInput = document.getElementById('game-time-input')
        var sizeInput = document.getElementById('maze-size-input')
        var gameObjectSizeInput = document.getElementById('game-obj-size-input')
        var screenShakeCheckbox = document.getElementById("screen-shake-checkbox")
        var lowerButtonControlsCheckbox = document.getElementById("lower-button-controls-checkbox")

        gameTimeInput.value = gameTime
        sizeInput.value = size
        gameObjectSizeInput.value = gameObjectSize
        screenShakeCheckbox.checked = screenShake
        lowerButtonControlsCheckbox.checked = lowerButtonControls
        //lower controls
        if (getCookie("lowerButtonControls") === "false") {
            document.querySelector("#down-div").style.setProperty('display', 'none');
        } else {
            document.querySelector("#down-div").style.setProperty('display', 'inherit');
        }
    }

    render() {
        return <div className="config-div" id="config-div">
            <div className="config-box" id="config-box">
                <p id="title">Config</p>
                <a href="https://github.com/udu3324/phaze" target="_blank" rel="noopener noreferrer">
                    <img id="github-repo" alt="shield" src="https://img.shields.io/badge/Star%20The%20Repo-ffffff?style=for-the-badge&logo=github&logoColor=black"></img>
                </a>

                <p>
                    Game Time (ms) <FontAwesomeIcon icon={faStopwatch} />
                    <br />
                    <input onChange={this.handleGameTime} type="number" id="game-time-input" min="1" max="5000" />
                    <button onClick={this.gameTimeUp} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowUp} /></button>
                    <button style={{ borderRadius: '0px 3px 3px 0px' }} onClick={this.gameTimeDown} className="conf-btn" type="button"><FontAwesomeIcon icon={faArrowDown} /></button>
                </p>

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

                <p>
                    <label className="container">
                        Screen Shake <FontAwesomeIcon icon={faRotate} />
                        <input onChange={this.handleScreenShake} type="checkbox" id="screen-shake-checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </p>

                <p>
                    <label className="container">
                        Lower Button Controls <FontAwesomeIcon icon={faKeyboard} />
                        <input onChange={this.handleLowerButtonControls} type="checkbox" id="lower-button-controls-checkbox" />
                        <span className="checkmark"></span>
                    </label>
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
