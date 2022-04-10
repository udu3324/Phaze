import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createMaze } from './Tool'
import { createControls } from './Control';
import { changeGameObjectSize, changeSize, gameObjectSize, size } from './Config';
import { getCookie } from './Cookies';
export var gameMaze;

//load values from cookies if there are any
if (getCookie("size") === " ") {
  gameMaze = createMaze(size)
} else {
  gameMaze = createMaze(parseInt(getCookie("size")))
  changeSize(parseInt(getCookie("size")))
}

if (getCookie("gameObjectSize") === " ") {
  changeGameObjectSize(gameObjectSize)
} else {
  changeGameObjectSize(parseFloat(getCookie("gameObjectSize")))
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