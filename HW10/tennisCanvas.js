"use strict"

const canv = document.getElementById('field');
var gameStart = false;

canv.width = 700;
canv.height = 500;

class Rect
{
	constructor(x, y, width, height)
	{
		this.posX = x;
		this.posY = y;
		this.width = width;
		this.height = height;
	}
}

class Ball
{
	constructor(x, y, r, a1, a2)
	{
		this.posX = x;
		this.posY = y;
		this.radius = r;
		this.a1 = a1;
		this.a2 = a2;
		this.velocityX = randomNum([-3, 3]);
		this.velocityY = randomNum([-3, 3]);
		this.speed = 5;
	}
}

class Player extends Rect
{
	constructor()
	{
		super(0, canv.height / 2 - 50, 10, 100);
		this.score = 0;
	}
}

class Tennis
{
	constructor(canv)
	{
		this.canv = canv;
		this.ctx = canv.getContext('2d');

		this.ball = new Ball(canv.width / 2, canv.height / 2, 10, 0, Math.PI*2);

		this.players = [
			new Player,
			new Player
		]

		this.players[1].posX = canv.width - this.players[1].width;

		this.start = () => {
			this.update();
			requestAnimationFrame(this.start);	// Через requestAnimationFrame
		}
	}

	drawField()
	{
		this.ctx.fillStyle = '#f0ee7e';
		this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
	}

	drawBall(ball)
	{
		this.ctx.fillStyle = '#f02137';
		this.ctx.beginPath();
		this.ctx.arc(this.ball.posX, this.ball.posY, this.ball.radius, 
					 this.ball.a1, this.ball.a2);
		this.ctx.fill();		
	}

	drawPlayer()
	{
		this.ctx.fillStyle = 'black';
		this.players.forEach( player => {
			this.ctx.fillRect(player.posX, player.posY, player.width, player.height);
		})
	}

	clear()
	{
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, canv.width, canv.height);
	}

	draw()
	{
		this.clear();
		this.drawField();
		this.drawBall(this.ball);
		this.drawPlayer();
	}

	movePlayers()
	{
		for ( var move in keys )
		{
			if (!keys.hasOwnProperty(move))
				continue;

			if ( move == 16 )
			{
				// правый вверх
				if ( this.players[0].posY <= 0 )
					continue;
				this.players[0].posY -= 5;
			}

			if ( move == 17 )
			{
				// правый вниз
				if ( this.players[0].posY >= canv.height - this.players[1].height )
					continue;
				this.players[0].posY += 5;
			}

			if ( move == 38 )
			{
				// левый вверх
				if ( this.players[1].posY <= 0 )
					continue;				
				this.players[1].posY -= 5;
			}

			if ( move == 40 )
			{
				// левый вниз
				if ( this.players[1].posY >= canv.height - this.players[1].height )
					continue;
				this.players[1].posY += 5;
			}
		}
	}

	moveBall()
	{
		this.ball.posX += this.ball.velocityX;
		this.ball.posY += this.ball.velocityY;

		if ( this.ball.posY + this.ball.radius > this.canv.height ||
		 this.ball.posY < 0 )
		{
			this.ball.velocityY = -this.ball.velocityY;
		}
	}

	collision(player, ball) 					// отслеживание столкновения мяча с платформой
	{											// и изменение направления движения		
		let playerTop = player.posY;
		let playerBottom = player.posY + player.height;
		let playerRight = player.posX + player.width;
		let playerLeft = player.posX;

		let ballTop = ball.posY - ball.radius;
		let ballBottom = ball.posY + ball.radius;
		let ballRight = ball.posX + ball.radius;
		let ballLeft = ball.posX - ball.radius;

		if ( playerTop < ballBottom && playerBottom > ballTop &&
		       playerRight > ballLeft && playerLeft < ballRight )
		{
			let clash = (ball.posY - (player.posY + player.height / 2));
			clash = clash / (player.height / 2);

			let angle = (Math.PI/4) * clash;
			let direction = (ball.posX + ball.radius < canv.width / 2) ? 1 : -1;
			ball.velocityX = direction * ball.speed * Math.cos(angle);
			ball.velocityY = ball.speed * Math.sin(angle)

			ball.speed += 0.5;        
		}
	}

	reset()
	{
		this.ball.posX = canv.width / 2;
		this.ball.posY = canv.height / 2;
		this.ball.velocityX = randomNum([-3, 3]);
		this.ball.velocityY = randomNum([-3, 3]);
		this.speed = 5;
	}

	updateScore()
	{
		if ( this.ball.posX + this.ball.radius > this.canv.width )
		{
			this.players[0].score++;
			this.ball.posX = canv.width - this.ball.radius;
			this.draw();
			this.reset();
			gameStart = false;
		} else if ( this.ball.posX < 0 )
		{
			this.players[1].score++;
			this.ball.posX = 0 + this.ball.radius;
			this.draw();
			this.reset();
			gameStart = false;
		}
		scoreDiv.textContent = this.players[0].score + '|' + this.players[1].score;
	}

	update()
	{		
		if (gameStart)
		{	
			this.draw();
			this.movePlayers();
			this.moveBall();
			this.players.forEach( player => {
				this.collision(player, this.ball);
			});
			this.updateScore();
		}

	}
}


const game = new Tennis(canv);
game.draw();
game.start();  							// Через requestAnimationFrame		
// setInterval(game.start,1000/60);		// Через setInterval

var scoreDiv = document.getElementById('score');
scoreDiv.textContent = '0|0'

var startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', play);
function play()
{
	gameStart = true;
}

var keys = {} // Хранит номера нажатых клавиш

document.addEventListener('keydown', function(e) {
	e = e || window.event;
	keys[e.keyCode] = true;
})

document.addEventListener('keyup', function(e) {
	e = e || window.event;
	delete keys[e.keyCode];
})

function randomNum(arrayNum)			// получение случайного числа и массива чисел
{
	let randomMove = arrayNum[Math.floor(Math.random()*arrayNum.length)];
	return randomMove;
}