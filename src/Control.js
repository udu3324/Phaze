import { maze } from "."
import { movePlayer } from "./Tool"

export function createControls() {
    document.addEventListener('keydown', function (event) {
        if (event.key === "a" || event.key === "ArrowLeft") {
            movePlayer(maze, "left")
        } else if (event.key === "d" || event.key === "ArrowRight") {
            movePlayer(maze, "right")
        } else if (event.key === "w" || event.key === "ArrowUp") {
            movePlayer(maze, "up")
        } else if (event.key === "s" || event.key === "ArrowDown") {
            movePlayer(maze, "down")
        }
    })
}
