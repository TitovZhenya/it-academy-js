'use strict';

class Clock
{
	constructor(clockSize)
	{
		this.clockSize = clockSize;
		this.clockRadius = clockSize / 2;
		this.hoursSize = 0.13 * clockSize;
		this.hoursRadius = this.hoursSize / 2;
		this.hoursLength = this.clockRadius * 0.8;
		this.hoursFontSize = this.hoursSize / 2;
		this.digitalWatchFontSize = this.hoursFontSize * 1.5;
		this.digitalWatchPosY = this.clockRadius*0.6;
		this.secondHandSize = this.clockRadius*0.8;
		this.minuteHandSize = this.clockRadius*0.65;
		this.hourHandSize = this.clockRadius*0.5;

		this.myView = null;
	}

	start(view)
	{
		this.myView = view;
	}

	updateView()
	{
		if( this.myView )
		{
			this.myView.update();
		}
	}

	updateTime()
	{
		
	}

}

		/*var
			clockSize 				= 500, //Диаметр циферблата
			clockRadius				= (clockSize-3) / 2, // Радиус циферблата
			clockCenter				= clockSize / 2, //Центр canvas
			hoursSize 				= 0.13 * clockSize, // Диаметр окружности указывающей на час
			hoursRadius 			= hoursSize / 2, // Радиус окружности указывающей на час
			hoursLength 			= clockRadius*0.8, // Расстояние от центра циферблата до окружности указывающей на час
			hoursFontSize			= hoursSize / 2, // Размер номеров по периметру циферблата от 1 до 12
			digitalWatchFontSize	= hoursFontSize * 1.5, // Размер цифр электронных часов
			digitalWatchPosY 		= clockCenter*0.6, // Отстут от самый верхней точки до электронных часов
			secondHandSize 			= clockRadius * 0.8, // Длина секундной стрелки
			minuteHandSize 			= clockRadius * 0.65, // Длина минутной стрелки
			hourHandSize 			= clockRadius * 0.5, // Длина часовой стрелки
			canv 					= document.getElementById('canvas'),
			ctx 					= canv.getContext('2d');*/

		/*canv.width = clockSize;
		canv.height = clockSize;

		setTimeout(updateTime, 1000);

		function updateTime(){
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, canv.width, canv.height);

			ctx.fillStyle = '#fcca66';
			ctx.beginPath();
			ctx.arc(clockCenter, clockCenter, clockRadius, 0, Math.PI*2);
			ctx.fill();

			var deg = 30;
			for(var i = 1; i <= 12; i++)
			{
				
				var 
					hoursAngle 		= deg / 180 * Math.PI,
					hoursCenterX 	= Math.round(clockRadius + hoursLength * Math.sin(hoursAngle)),
					hoursCenterY	= Math.round(clockRadius - hoursLength * Math.cos(hoursAngle));

				ctx.fillStyle = '#48b382';
				ctx.beginPath();
				ctx.arc(hoursCenterX, hoursCenterY, hoursRadius, 0, Math.PI*2);
				ctx.fill();

				ctx.fillStyle = 'black';
				ctx.font = `${hoursFontSize}px serif`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(i, hoursCenterX, hoursCenterY);
				
				deg += 30;		
			}

			var 
				currTime 	= new Date(),
				currTimeStr = formatDateTime(currTime),
				sec 		= 6 * currTime.getSeconds(),
				min 		= 6 *(currTime.getMinutes() + currTime.getSeconds() / 60),
				hour 		= 30 * (currTime.getHours() + currTime.getMinutes() / 60);

			ctx.beginPath();
			ctx.font = `${digitalWatchFontSize}px serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(currTimeStr, clockCenter, digitalWatchPosY);

			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(clockCenter, clockCenter);
			ctx.lineTo(
					clockCenter + secondHandSize * Math.cos(Math.PI / 2 - sec * (Math.PI/180)), 
					clockCenter - secondHandSize * Math.sin(Math.PI / 2 - sec * (Math.PI/180))
				);
			ctx.stroke();

			ctx.lineWidth = 6;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(clockCenter, clockCenter);
			ctx.lineTo(
					clockCenter + minuteHandSize * Math.cos(Math.PI / 2 - min * (Math.PI/180)), 
					clockCenter - minuteHandSize * Math.sin(Math.PI / 2 - min * (Math.PI/180))
				);
			ctx.stroke();

			ctx.lineWidth = 9;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(clockCenter, clockCenter);
			ctx.lineTo(
					clockCenter + hourHandSize * Math.cos(Math.PI / 2 - hour * (Math.PI/180)), 
					clockCenter - hourHandSize * Math.sin(Math.PI / 2 - hour * (Math.PI/180))
				);
			ctx.stroke();

			setTimeout(updateTime, 1020 - currTime.getMilliseconds());
		}

		updateTime()

		function formatDateTime(dt) {
			var 
				hours 		= dt.getHours(),
				minutes 	= dt.getMinutes(),
				seconds 	= dt.getSeconds();
			return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
		}

		function str0l(val,len) {
			var strVal=val.toString();
			while ( strVal.length < len )
				strVal='0'+strVal;
			return strVal;
		}*/