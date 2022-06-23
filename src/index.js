import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createMaze } from './Tool'
import { createControls } from './Control';
import { changeGameObjectSize, changeGameTime, changeLowerButtonControls, changeScreenShake, changeSize, gameObjectSize, gameTime, size } from './Config';
import { getCookie } from './Cookies';
export var gameMaze;

//load values from cookies if there are any
if (getCookie("screenShake") === " ")
  changeScreenShake("true")
else
  changeScreenShake(getCookie("screenShake"))

if (getCookie("lowerButtonControls") === " ")
  changeLowerButtonControls("true")
else
  changeLowerButtonControls(getCookie("lowerButtonControls"))

if (getCookie("gameTime") === " ")
  changeGameTime(gameTime)
else
  changeGameTime(parseInt(getCookie("gameTime")))

if (getCookie("gameObjectSize") === " ")
  changeGameObjectSize(gameObjectSize)
else
  changeGameObjectSize(parseFloat(getCookie("gameObjectSize")))

if (getCookie("size") === " ") {
  gameMaze = createMaze(size)
} else {
  gameMaze = createMaze(parseInt(getCookie("size")))
  changeSize(parseInt(getCookie("size")))
}

export function newMaze() {
  gameMaze = createMaze(size)
}

createControls()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();