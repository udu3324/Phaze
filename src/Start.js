import React from "react";
import { getCookie, setCookie } from "./Cookies";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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

        //check in cookies if start was closed
        //if not, change css to make it visible
        if (getCookie("start") === " ") {
            //cookie has never been set
            startDiv.style.display = "block"
        } else {
            //already opened
            startDiv.style.display = "none"
        }
    }

    render() {
        return <div className="start-div" id="start-div">
            <div className="start-box">
                <button onClick={this.closeStart} id="x">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <p id="title">Welcome to Phaze!</p>
                <p>
                    Phaze is a maze with extra things to do. Finish it before the time runs out!
                    <br />
                    <br />
                    You start at the bottom left of the maze.
                    <br />
                    <br />
                    PC Controls: WASD or Arrow Keys
                    <br />
                    Mobile Controls: Swiping or Pressing Buttons
                    <br />
                    <br />
                    Quake: Allows you to break a wall
                    <br />
                    <img src="https://camo.githubusercontent.com/3a730420d30eee5caf53211f32cb4935e6b1b206f0b43dce0e47e2f54e35db90/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3735313933353134393537383338373435362f3935343836303630323534353830373338302f756e6b6e6f776e2e706e67" alt="quake"></img>
                    <br />
                    <br />
                    Phaze: Moves you to the next branch in the maze
                    <br />
                    <img src="https://camo.githubusercontent.com/bb7343ce09725b59fa2b87be13af55b9a88bd42a8d9670a242ca5e1dd485c7ff/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3735313933353134393537383338373435362f3935343836333237313333393439393534302f756e6b6e6f776e2e706e67" alt="phaze"></img>
                </p>
            </div>
        </div>;
    }
}

window.addEventListener('click', function (e) {
    var startDiv = document.getElementById('start-div');

    if (document.getElementById("start-div").contains(e.target)) {
        console.log("yes")
    } else {
        // Clicked outside of start when it was open
        //save a cookie
        setCookie("start", "opened", 99999)

        //change css
        startDiv.style.display = "none"
    }
});

export default Start;