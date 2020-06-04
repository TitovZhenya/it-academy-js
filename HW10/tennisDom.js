var gameBoardWidth = 700; 		// ширина всего поля
var gameBoardHeight = 550;		// высота всего поля
var gameStart = false;

// высота счета
var score = {
	height : 50		
}

// размер поля где летает мячик
var field = {			
	width : gameBoardWidth,
	height : gameBoardHeight - score.height
}

// описание мячика
var ballH = {
	width : 20,										// ширина мяча
	height : 20,									// высота мяча
	posX : field.width / 2 - 10,					// позиция X мяча в центре поля
	posY : score.height + field.height / 2 - 10,	// позиция Y мяча в центре поля
	speed : 5,										// скорость на которую ускоряется мяч при столкновении с ракеткой
	velocityX : randomNum([-3, 3]),					// мяч вылетает в случайную сторону по X
	velocityY : randomNum([-3, 3]),					// мяч вылетает в случайную сторону по Y
	moveBall : function ()							// движение мяча и его отскоки от верхней + нижней стены
	{
		this.posX += this.velocityX;
		this.posY += this.velocityY;
		ballDiv.style.left = this.posX + 'px';
		ballDiv.style.top = this.posY +'px';
		
		if ( this.posY + this.height > gameBoardHeight ||
			 this.posY < score.height )
		{
			this.velocityY = -this.velocityY;
		}
	},
	resetBall : function()							// сброс позиции мяча при забитом голе
	{
		this.posX = field.width / 2 - 10;
		this.posY = score.height + field.height / 2 - 10;
		this.speed = 5;
		this.velocityX = randomNum([-3, 3]);
		this.velocityY = randomNum([-3, 3]);
	}
}

// описание 2-ух игроков
var players = [
	{
		posX : 0,											// позиция левого игрока по X
		posY : score.height + field.height / 2 - 50,		// позиция левого игрока по Y
		width : 10,											// ширина платформы
		height : 100,										// высота платформы
		score : 0,											// счет
		movePlayerTop : function()							// движение левого игрока вверх
		{
			this.posY -= 5;
			firstPlayerDiv.style.top = this.posY + 'px';
		},
		movePlayerBottom : function()						// движение левого игрока вниз
		{
			this.posY += 5;
			firstPlayerDiv.style.top = this.posY + 'px';
		}

	},
	{
		posX : field.width - 10,							// позиция правого игрока по X
		posY : score.height + field.height / 2 - 50,		// позиция правого игрока по Y
		width : 10,											// ширина платформы
		height : 100,										// высота платформы
		score : 0,											// счет
		movePlayerTop : function()							// движение правого игрока вверх
		{
			this.posY -= 5;
			secondPlayerDiv.style.top = this.posY + 'px';
		},
		movePlayerBottom : function()						// движение правого игрока вниз
		{
			this.posY += 5;
			secondPlayerDiv.style.top = this.posY + 'px';
		}	
	}
]

var game = {
	collision : function(player, ball)						// отслеживание столкновения мяча с платформой
	{														// и изменение направления движения		
		let playerTop = player.posY;
		let playerBottom = player.posY + player.height;
		let playerRight = player.posX + player.width;
		let playerLeft = player.posX;

		let ballTop = ball.posY;
		let ballBottom = ball.posY + ball.height;
		let ballRight = ball.posX + ball.width;
		let ballLeft = ball.posX;

		if ( playerTop < ballBottom && playerBottom > ballTop &&
		       playerRight > ballLeft && playerLeft < ballRight )
		{
			let clash = ((ballTop + ballH.height / 2) - (playerTop + player.height / 2));
			clash = clash / ( player.height / 2);
			let angle = ( Math.PI / 4 ) * clash;

			let direction = ( ballLeft < field.width / 2 ) ? 1 : -1;

			ballH.velocityX = direction * ballH.speed * Math.cos(angle);
			ballH.velocitY = direction * ballH.speed * Math.sin(angle);

			ballH.speed += 0.5;
		}
	},
	movePlayers : function(){
		for ( var move in keys )
		{
			if (!keys.hasOwnProperty(move))
				continue;

			if ( move == 16 )
			{
				// правый вверх
				if ( players[0].posY <= score.height )
					continue;
				players[0].movePlayerTop();
			}

			if ( move == 17 )
			{
				// правый вниз
				if ( players[0].posY >= gameBoardHeight - players[0].height )
					continue;
				players[0].movePlayerBottom();
			}

			if ( move == 38 )
			{
				// левый вверх
				if ( players[1].posY <= score.height )
					continue;
				players[1].movePlayerTop();
			}

			if ( move == 40 )
			{
				// левый вниз
				if ( players[1].posY >= gameBoardHeight - players[1].height )
					continue;
				players[1].movePlayerBottom();
			}
		}
	},
	start : function()											// старт игры
	{
		if( gameStart ){

			ballH.moveBall();

			game.movePlayers();

			players.forEach( (player) => {
				game.collision(player, ballH);
			});

			if ( ballH.posX + ballH.width > field.width )
			{
				ballDiv.style.left = gameBoardWidth - ballH.width + 'px';
				players[0].score++;
				scoreDiv.textContent = players[0].score + '|' + players[1].score;
				ballH.resetBall();
				gameStart = false;
			} else if ( ballH.posX < 0 )
			{
				ballDiv.style.left = 0 + 'px';
				players[1].score++;
				scoreDiv.textContent = players[0].score + '|' + players[1].score;
				ballH.resetBall();
				gameStart = false;
			}
		}
	}
}

var gameDiv = document.getElementById('Game');
gameDiv.style.cssText = 'position: relative; margin: 0 auto;';
gameDiv.style.width = gameBoardWidth + 'px';
gameDiv.style.height = gameBoardHeight + 'px';

var startBtn = document.createElement('button');
startBtn.style.cssText = 'position: absolute; top: 13px; width: 70px; background-color: #d9d9d3';
startBtn.textContent = 'Старт!';
startBtn.onclick = play; 								//запуск игры
gameDiv.appendChild(startBtn);	

var scoreDiv = document.createElement('div');
scoreDiv.style.cssText = 'font: 40px sans-serif; text-align: center';
scoreDiv.style.height = score.height + 'px';
scoreDiv.textContent = players[0].score + '|' + players[1].score; 
gameDiv.appendChild(scoreDiv);

var fieldDiv = document.createElement('div');
fieldDiv.style.backgroundColor = '#f0ee7e';
fieldDiv.style.width = field.width + 'px';
fieldDiv.style.height = field.height + 'px';
gameDiv.appendChild(fieldDiv);

var ballDiv = document.createElement('div');
ballDiv.style.cssText = 'position: absolute; border-radius: 50%; background-color: #f02137;';
ballDiv.style.width = ballH.width + 'px';
ballDiv.style.height = ballH.height + 'px';
ballDiv.style.left = ballH.posX + 'px';
ballDiv.style.top = ballH.posY + 'px';
gameDiv.appendChild(ballDiv);

var firstPlayerDiv = document.createElement('div');
firstPlayerDiv.style.cssText = 'position: absolute; background-color: black';
firstPlayerDiv.style.width = players[0].width + 'px';
firstPlayerDiv.style.height = players[0].height + 'px';
firstPlayerDiv.style.top = players[0].posY + 'px';
gameDiv.appendChild(firstPlayerDiv);

var secondPlayerDiv = document.createElement('div');
secondPlayerDiv.style.cssText = 'position: absolute; background-color: black';
secondPlayerDiv.style.width = players[1].width + 'px';
secondPlayerDiv.style.height = players[1].height + 'px';
secondPlayerDiv.style.top = players[1].posY + 'px';
secondPlayerDiv.style.left = players[1].posX + 'px';
gameDiv.appendChild(secondPlayerDiv);

setInterval(game.start, 1000 / 60);      // проверяет нажатие клавишь и двигает платформы

var keys = {} // Хранит номера нажатых клавиш

document.addEventListener('keydown', function(e) {
	e = e || window.event;
	keys[e.keyCode] = true;
})

document.addEventListener('keyup', function(e) {
	e = e || window.event;
	delete keys[e.keyCode];
})

function play()
{
	gameStart = true;
}

function randomNum(arrayNum)			// получение случайного числа и массива чисел
{
	let randomMove = arrayNum[Math.floor(Math.random()*arrayNum.length)];
	return randomMove;
}