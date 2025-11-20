class Petal
{
    constructor(args)
    {
        let defaults =
        {
            pos: createVector(0, 0),
            fullLength: 100,
            angleYBase: 0,
            angleYTilt: 0,
            angleZBase: 0,
            angleZTilt: 0,
            growSpeed: 1,
            curveFactorNaughtX1: 0.1,
            curveFactorNaughtY1: 0.2,
            curveFactorNaughtX2: 0.3,
            curveFactorNaughtY2: 0.4,
            color: color(255, 0, 0),
        };

        Object.assign(this, defaults, args);
        
        // Initialize full curve factors with Naught values
        this.curveFactorX1 = this.curveFactorNaughtX1;
        this.curveFactorY1 = this.curveFactorNaughtY1;
        this.curveFactorX2 = this.curveFactorNaughtX2;
        this.curveFactorY2 = this.curveFactorNaughtY2;
        
        // Time for oscillation
        this.time = 0;
    }

    update()
    {   
        // Update time
        this.time += deltaTime/100;

        // Oscillate between Naught values and 1 using sine
        this.curveFactorX1 = map(sin(this.time + (TWO_PI - this.angleZBase)), -1, 1, this.curveFactorNaughtX1 / 1.5, this.curveFactorNaughtX1);
        this.curveFactorY1 = map(sin(this.time + (TWO_PI - this.angleZBase) + PI/4), -1, 1, this.curveFactorNaughtY1 / 1.5, this.curveFactorNaughtY1);
        this.curveFactorX2 = map(sin(this.time + (TWO_PI - this.angleZBase) + PI/2), -1, 1, this.curveFactorNaughtX2 / 1.5, this.curveFactorNaughtX2);
        this.curveFactorY2 = map(sin(this.time + (TWO_PI - this.angleZBase) + PI*3/4), -1, 1, this.curveFactorNaughtY2 / 1.5, this.curveFactorNaughtY2);
    
        this.angleYTilt = map(sin(this.time), -1, 1, PI/16, PI/8);
    }

    // Draw method to render petals
    draw()
    {
        push();
        translate(this.pos.x, this.pos.y); // Adjust to position
        scale(1, -1);
        rotateZ(this.angleZBase); // Add rotation based on petal angle
        rotateY(this.angleYBase + this.angleYTilt);

        fill(this.color);
        noStroke();

        beginShape();
        vertex(0, 0); // Starting point at the center
        bezierVertex(
            this.fullLength * this.curveFactorX1, this.fullLength * this.curveFactorY1,
            this.fullLength * this.curveFactorX1, this.fullLength * this.curveFactorY1,
            0, this.fullLength
        ); // Right control points
        vertex(0, this.fullLength);
        bezierVertex(
            - this.fullLength * this.curveFactorX2, this.fullLength * this.curveFactorY2,
            - this.fullLength * this.curveFactorX2, this.fullLength * this.curveFactorY2,
            0, 0
        ) // Left control points
        endShape(CLOSE);
        pop();
    }
}