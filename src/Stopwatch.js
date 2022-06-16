import React, { useState, useEffect } from "react";
import { gameTime } from "./Config";
import { canControl } from "./Control";

var setRunningShared;
var setTimeShared;

var setDefaultTime = true

var currentTime = 0;
export { setRunningShared, setTimeShared, currentTime };

export function stopTimer() {
    setDefaultTime = false
    setRunningShared(false)
    setTimeShared(currentTime)
}

export function resetTimer() {
    setDefaultTime = true
    setRunningShared(false)
    setTimeShared(gameTime)
}

var Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    setRunningShared = setRunning
    setTimeShared = setTime

    useEffect(() => {
        if (setDefaultTime) {
            setTime(gameTime)
        }

        let interval;
        if (running) {
            var changingTime = 0;
            interval = setInterval(() => {
                currentTime = time - changingTime
                if (currentTime === 0) {
                    canControl(false)
                    stopTimer()
                    document.getElementById("ran-out-of-time").style.opacity = 1
                    document.getElementById("edit-results-time").innerHTML += "(" + gameTime + "ms)"

                    return;
                } else {
                    changingTime += 10
                }

                setTime((prevTime) => prevTime - 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="stopwatch">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </div>
    );
};

export default Stopwatch;