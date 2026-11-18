# Tic-Tac-Toe

A two-player Tic-Tac-Toe game built with React. Players enter their names, take turns placing X and O, and see a line through the winning combination.

## Features

- Enter names for both players (3–10 characters).
- Track turns and detect wins and draws.
- Highlight the winning squares and draw a line through them.
- Animate X and O as they appear.
- Keep player names and scores in `sessionStorage` for the current browser tab session.
- Start a new round with **Reset Game** without clearing the current players' scores.
- Reset the scoreboard automatically when either player name changes.

## Run locally

This project uses browser-side JSX compilation and ES module imports, so serve the folder through a local web server instead of opening `index.html` directly with `file://`.

1. Open the project folder in Visual Studio Code.
2. Start a local server with the Live Server extension.
3. Open the local URL shown by Live Server.

The app loads React, ReactDOM, Babel Standalone, and Google Fonts from CDNs, so an internet connection is required.

## Built with

- HTML and CSS
- React 18 and ReactDOM
- Babel Standalone for JSX in the browser
- `sessionStorage` for session-scoped player names and scores

## Project files

- `index.html` — page shell and CDN script/style links.
- `script.jsx` — game logic, React state, player setup, and score tracking.
- `styles.css` — layout, board, modal, winning line, and mark animations.
