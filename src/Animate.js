function clearAnimations() {
    return function () {
        document.getElementById('maze-canvas').style.animation = ""
    }
}

export function shake(ms, direction) {
    if (ms === undefined) {
        console.error("No time provided! shake(-->ms<--, direction)")
    } else {
        if (direction === undefined) {
            //direction is not set which means all directions
            direction = ""
            document.getElementById('maze-canvas').style.animation = `shake ${ms}ms linear`;
        } else {
            direction = direction.toLowerCase()

            if (direction === "up" || direction === "down" || direction === "left" || direction === "right") {
                document.getElementById('maze-canvas').style.animation = `shake-${direction} ${ms}ms linear`;
            } else {
                console.error("Wrong direction provided! shake(ms, -->direction<--)")
            }
        }
        setTimeout(clearAnimations(), ms);
    }
}

export function shakeHard(ms, direction) {
    if (ms === undefined) {
        console.error("No time provided! shake(-->ms<--, direction)")
    } else {
        if (direction === undefined) {
            console.error("Wrong direction provided! shake(ms, -->direction<--)")
        } else {
            direction = direction.toLowerCase()

            if (direction === "up" || direction === "down" || direction === "left" || direction === "right") {
                document.getElementById('maze-canvas').style.animation = `shake-${direction}-hard ${ms}ms linear`;
            } else {
                console.error("Wrong direction provided! shake(ms, -->direction<--)")
            }
        }
        setTimeout(clearAnimations(), ms);
    }
}