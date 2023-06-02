const gameDOMController = (function () {

    const gameScreenDOM = document.getElementById('game-screen');

    const cellDOMId = function (i, j)
    {
        return `cell_${i}-${j}`;
    }
    
    return {
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
        }
    }
})();

const gameController = (function() {
    

    return {
        init: function () {
            gameDOMController.makeGrid(15, 15);
        }
    }
})();

gameController.init();