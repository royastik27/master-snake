// GAME-DOM CONTROLLER
const gameDOMController = (function () {
    
    const gameScreenDom = document.getElementById('game-screen');
    const gameMenuDOM = document.getElementById('game-menu');
    const gameUpButton = document.getElementById('game-up-button');
    const gameDownButton = document.getElementById('game-down-button');
    const gameRightButton = document.getElementById('game-right-button');
    const gameLeftButton = document.getElementById('game-left-button');

    const cellDOMId = function (i, j)
    {
        return `cell_${i}-${j}`;
    }
    
    return {
        getDOMElements: function() {
            return {
                gameMenuDOM,
                gameUpButton,
                gameDownButton,
                gameRightButton,
                gameLeftButton
            };
        },
        colorCell: function(cell) {
            
            const el = document.getElementById(cellDOMId(cell.x, cell.y));
            el.style.backgroundColor = 'black';

            return;
        },
        uncolorCell: function(cell) {
            
            const el = document.getElementById(cellDOMId(cell.x, cell.y));
            el.style.backgroundColor = 'white';

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
        
                gameScreenDom.appendChild(row);
            }
        
            return;
        },
        addGameMenuListeners: function () {
            gameMenuDOM.addEventListener('keydown', function (event) {
                const pressedKey = event.key;
                gameController.setDirection(pressedKey);
                return;
            });

            gameUpButton.addEventListener('click', () => gameController.setDirection("ArrowUp"));
            gameDownButton.addEventListener('click', () => gameController.setDirection("ArrowDown"));
            gameLeftButton.addEventListener('click', () => gameController.setDirection("ArrowLeft"));
            gameRightButton.addEventListener('click', () => gameController.setDirection("ArrowRight"));

            return;
        }
    };
})();

// GAME CONTROLLER
const gameController = (function () {

    // DEFAULT VARIABLES
    const nRows = 10, nCols = 20, snake = [];

    const childSnake = [
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 3, y: 5 }
    ]; // Specify at least one point

    // MOVES
    const UP = 1, DOWN = 2, RIGHT = 3, LEFT = 4;
    let direction = RIGHT, snakeSpeed = 500;
    const head = {}, tail = {};

    let moveSnakeInterval, cnt = 0;
    
    // METHODS
    const createSnake = function() {
        
        let i, sz = childSnake.length;

        // Specifying points
        for(i = 0; i < sz; ++i) {
            let newCell = { x: childSnake[i].x, y: childSnake[i].y };
            snake.push(newCell);
            gameDOMController.colorCell(newCell);
        }

        // Specifying Head and Tail
        head.x = childSnake[childSnake.length-1].x;
        head.y = childSnake[childSnake.length-1].y;

        tail.x = childSnake[0].x;
        tail.y = childSnake[0].y;

        return;
    };

    const moveSnake = function () {

        // For clearing interval
        if(++cnt == 50)
            clearInterval(moveSnakeInterval);

        console.log('Moving...');
        
        // Function body
        let forwardPoint = {};  // objects are asigned and copied by reference
        forwardPoint.x = head.x;
        forwardPoint.y = head.y;

        switch(direction)
        {
            case UP:
                forwardPoint.x = (forwardPoint.x == 0) ? (nRows - 1) : (forwardPoint.x - 1);
                break;
            case DOWN:
                forwardPoint.x = (forwardPoint.x + 1) % nRows;
                break;
            case RIGHT:
                forwardPoint.y = (forwardPoint.y + 1) % nCols;
                break;
            case LEFT:
                forwardPoint.y = (forwardPoint.y == 0) ? (nCols - 1) : (forwardPoint.y - 1);
                break;
            default:
                forwardPoint.x = forwardPoint.y = 0;
        }

        // 1. Updating Snake Container
        snake.push(forwardPoint);
        // 2. Updating Head Container
        head.x = forwardPoint.x;
        head.y = forwardPoint.y;
        // 3. Coloring Cell
        gameDOMController.colorCell(forwardPoint);

        // 1. Updating Snake Container and Uncoloring cell & Uncoloring Cell
        gameDOMController.uncolorCell(snake.shift());
        // 2. Updating Tail Container
        tail.x = snake[0].x;
        tail.y = snake[0].y;
        // 3. Uncoloring Cell
        // -> Done at 1 ; gameDOMController.uncolorCell();
    };    

    return {
        getDirection: function() {
            return direction;
        },
        setDirection: function(pressedKey) {
            let newDirection;
    
            switch(pressedKey)
            {
                case "ArrowUp":
                    newDirection = UP;
                    // DOMElements.gameUpButton.style.backgroundColor = 'white';
                    break;
                case "ArrowDown":
                    newDirection = DOWN;
                    break;
                case "ArrowRight":
                    newDirection = RIGHT;
                    break;
                case "ArrowLeft":
                    newDirection = LEFT;
                    break;
                default:
                    return;
            }
    
            // Giving New Direction
            if(newDirection == LEFT || newDirection == RIGHT)
                if(direction != LEFT && direction != RIGHT)
                    direction = newDirection;

            if(newDirection == UP || newDirection == DOWN)
                if(direction != UP && direction != DOWN)
                    direction = newDirection;
            
            return;
        },
        init: function () {
            console.log('Initializing game...');

            gameDOMController.makeGrid(nRows, nCols);

            // console.log('anceint time:');
            // console.log(snake);

            createSnake();
            moveSnakeInterval = setInterval(moveSnake, snakeSpeed);
            // console.log(moveSnakeInterval); // interger value (2)

            gameDOMController.addGameMenuListeners();

            console.log('Ready to play!');
        }
    };
})();

gameController.init();