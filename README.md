# DotCrusher

The goal of this exercise was to create a game. In the game, dots move from the top to the bottom of the screen. A player tries to click on the dots, and receives points when they are successful.

![mockup](https://cdn.gomix.com/84ca8f35-cd1c-4d74-ad6f-f1f108b5b85a%2Fdot-game-with-banner.png)
![actual](https://github.com/JaisonBrooks/DotCrusher/raw/master/screenshot.png)

## Guidelines for the Game

- Your application should work in current Chrome. 
- You can edit any file in the project, and add any assets you require (see below).
- You may look up anything you'd like.
- You may use any libraries you'd like.
- You must write at least the CSS necessary to achieve the basic layout of the game; you may also write additional CSS to improve the design of the game. 
- The project is set up to use Sass, but you may also author plain CSS, or add a different CSS preprocessor.
- Your finished code should be of a quality that you would submit to your peers for a code review.

## Building the Game

- The game starts when a player touches or clicks the Start button; at that point, the Start button changes to a Pause button, which should pause the game until the button is touched or clicked again.
- Dots fall at a constant rate. A player should be able to use a slider to control the rate at which dots fall, with a range of 10-100 pixels per second.
- A new dot appears at a random horizontal position at the top of the box every second. A dot should not "hang" off the left or right edge of the screen.
- Dots should vary randomly in size from 10px in diameter to 100px in diameter.
- A dot's value is inversely proportional to its size, with the smallest dots worth 10 points, and the largest dots worth 1 point.
- When a player touches or clicks a dot, the dot should disappear from the box, and the score should be increased based on the dot's value. 

## Running the project locally

- extract the code
- ```cd``` into the root directory
- run ```npm install```
- start server ```PORT=3000 node server.js```
- navigation browser to ```localhost:3000```
