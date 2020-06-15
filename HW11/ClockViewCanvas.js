class ClockViewModel
{
	constructor(canv)
	{
		this.canv = canv;
		this.ctx = canv.getContext('2d');
		this.myModel = null;

	}

	start(model)
	{
		this.myModel = model;
	}

	clear()
	{
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, canv.width, canv.height);
	}

	update()
	{
		this.clear();

		this.ctx.fillStyle = '#fcca66';
		this.ctx.beginPath();
		this.ctx.arc(this.myModel.clockRadius, this.myModel.clockRadius, this.myModel.clockRadius, 0, Math.PI*2);
		this.ctx.fill();

		/*var deg = 30;
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

		setTimeout(updateTime, 1020 - currTime.getMilliseconds());*/
	}
}