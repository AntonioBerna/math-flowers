let canvas, ctx, iv, angle = 0, d, n, scale, lastK;

onload = function () {
	canvas = document.getElementsByTagName("canvas")[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.8;

	scale = canvas.width < canvas.height ? canvas.width / 3 : canvas.height / 3;

	ctx = canvas.getContext("2d");
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.strokeStyle = "white";

	canvas.onclick = start;
	start();
}

function start() {
	d = Math.floor(Math.random() * 14) + 1;
	n = Math.floor(Math.random() * 20) + 1;

	let k = n / d;
	if (k == 1 || lastK == k) {
		start();
		return;
	}

	ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
	ctx.beginPath();

	let string = k % 1 === 0 ? k : n + "/" + d;

	for (let i = 2; i < 10; i++) {
		if ((n / i) % 1 === 0 && (d / i) % 1 === 0) {
			string = ((n / i) + "/" + (d / i));
		}
	}

	document.getElementById("d").innerHTML = "d = " + d;
	document.getElementById("n").innerHTML = "n = " + n;
	document.getElementById("k").innerHTML = "k = " + string;

	iv = setInterval(draw, 5);
}

// Reference: https://en.m.wikipedia.org/wiki/Rose_(mathematics)
function draw() {
	let k = n / d;
	let x = Math.cos(k * angle) * Math.cos(angle) * scale;
	let y = Math.cos(k * angle) * Math.sin(angle) * scale;

	ctx.lineTo(x, y);
	ctx.stroke();

	if (angle > Math.PI * d * n * 2) {
		lastK = k;
		clearInterval(iv);
	}

	angle += Math.PI / 100;
}



