const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
	x: undefined,
	y: undefined
};
const giftPosition = {
	x: undefined,
	y: undefined
};
let enemyPosition = [];

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

	const map = maps[level];

	if (!map) {
		gameWin();
		return;
	}

	if (!timeStart) {
		timeStart = Date.now();
		timeInterval = setInterval(showTime, 100)
		showRecord();
	}

	showLives();

	const mapRows = map.trim().split('\n');
	const mapRowsCol = mapRows.map(row => row.trim().split(''));

	enemyPosition = [];

	game.clearRect(0,0, canvasSize, canvasSize)
	mapRowsCol.forEach((row, rowI) => {
		row.forEach((col, colI) => {
			const emoji = emojis[col];
			const posX = elementsSize * colI;
			const posY = elementsSize * (rowI + 1);

			if (col == 'O') {
				if (!playerPosition.x && !playerPosition.y) {
					playerPosition.x = posX;
					playerPosition.y = posY;
					console.log({playerPosition})
				}
			} else if (col == 'I') {
				giftPosition.x = posX;
				giftPosition.y = posY;
			} else if (col == 'X') {
				enemyPosition.push({
					x: posX,
					y: posY,
				});
			};

			game.fillText(emoji, posX, posY);
		});
	});

	movePlayer();
};

function movePlayer() {
	const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
	const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
	const giftCollision = giftCollisionX && giftCollisionY;

	if (giftCollision) {
		levelWin();
	};

	const enemyCollision = enemyPosition.find(enemy => {
		const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
		const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
		return enemyCollisionX && enemyCollisionY;
	});

	if (enemyCollision) {
		levelFail();
	};

	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
	level ++;
	startGame();
};
function levelFail() {
	lives --;

	if (lives <= 0) {
		level = 0;
		lives = 3;
		timeStart = undefined;
	}

	playerPosition.x = undefined;
	playerPosition.y = undefined;
	startGame();
};
function gameWin() {
	console.log('Felicidades ganaste!');
	clearInterval(timeInterval);

	const playerTime = Date.now() - timeStart;
	const recordTime = localStorage.getItem('record_time');
	
	if (recordTime) {	
		if (recordTime >= playerTime) {
			localStorage.setItem('record_time', playerTime);
			pResult.innerHTML = 'SUPERASTE EL RECORD';
		} else {
			localStorage.setItem('record_time', playerTime);
			pResult.innerHTML = 'lo siento no superaste el record :(';
		}
	} else {
		localStorage.setItem('record_time', playerTime);
		pResult.innerHTML = 'Primera vez? jaja, muy bien';
	};

	console.log(recordTime, playerTime);
};
function showLives() {
	const heartArray = Array(lives).fill(emojis['HEART']);
	spanLives.innerHTML = "";
	heartArray.forEach(heart => spanLives.append(heart))
};
function showTime() {
	spanTime.innerHTML = Date.now() - timeStart;
};
function showRecord() {
	spanRecord.innerHTML = localStorage.getItem('record_time');
};

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveUp() {
	if ((playerPosition.y - elementsSize) < elementsSize) {
	} else {
		playerPosition.y -= elementsSize;
		startGame();
	}
};
function moveDown() {
	if ((playerPosition.y + elementsSize) > (canvasSize)) {

	} else {
		playerPosition.y += elementsSize;
		startGame();
	}
	
};
function moveLeft() {
	if ((playerPosition.x - elementsSize) < (elementsSize - elementsSize)) {
	} else {
		playerPosition.x -= elementsSize;
		startGame();
	}
};
function moveRight() {
	if ((playerPosition.x + elementsSize) > (canvasSize - elementsSize)) {
	} else {
		playerPosition.x += elementsSize;
		startGame();
	}
};
function moveByKeys(e) {
	if (e.key == 'ArrowUp') moveUp();
	else if (e.key == 'ArrowDown') moveDown();
	else if (e.key == 'ArrowLeft') moveLeft();
	else if (e.key == 'ArrowRight') moveRight();
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

