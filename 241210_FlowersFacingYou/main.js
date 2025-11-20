let flowers;
let gridSize = 1;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	flowers = [];

	scale(1, -1);

	let cellWidth = width / gridSize;
	let cellHeight = height / gridSize;

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			let x = (i + 1 / 2 - gridSize / 2) * cellWidth;
			let y = (j + 1 / 2 - gridSize / 2) * cellHeight;

			flowers.push(
				new Flower({
					pos: createVector(x, y),
					posZ: -100 - (y / height) * gridSize * 50,
				})
			);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255, 255, 255);
	scale(1, -1);

	// Update and draw all flowers
	flowers.forEach((flower) => {
		flower.update();
		flower.draw();
	});
}
