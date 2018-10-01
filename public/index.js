// Index.js
// Variables
const speed_max = 100;
const speed_min = 10;
const speed_step = Math.round(speed_max / speed_min);
const eval_time = 1000;
const secret_prize_chance = 0.2; // 20%
const secret_prize_multiplier = 2; // Point mulitplier
const score_board = $('#score');
const range_slider = $('#range_slider');
const range_label = $('#range_label');
const start_button = $('#start');
const game = $('#game');
const paused = $('#paused');
let game_process;
let game_on = 0; // 0 == off // 1 == on
let current_speed;


// Set New Range
const setRange = (value) => {
    $(range_slider).val(value);
}


// Retrieve Current Range
const getRange = () => {
    return $(range_slider).val();
}


// Retrieve Points
const currentScore = () => {
    return $(score_board).text();
}


// Add Points
const addPoints = (points) => {
    let current_score = Number(currentScore());
    $(score_board).text(current_score + points);
}


// Handles the dot positions
const updateDotPositions = () => {
    let speed = Number(current_speed);
    let game_height = Math.floor($(game).height());
    $('.i').each(function() {
        var dot = $(this);
        let dotPosition = $(dot).offset().top; // 
        $(dot).css('top', (dotPosition + speed) + 'px'); // Update Top Position
        if (dotPosition > game_height + 100) { // + 100 due to max height default.
            removeDot(dot); // Remove Dot outside offscreen
        }
    });
    $('.indeed').each(function () {
      var dot = $(this);
        let dotPosition = $(dot).offset().top; // 
        $(dot).css('top', (dotPosition + speed * secret_prize_multiplier) + 'px'); // Update Top Position
        if (dotPosition > game_height + 100) { // + 100 due to max height default.
            removeDot(dot); // Remove Dot outside offscreen
        }
    });
}


// Basic Dot
const basicDot = () => {
    let size = random(speed_min, speed_max);
    let elm = document.createElement('div');
    elm.className = 'dot i';
    elm.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    elm.style.height = size + 'px';
    elm.style.width = size + 'px';
    elm.style.left = random(speed_min, $(game).width() - speed_max) + 'px';
    elm.onclick = function(){ dotClick(this) };
    return elm;
}


// Special Item
const specialDot = () => {
  let size = random(speed_min, speed_max);
  let elm = document.createElement('div');
  elm.className = 'i indeed';
  elm.style.height = size + 'px';
  elm.style.width = size + 'px';
  elm.style.left = random(speed_min, $(game).width() - speed_max) + 'px';
  elm.onclick = function(){ 
    dotClick(this, Math.floor(secret_prize_multiplier * scoreValue(size)))
  };
  return elm;
}


// Add Dot to Game UI
const addDot = (dot) => {
    $(game).append(dot);
}


// Create Dot and Add it to UI
const generateDot = () => {
    addDot(basicDot());
    if (Math.random() < secret_prize_chance) { // If Special Dot, add one too.
      addDot(specialDot());
    }
}


// Randomize between range
const random = (range_start, range_end) => {
    return Math.floor(Math.random() * (range_end - range_start) + range_start)
}


// Calculate Score Value of Dot based on Size
const scoreValue = (pixel_size) => {
    return Math.floor((speed_step + 1) - pixel_size / speed_step);
}


// Set Speed
const setSpeed = (new_speed) => {
    current_speed = Number(new_speed);
    $(range_label).text(current_speed);
}


// Handle Dot Click Action
const dotClick = (elm, score_value) => {
    var dot_size = Number($(elm).width());
    var score_value = (score_value) ? score_value : scoreValue(dot_size);
    removeDot(elm); // Remove Dot
    addPoints(score_value); // Add Score of Dot to ScoreBoard
}


// Remove Dot
const removeDot = (elm) => {
    $(elm).remove(); 
}


// Stop Game
const stopGame = () => {
    clearInterval(game_process);
    showPauseScreen();
}


// Show Pause
const showPauseScreen = () => {
    $('header').removeClass('active');
    $(paused).removeClass('hidden');
}


// Hide Pause
const hidePauseScreen = () => {
    $('header').addClass('active');
    $(paused).addClass('hidden');
}


// Start Game
const startGame = () => {
    hidePauseScreen();
    generateDot(); // Begin new Dots
    updateDotPositions();
}


// Setup Speed Slider
const setupSpeed = () => {
    // Attributes
    $(range_slider).attr('min', speed_min);
    $(range_slider).attr('max', speed_max);
    $(range_slider).attr('step', speed_step);
    // Setup Starting Speed
    setSpeed(speed_min);
    // Handles Changes to Speed
    $(range_slider).change(function() {
        setSpeed($(range_slider).val());
    });
}


// Setup trigger for start button for game on or off
const setupStartButton = () => {
    $(start_button).click(function() {
        if (game_on == 0) {
            game_on = 1;
            game_process = setInterval(function() {
                startGame();
            }, eval_time);
            $(this).text("Pause");
        } else if (game_on == 1) {
            game_on = 0;
            stopGame();
            $(this).text("Start");
        }
    });
}


// Allow Dot Max Height to be rendered, before showing in Game
const setupGameContainer = () => {
    $(game).css('marginTop', -speed_max+'px');
}


// Setup Game
const initGame = () => {
    setupSpeed(); // Setup Speed
    setupStartButton(); // Ready Start Button
    setupGameContainer(); // Container
}


// Ready
$(function() {
    console.log("Hello, World");
    initGame();
});