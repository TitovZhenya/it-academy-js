var clockSize = 500; //Диаметр циферблата
var clockRadius = clockSize / 2; // Радиус циферблата
var hoursSize = 0.13 * clockSize; // Диаметр окружности указывающей на час
var hoursRadius = hoursSize / 2; // Радиус окружности указывающей на час
var hoursLength = clockRadius*0.8; // Расстояние от центра циферблата до окружности указывающей на час
var hoursFontSize = hoursSize / 2; // Размер номеров по периметру циферблата от 1 до 12
var digitalWatchFontSize =  hoursSize / 1.5; // Размер цифр электронных часов
var secondHandSize = clockRadius * 0.95; // Длина секундной стрелки
var minuteHandSize = clockRadius * 0.8; // Длина минутной стрелки
var hourHandSize = clockRadius * 0.6; // Длина часовой стрелки

document.addEventListener('DOMContentLoaded', time);

function time(){
	var clock = document.createElement('div');
	clock.style.cssText = "position: relative; border: 2px solid black; border-radius: 50%";
	clock.style.width = clockSize + 'px';
	clock.style.height = clockSize + 'px';
	document.body.appendChild(clock);
	
	var deg = 30;
	for(var i = 1; i <= 12; i++){
		let hours = document.createElement('div');
		hours.style.cssText = "position: absolute; border: 1px solid black;  border-radius: 50%; text-align: center; line-height: 2; font-size: " + hoursFontSize + "px";
		hours.style.width = hoursSize + 'px';
		hours.style.height = hoursSize + 'px';
		hours.textContent = i;
		clock.appendChild(hours);
		let hoursAngle = deg / 180 * Math.PI;

		let hoursCenterX = clockRadius + hoursLength * Math.sin(hoursAngle);
		let hoursCenterY = clockRadius - hoursLength * Math.cos(hoursAngle);
		hours.style.left = Math.round(hoursCenterX - hoursRadius) + 'px';
		hours.style.top = Math.round(hoursCenterY - hoursRadius) + 'px';
		deg += 30;
	}

	var secondHand = document.createElement('div');
	secondHand.style.cssText = "position: absolute; background-color: black; left: 50%; bottom: 45%; transform: translateX(-50%); transform-origin: 50% 90%; border-radius: 30px; width: 3px";
	secondHand.style.height = secondHandSize + 'px';
	clock.appendChild(secondHand);

	var minuteHand = document.createElement('div');
	minuteHand.style.cssText = "position: absolute; background-color: black; left: 50%; bottom: 45%; transform: translateX(-50%); transform-origin: 50% 90%; border-radius: 50px; width: 6px";
	minuteHand.style.height = minuteHandSize + 'px';
	clock.appendChild(minuteHand);

	var hourHand = document.createElement('div');
	hourHand.style.cssText = "position: absolute; background-color: black; left: 50%; bottom: 45%; transform: translateX(-50%); transform-origin: 50% 90%; border-radius: 60px; width: 9px";
	hourHand.style.height = hourHandSize + 'px';
	clock.appendChild(hourHand);

	var digitalWatch = document.createElement('div');
	digitalWatch.style.cssText = "position: absolute; left: 35%; bottom: 65%; font-size: " + digitalWatchFontSize + "px";
	clock.appendChild(digitalWatch);


	setInterval(updateTime, 1000);
	
	function updateTime(){

		var currTime = new Date();
		var currTimeStr = formatDateTime(currTime);
		digitalWatch.innerHTML = currTimeStr;

		var secondsRatio = currTime.getSeconds() / 60;
		var minutesRatio = (secondsRatio + currTime.getMinutes()) / 60;
		var hoursRatio = (minutesRatio + currTime.getHours()) / 12;

		secondHand.style.transform = 'rotate('+secondsRatio*360+'deg)';
		minuteHand.style.transform = 'rotate('+minutesRatio*360+'deg)';
		hourHand.style.transform = 'rotate('+hoursRatio*360+'deg)';
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