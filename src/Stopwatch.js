import React, { useState, useEffect } from "react";
import { gameTime } from "./Config";
import { canControl } from "./Control";
import { numbersOfRedos } from "./Tool";

var setRunningShared;
var setTimeShared;

export var currentTime = 0;

export function startTimer() {
    setRunningShared(true)
}

export function stopTimer() {
    setRunningShared(false)
    setTimeShared(currentTime)
}

export function resetTimer() {
    setRunningShared(false)
    setTimeShared(gameTime)
}

var runOnce = true;

var Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    setRunningShared = setRunning
    setTimeShared = setTime

    useEffect(() => {
        let interval;
        
        if (runOnce) {
            setTime(gameTime)
            runOnce = false
        }

        currentTime = time

        if (!running)
            return clearInterval(interval);

        interval = setInterval(() => {
            if (time === 0) {
                canControl(false)
                stopTimer()
                document.getElementById("ran-out-of-time").style.display = "inherit"
                document.getElementById("edit-results-time").innerHTML += `(${gameTime}ms) (${numbersOfRedos}redos)`

                return;
            }

            setTime((prevTime) => prevTime - 10);
        }, 10);

        return () => clearInterval(interval);
    }, [time, running]);

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