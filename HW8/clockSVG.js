var clockSize = 300; //Размер часов svg
var clockRadius = (clockSize-3) / 2; // Радиус циферблата
var clockCenter = clockSize / 2; // Центр svg
var hoursSize = 0.13 * clockSize; // Диаметр окружности указывающей на час
var hoursRadius = hoursSize / 2; // Радиус окружности указывающей на час
var hoursLength = clockRadius*0.8; // Расстояние от центра циферблата до окружности указывающей на час
var hoursFontSize = hoursSize / 2; // Размер номеров по периметру циферблата от 1 до 12
var digitalWatchFontSize =  hoursSize / 1.5; // Размер цифр электронных часов
var digitalWatchPosY = clockCenter*0.6; // Отстут от самый верхней точки до электронных часов
var secondHandPosY = clockRadius * 0.15; // Координата конца секундной стрелки
var minuteHandPosY = clockRadius * 0.3; // Координата конца минутной стрелки
var hourHandPosY = clockRadius * 0.5; // Координата конца часовой стрелки

document.addEventListener('DOMContentLoaded', time);

function time(){
	var svgClock = document.getElementById('clock');
	svgClock.style.width = clockSize;
	svgClock.style.height = clockSize;

	var clock = document.createElementNS("http://www.w3.org/2000/svg","circle");
	clock.setAttribute('stroke', 'black');
	clock.setAttribute('fill', '#a0a0a0');
	clock.setAttribute('r', clockRadius);
	clock.setAttribute('cx', clockCenter);
	clock.setAttribute('cy', clockCenter);
	clock.setAttribute('stroke-width', 3);
	svgClock.appendChild(clock);

	var deg = 30;
	for(var i = 1; i <= 12; i++){
		let hours = document.createElementNS("http://www.w3.org/2000/svg","circle");
		hours.setAttribute('stroke', 'black');
		hours.setAttribute('fill', 'white');
		hours.setAttribute('r', hoursRadius);
		hours.setAttribute('stroke-width', 1);
		svgClock.appendChild(hours);
		
		let hoursAngle = deg / 180 * Math.PI;
		let hoursCenterX = Math.round(clockRadius + hoursLength * Math.sin(hoursAngle));
		let hoursCenterY = Math.round(clockRadius - hoursLength * Math.cos(hoursAngle));
		hours.setAttribute('cx', hoursCenterX);
		hours.setAttribute('cy', hoursCenterY);
		
		let hoursNumb = document.createElementNS("http://www.w3.org/2000/svg","text");
		hoursNumb.setAttribute('x', hoursCenterX);
		hoursNumb.setAttribute('y', hoursCenterY+hoursRadius/3); //центр часовой окружности
		hoursNumb.setAttribute('text-anchor', 'middle');
		hoursNumb.style.fontSize = hoursFontSize;
		hoursNumb.textContent = i;
		svgClock.appendChild(hoursNumb);
		deg += 30;		
	}

	var secondHand = document.createElementNS("http://www.w3.org/2000/svg","line");
	secondHand.setAttribute('x1', clockCenter);
	secondHand.setAttribute('y1', clockCenter);
	secondHand.setAttribute('x2', clockCenter);
	secondHand.setAttribute('y2', secondHandPosY);
	secondHand.setAttribute('stroke', 'black');
	secondHand.setAttribute('stroke-width', '3px');
	secondHand.setAttribute('stroke-linecap', 'round');
	svgClock.appendChild(secondHand);

	var minuteHand = document.createElementNS("http://www.w3.org/2000/svg","line");
	minuteHand.setAttribute('x1', clockCenter);
	minuteHand.setAttribute('y1', clockCenter);
	minuteHand.setAttribute('x2', clockCenter);
	minuteHand.setAttribute('y2', minuteHandPosY);
	minuteHand.setAttribute('stroke', 'black');
	minuteHand.setAttribute('stroke-width', '6px');
	minuteHand.setAttribute('stroke-linecap', 'round');
	svgClock.appendChild(minuteHand);

	var hourHand = document.createElementNS("http://www.w3.org/2000/svg","line");
	hourHand.setAttribute('x1', clockCenter);
	hourHand.setAttribute('y1', clockCenter);
	hourHand.setAttribute('x2', clockCenter);
	hourHand.setAttribute('y2', hourHandPosY);
	hourHand.setAttribute('stroke', 'black');
	hourHand.setAttribute('stroke-width', '9px');
	hourHand.setAttribute('stroke-linecap', 'round');
	svgClock.appendChild(hourHand);
	
	var digitalWatch = document.createElementNS("http://www.w3.org/2000/svg","text");
	digitalWatch.setAttribute('x', clockCenter);
	digitalWatch.setAttribute('y', digitalWatchPosY);
	digitalWatch.setAttribute('text-anchor', 'middle');
	digitalWatch.style.fontSize = digitalWatchFontSize;
	svgClock.appendChild(digitalWatch);

	setTimeout(updateTime, 1000);
	
	function updateTime(){

		var currTime = new Date();
		var currTimeStr = formatDateTime(currTime);
		digitalWatch.innerHTML = currTimeStr;

		var secondsRatio = currTime.getSeconds() / 60;
		var minutesRatio = (secondsRatio + currTime.getMinutes()) / 60;
		var hoursRatio = (minutesRatio + currTime.getHours()) / 12;

		secondHand.setAttribute('transform', `rotate(${secondsRatio*360} ${clockCenter} ${clockCenter*0.95})`);
		minuteHand.setAttribute('transform', `rotate(${minutesRatio*360} ${clockCenter} ${clockCenter*0.95})`);
		hourHand.setAttribute('transform', `rotate(${hoursRatio*360} ${clockCenter} ${clockCenter*0.95})`);

		setTimeout(updateTime, 1020-currTime.getMilliseconds());
	}

	updateTime();
}

function formatDateTime(dt) {
    var hours=dt.getHours();
    var minutes=dt.getMinutes();
    var seconds=dt.getSeconds();
    return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}