const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = innerWidth * 0.7;
	} else if (window.innerWidth > window.innerHeight) {
		canvasSize = innerHeight * 0.7;
	}

	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elementsSize = (canvasSize / 10) - 1;	

	startGame();
};

function startGame() {
	game.font = elementsSize + 'px Arial'
	game.textAlign = '';

	const map = maps[0];
	const mapRows = map.trim().split('\n');
	const mapRowsCol = mapRows.map(row => row.trim().split(''));

	console.log({map, mapRows, mapRowsCol});

	mapRowsCol.forEach((row, rowI) => {
		row.forEach((col, colI) => {
			const emoji = emojis[col];
			const posX = elementsSize * colI;
			const posY = elementsSize * (rowI + 1);
			game.fillText(emoji, posX, posY)
		});
	});
};


/* 
	Funcion .trim()

	Esta funcion en lo que nos ayuda es en poder quitar los espacios de un string antes de 
	renderizarlos 

	Funcion .split('Argumento')

	Esta funcion lo que nos permite es separar un string dependiendo del argumento que le demos
	por ejemplo si a este string ("Hola mundo") le dieramos como argumento al metodo split un
	espacio, entonces lo separaria por el espacio ("Hola", "mundo") pero si no le damos 
	argumento lo separaria por palabra ("H", "o", "l", "a", "m", "u", "n", "d", "o")

	Remplazamos el metodo for para renderizar el mapa po un metodo forEach

	for (let row = 1; row <= 10; row++) {
		for (let col = 0; col <= 9; col++) {
			game.fillText(emojis[mapRowsCol[row - 1][col]], elementsSize * col, elementsSize * row);
		}
	};
*/

