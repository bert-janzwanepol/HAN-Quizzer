# Quizzer

Realtime pubquiz app using Mongo, Express, React JS, Node Js, Redux, JWT and WebSockets.

This application was made as an [assignment](https://github.com/bert-janzwanepol/HAN-Quizzer/blob/master/The%20Quizzer%20-%20Final%20assignment%20DWA%20course.pdf) for the HAN University of Applied Sciences in Arnhem in 2019.

# Features

For the full set of requirements check out the [assignment](https://github.com/bert-janzwanepol/HAN-Quizzer/blob/master/The%20Quizzer%20-%20Final%20assignment%20DWA%20course.pdf).

This repo features 3 SPA's:

- The Quiz Master App 
    - Create new rooms
    - Moderate the teams that join a room
    - Start a new quiz if enough teams have joined
    - Pick categories from which the questions will be selected
    - Pick interesting questions each round
- The Team App
    - A team can join a room with the key that the Quiz Master provides.
    - A team can submit/change an answer when a new question pops up on screen.
- The Scoreboard App
    - Calculate the score of each team
    - Display the current standings/points of a team
    - Show for each team and each question if the teams answer was correct
    - Calculate the total scores and display the winner

# How to run

_Note: you should have a MongoDB instance running before executing the steps below. The default url used in the server app is `mongodb://localhost:27017`_

1. Run `npm i` in `./quizmaster-app`, `./score-app` and `./team-app`.
2. Run `node seed.js` in `./server`
3. Run `node app.js` in `./server`. ([nodemon](https://www.npmjs.com/package/nodemon) is a be a better choice when developing the app)
    - You can change the JWT secret and the MongoDB URL in `.env` in `./server`
4. Run `npm start` in `./quizmaster-app`, `./score-app` and `./team-app`.
    - Each directory has it's own `.env` file that sets a different port for each SPA.
5. Each SPA should open in a different tab
