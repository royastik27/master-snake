const gameDOMController = (function () {

    // DOM CONSTANTS
    const snakeColor = 'white';

    // DOM ELEMENTS
    const gameScreenDOM = document.getElementById('game-screen');
    const buttonInitEndDOM = document.getElementById('game-button-init-end');
    const buttonPlayPauseDOM = document.getElementById('game-button-play-pause');
    const buttonSelectSpeedDOM = document.getElementById('game-button-select-speed');
    const scoreBoardDOM = document.getElementById('game-scoreboard');

    // FOR THE FIRST TIME
    function addEventListeners() {
        
        return;
    }

    addEventListeners();

    // METHODS
    const cellDOMId = function (i, j)
    {
        return `cell_${i}-${j}`;
    }
    
    return {
        getDOMElements: function () {
            return {
                buttonInitEndDOM
            };
        },
        colorCell: function (x, y) {
            document.getElementById(cellDOMId(x, y)).style.backgroundColor = snakeColor;
        },
        changeInitButtonState: function (state) {

            const stateConstants = gameController.getStateConstants();

            const iconInitEnd = buttonInitEndDOM.firstChild;
            const iconPlayPause = buttonPlayPauseDOM.firstChild;

            switch(state)
            {
                case stateConstants.INIT:
                    buttonInitEndDOM.classList.add('disabled');
                    iconInitEnd.className = "fa-solid fa-stop";

                    buttonPlayPauseDOM.classList.remove('disabled');
                    iconPlayPause.className = "fa-solid fa-play";
                    break;
                case stateConstants.PLAY:
                    buttonInitEndDOM.classList.remove('disabled');
                    iconInitEnd.className = "fa-solid fa-stop";

                    iconPlayPause.className = "fa-solid fa-pause";
                    break;
                case stateConstants.PAUSE:
                    iconPlayPause.className = "fa-solid fa-play";
                    break;
                case stateConstants.END:
                    iconInitEnd.className = "fa-solid fa-power-off";
                    
                    buttonPlayPauseDOM.classList.add('disabled');
                    iconPlayPause.className = "fa-solid fa-play";
                    break;
            }
            
            return;
        },
        makeGrid: function (nRows, nCols)
        {
            let i, j, row, col;
        
            for(i = 0; i < nRows; ++i)
            {
                row = document.createElement('div');
                row.setAttribute('class', 'game-row');
        
                for(j = 0; j < nCols; ++j)
                {
                    col = document.createElement('div');

                    // Specifying class
                    col.setAttribute('class', 'game-col');

                    // Specifiying id
                    col.setAttribute('id', cellDOMId(i, j));
        
                    row.appendChild(col);
                }
        
                gameScreenDOM.appendChild(row);

                let brDOM = document.createElement('br');
                gameScreenDOM.appendChild(brDOM);
            }
        
            return;
        },
        init: function (row, col) {

            const stateConstants = gameController.getStateConstants();
            
            // CLEARING SCREEN
            let i, j, el;
            for(i = 0; i < row; ++i)
                for(j = 0; j < col; ++j)
                {
                    el = document.getElementById(cellDOMId(i, j));
                    el.style.backgroundColor = 'inherit';
                    el.textContent = '';
                }
            
            // INITIALIZING MENUS
            gameDOMController.changeInitButtonState(stateConstants.INIT);
            
            // CLEARING SCOREBOARD
            scoreBoardDOM.textContent = 'N/A';
        }
    }
})();

const gameController = (function() {
    
    // CONSTANTS
    const stateConstants = {
        INIT: 1,
        PLAY: 2,
        PAUSE: 3,
        END: 4
    };
    const row = 15, col = 15, childSnake = [
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 3, y: 5 }
    ];
    
    // APP VARIABLES
    let state, score;
    const snake = [];

    // DOM ELEMENTS
    const DOMElements = gameDOMController.getDOMElements();
    
    // FOR THE FIRST TIME
    gameDOMController.makeGrid(row, col);

    function addEventListeners() {
        
        DOMElements.buttonInitEndDOM.addEventListener('click', function() {
            switch(state)
            {
                case stateConstants.INIT:
                    playGame();
                    break;
                case stateConstants.PLAY:
                    endGame();
                    break;
                case stateConstants.PAUSE:
                    endGame();
                    break;
                default:
                    gameController.init();
                    break;
            }
        });

        return;
    }

    addEventListeners();

    // METHODS
    function readySnake() {
        
        snake.length = 0;   // clearing the snake

        let i, sz = childSnake.length;

        for(i = 0; i < sz; ++i)
        {
            let el = { x: childSnake[i].x, y: childSnake[i].y };

            snake.push(el);     // updating the snake container
            gameDOMController.colorCell(el.x, el.y);    // updating snake DOM
        }
        return;
    }

    function playGame() {
        console.log('Playing game...');
        state = stateConstants.PLAY; // changing state

        DOMElements.buttonInitEndDOM.firstChild.classList.remove('fa-play');
        DOMElements.buttonInitEndDOM.firstChild.classList.add('fa-stop');

        return;
    }

    function pauseGame() {
        console.log('Game paused.');
        state = stateConstants.PAUSE;
        return;
    }

    function endGame() {
        console.log('Game ended.');
        state = stateConstants.END; // changing state

        DOMElements.buttonInitEndDOM.firstChild.classList.remove('fa-stop');
        DOMElements.buttonInitEndDOM.firstChild.classList.add('fa-power-off');

        return;
    }    

    return {
        getStateConstants: function () {
            return stateConstants;
        },
        init: function () {
            console.log('Game is initializing...');
            state = stateConstants.INIT; // changing app state
            score = 0;
            
            gameDOMController.init(row, col); // getting the DOM ready

            readySnake(); // getting the snake ready

            console.log('Game initialized successfully.');
        }
    }
})();

gameController.init();