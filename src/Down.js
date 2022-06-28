import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCircleArrowLeft, faCircleArrowRight, faCircleArrowUp, faMeteor, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { movePlayer } from "./Tool";
import { defaultNumberOfPhazes, togglePhaze } from "./Phaze";
import { defaultNumberOfQuakes, toggleQuake } from "./Quake";

class Down extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.phaze = this.phaze.bind(this);
        this.quake = this.quake.bind(this);
    }

    up() {
        movePlayer("up")
    }

    down() {
        movePlayer("down")
    }

    left() {
        movePlayer("left")
    }

    right() {
        movePlayer("right")
    }

    phaze() {
        togglePhaze()
    }

    quake() {
        toggleQuake()
    }

    render() {
        return <div className="down-div" id="down-div">
            <div id="controller">
                <div className="dpad" grid="dpad">
                    <button onClick={this.up} game-btn="KEY_UP" aria-label="up" id="up-btn" className="control-btn" type="button"><FontAwesomeIcon icon={faCircleArrowUp} /></button><br />
                    <button onClick={this.left} game-btn="KEY_LEFT" aria-label="left" id="left-btn" className="control-btn" type="button"><FontAwesomeIcon icon={faCircleArrowLeft} /></button>
                    <button onClick={this.down} game-btn="KEY_DOWN" aria-label="down" id="down-btn" className="control-btn" type="button"><FontAwesomeIcon icon={faCircleArrowDown} /></button>
                    <button onClick={this.right} game-btn="KEY_RIGHT" aria-label="right" id="right-btn" className="control-btn" type="button"><FontAwesomeIcon icon={faCircleArrowRight} /></button>
                </div>

                <div id="space" grid="space">
                </div>

                <div grid="tool">
                    <button onClick={this.quake} game-btn="KEY_QUAKE" id="quake-btn" className="down-btn" type="button"><FontAwesomeIcon icon={faMeteor} /><u>Q</u>uake({defaultNumberOfQuakes})</button>
                    <button onClick={this.phaze} game-btn="KEY_PHAZE" id="phaze-btn" className="down-btn" type="button"><FontAwesomeIcon icon={faPersonRunning} />Phaz<u>e</u>({defaultNumberOfPhazes})</button>
                </div>
            </div>
        </div>;
    }
}

export default Down;