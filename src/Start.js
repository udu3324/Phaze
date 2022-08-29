import React from "react";
import { getCookie, setCookie } from "./Cookies";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor, faPersonRunning, faXmark } from '@fortawesome/free-solid-svg-icons'

class Start extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.closeStart = this.closeStart.bind(this);
    }

    closeStart() {
        var startDiv = document.getElementById('start-div');

        //save a cookie
        setCookie("start", "opened", 99999)

        //change css
        startDiv.style.display = "none"
    }

    componentDidMount() {
        var startDiv = document.getElementById('start-div');
        var startControls = document.getElementById('start-controls');

        //check if start was set and show
        if (getCookie("start") === " ")
            startDiv.style.display = "block"
        else
            startDiv.style.display = "none"

        //show different control schemes for different platforms
        if ('ontouchstart' in document.documentElement)
            startControls.innerHTML = "Controls: Swiping / Pressing Buttons"
        else
            startControls.innerHTML = "Controls: WASD / Arrow Keys & (Q)uake Phaz(E) (R)edo (C)onfig"
        
    }

    render() {
        return <div className="start-div" id="start-div">
            <div className="start-box">
                <button onClick={this.closeStart} id="x">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <p id="title">Welcome!</p>
                <p>
                    Phaze is a maze with extra things. You start at the bottom-left.
                    <br />
                    <br />
                    <span id="start-controls"></span>
                    <br />
                    <br />
                    <FontAwesomeIcon icon={faMeteor} /> Quake - Activate and aim towards a wall to break it
                    <br />
                    <br />
                    <FontAwesomeIcon icon={faPersonRunning} /> Phaze - Moves you to the next branch
                </p>
            </div>
        </div>;
    }
}

window.addEventListener('click', function (e) {
    var startDiv = document.getElementById('start-div');

    if (!document.getElementById("start-div").contains(e.target)) {
        // Clicked outside of start when it was open
        setCookie("start", "opened", 99999)

        //change css
        startDiv.style.display = "none"
    }
});

export default Start;