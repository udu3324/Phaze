import React from "react";
import Stopwatch from "./Stopwatch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { finished, redoMaze, resetMaze } from "./Tool";
import { gameMaze } from ".";
import { toggleConfig } from "./Config";

class Up extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.mazeRedo = this.mazeRedo.bind(this);

        this.openConfig = this.openConfig.bind(this);
    }

    mazeRedo() {
        if (finished) {
            //change reset button to redo
            var redobtn = document.querySelector('#redo-reset-btn');
            redobtn.innerHTML = redobtn.innerHTML.substring(0, redobtn.innerHTML.length - 4) + "edo";

            resetMaze(gameMaze)
        } else {
            redoMaze(gameMaze)
        }
    }

    openConfig() {
        toggleConfig()
    }

    render() {
        return <div className="up-div">
            <div id="left">
                <button onClick={this.mazeRedo} id="redo-reset-btn" className="top-btn" type="button"><FontAwesomeIcon icon={faRefresh} /><u>R</u>edo</button>
            </div>
            <div id="middle">
                <Stopwatch />
            </div>
            <div id="right">
                <button onClick={this.openConfig} className="top-btn" type="button"><FontAwesomeIcon icon={faGear} /><u>C</u>onfig</button>
            </div>
        </div>;
    }
}

export default Up;