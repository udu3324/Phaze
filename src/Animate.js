import { getCookie } from "./Cookies";

function clearAnimations() {
    return function () {
        document.getElementById('maze-canvas').style.animation = ""
    }
}

export function shake(ms, direction) {
    if (getCookie("screenShake") === "false")
        return;

    if (ms === undefined)
        return console.error("No time provided! shake(-->ms<--, direction)")

    var canvas = document.getElementById('maze-canvas')
    if (direction === undefined)
        return canvas.style.animation = `shake ${ms}ms linear`

    direction = direction.toLowerCase()
    if (direction === "up" || direction === "down" || direction === "left" || direction === "right")
        canvas.style.animation = `shake-${direction} ${ms}ms linear`;
    else
        console.error("Wrong direction provided! shake(ms, -->direction<--)")
    
    setTimeout(clearAnimations(), ms);
}

export function shakeHard(ms, direction) {
    if (getCookie("screenShake") === "false")
        return;

    if (ms === undefined)
        return console.error("No time provided! shake(-->ms<--, direction)")

    if (direction === undefined)
        return console.error("Wrong direction provided! shake(ms, -->direction<--)")

    direction = direction.toLowerCase()
    if (direction === "up" || direction === "down" || direction === "left" || direction === "right")
        document.getElementById('maze-canvas').style.animation = `shake-${direction}-hard ${ms}ms linear`;
    else
        console.error("Wrong direction provided! shake(ms, -->direction<--)")

    setTimeout(clearAnimations(), ms);
}