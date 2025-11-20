class Head {
    constructor(args) {
        let defaults = {
            // Geometry
            pos: createVector(0, 0, 0),
            fullRadius: 100,
            currentRadius: 0,
            growSpeed: 1,
            alpha: 255,
            mass: 1,
            angleX: 0,
            angleY: 0,

            // Physics
            velocity: createVector(0, 0),
            acceleration: createVector(0, 0),

            // Petal
            noOfPetals: Math.floor(random(5, 16)),
            angleBetweenPetals: TWO_PI / 8,
            cdOfPetals: 0.5,
            petalFullLength: 100,
            petalCurveFactorNaughtX1: random(0.1, 0.9),
            petalCurveFactorNaughtY1: random(0.1, 0.9),
            petalCurveFactorNaughtX2: random(0.1, 0.9),
            petalCurveFactorNaughtY2: random(0.1, 0.9),
            petalBaseColor: color(255, 0, 0),
        };

        Object.assign(this, defaults, args);
        
        this.originalPos = this.pos.copy();
        this.renderPos = this.pos.copy();
        this.petals = [];
        this.SetVariables();
        this.generatePetals();
    }

    SetVariables() {
        this.angleBetweenPetals = TWO_PI / this.noOfPetals;
    }

    async generatePetals() {
        let currentNoOfPetals = 0;

        while (currentNoOfPetals < this.noOfPetals) {
            this.petals.push(
                new Petal({
                    pos: this.renderPos,
                    fullLength: this.petalFullLength,
                    angleZBase: this.angleBetweenPetals * currentNoOfPetals,
                    growSpeed: this.growSpeed,
                    curveFactorNaughtX1: this.petalCurveFactorNaughtX1,
                    curveFactorNaughtY1: this.petalCurveFactorNaughtY1,
                    curveFactorNaughtX2: this.petalCurveFactorNaughtX2,
                    curveFactorNaughtY2: this.petalCurveFactorNaughtY2,
                    color: this.petalBaseColor,
                })
            );

            this.petalBaseColor = color(
                this.petalBaseColor.levels[0] + 15,
                this.petalBaseColor.levels[1] + 15,
                this.petalBaseColor.levels[2] + 15
            );

            currentNoOfPetals++;
        }
    }

    update() {
        // Physics update in screen space
        let wind = getWind(this.pos.x, this.pos.y);
        let force = wind.copy().mult(1/this.mass);
        this.acceleration.add(force);
        
        // Spring force in both x and y
        let displacement = createVector(
            this.pos.x - this.originalPos.x,
            this.pos.y - this.originalPos.y
        );
        let springForce = displacement.mult(-0.005);
        this.acceleration.add(springForce);
        
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.9);
        
        // Update position in both axes
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        
        this.acceleration.mult(0);

        // Update render position to match physical position
        this.renderPos.set(this.pos.x, this.pos.y, this.pos.z);

        // Calculate visual rotation (for rendering only)
        let observerX = mouseX - width / 2 - this.pos.x;
        let observerY = -mouseY + height / 2 - this.pos.y;
        let observerZ = 250;

        this.angleX = -atan2(observerY, observerZ);
        this.angleY = atan2(observerX, observerZ);

        // Update petals
        push();
        translate(this.renderPos.x, this.renderPos.y, this.renderPos.z);

        this.petals.forEach(petal => {
            petal.pos = createVector(0, 0, 0);
            petal.update();
        });
        pop();
    }

    draw() {
        push();
        // Move to physical position first
        translate(this.pos.x, this.pos.y, this.pos.z);

        // Draw a ball
        fill(255, 255, 0);
        noStroke();
        sphere(15);

        // Then apply visual rotation
        rotateX(this.angleX);
        rotateY(this.angleY);
        // Draw petals
        this.petals.forEach(petal => petal.draw());
        pop();
    }
}