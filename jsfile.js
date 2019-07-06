const timer_ele = document.querySelector("#timer");
const session_ele = document.querySelector("#session-time");
const break_ele = document.querySelector("#break-time");
const session_text = document.querySelector("#session");
const break_text = document.querySelector("#break");
const start_btn = document.querySelector("#start-btn");
const reset_btn = document.querySelector("#reset-btn");
const pause_btn = document.querySelector("#pause-btn");
const stop_btn = document.querySelector("#stop-btn");
//Buttons array for eventlisteners
const buttons = document.querySelectorAll(".btn");
let isOn = false;
let session_time = String(25);
let break_time = 5;
let isPause = false;

updateAll();

buttons.forEach((btn) => btn.addEventListener("click", () => buttonHandler(btn.id)));

function buttonHandler(id) {
	session_time = Number(session_time);
	if (id == "left-inc-btn") {
		if (session_time < 60) {
			session_time += 1;
		}
		updateAll();

	} else if (id == "left-dec-btn") {
		if (session_time > 1) {
			session_time -= 1;
		}
		updateAll();

	} else if (id == "right-inc-btn") {
		if (break_time < 20) {
			break_time += 1;
		}
		updateAll();

	} else if (id == "right-dec-btn") {
		if (break_time > 1) {
			break_time -= 1;
		}
		updateAll();
	} else if (id == "start-btn") {
		if (!isOn) {
			startClock()
		}
		isPause = false;
		timer_ele.style.color = "rgb(35, 226, 35)"
	} else if (id == "reset-btn") {
		isOn = false;
		session_time = String(25);
		break_time = 5;
		updateAll();
	}
}

function updateAll() {
	session_ele.textContent = session_time
	break_ele.textContent = break_time
	if (!isOn) {
		timer_ele.textContent = session_time + ":00";
	}
}

function startClock() {
	beep()
	isOn = true;
	timer_ele.style.color = "rgb(35, 226, 35)"
	session_text.style.color = "rgb(35, 226, 35)"
	session_time = String(session_time);
	let minutes = Number(session_time.substring(0, 2)) - 1;
	let seconds = 59;

	let intervalId = setInterval(function () {
		if (!isPause) {
			if (seconds < 10) {
				timer_ele.textContent = minutes + ":" + "0" + seconds;
			} else {
				timer_ele.textContent = minutes + ":" + seconds;
			}
			if (seconds > 0) {
				seconds -= 1;
			} else {
				minutes -= 1;
				seconds = 59;
			}

			if (minutes == 0 && seconds == 0) {
				clearInterval(intervalId);
				breakTime();
				session_text.style.color = "black"
			}
		}
	}, 1000);

	//buttons
	reset_btn.addEventListener("click", () => {
		clearInterval(intervalId)
		timer_ele.style.color = "black"
		session_text.style.color = "black"
		isOn = false;
		isPause = false;
	});

	pause_btn.addEventListener("click", () => {
		isPause = true;
		timer_ele.style.color = "red"
	});

	stop_btn.addEventListener("click", () => {
		clearInterval(intervalId);
		isOn = false;
		isPause = false;
		session_ele.textContent = session_time;
		break_ele.textContent = break_time;
		timer_ele.textContent = session_time + ":00";
		session_text.style.color = "black";
		timer_ele.style.color = "black";
		break_ele.style.color = "black";
	});

}

function breakTime() {
	beep()
	isOn = true;
	timer_ele.style.color = "rgb(35, 226, 35)";
	break_text.style.color = "rgb(35, 226, 35)";
	let minutes = Number(break_time) - 1;
	let seconds = 59;



	let intervalId = setInterval(function () {
		if (!isPause) {
			if (seconds < 10) {
				timer_ele.textContent = minutes + ":" + "0" + seconds;
			} else {
				timer_ele.textContent = minutes + ":" + seconds;
			}
			if (seconds > 0) {
				seconds -= 1;
			} else {
				minutes -= 1;
				seconds = 59;
			}

			if (minutes == 0 && seconds == 0) {
				clearInterval(intervalId);
				break_text.style.color = "black";
				startClock();
			}
		}
	}, 1000);

	//buttons
	reset_btn.addEventListener("click", () => {
		clearInterval(intervalId)
		timer_ele.style.color = "black";
		isOn = false;
		isPause = false;
	});

	pause_btn.addEventListener("click", () => {
		isPause = true;
		timer_ele.style.color = "red";

	});

	stop_btn.addEventListener("click", () => {
		clearInterval(intervalId)
		isOn = false;
		isPause = false;
		session_ele.textContent = session_time;
		break_ele.textContent = break_time;
		timer_ele.textContent = session_time + ":00";
		timer_ele.style.color = "black";
		break_ele.style.color = "black";
		session_text.style.color = "black";
	});

}


var audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);

function beep(duration, frequency, volume, type, callback) {
	var oscillator = audioCtx.createOscillator();
	var gainNode = audioCtx.createGain();

	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	if (volume) {
		gainNode.gain.value = volume;
	};
	if (frequency) {
		oscillator.frequency.value = frequency;
	}
	if (type) {
		oscillator.type = type;
	}
	if (callback) {
		oscillator.onended = callback;
	}

	oscillator.start();
	setTimeout(function () {
		oscillator.stop()
	}, (duration ? duration : 500));
};