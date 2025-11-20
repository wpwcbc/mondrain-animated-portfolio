class Flower
{
    constructor(args)
    {
        let defaults =
        {
            pos: createVector(0, 0),
            posZ: -100,
            width: 10,
            growSpeed: 1,
            mass: 1,
            alpha: 255,
        }

        Object.assign(this, defaults, args);

        this.head = new Head({
            pos: createVector(this.pos.x, this.pos.y),  // Create new vector with proper coordinates
            petalFullLength: 100,
            noOfPetals: Math.floor(random(5, 10)),
            petalCurveFactorNaughtX1: random(0.5, 0.9),
            petalCurveFactorNaughtY1: random(0.5, 0.9),
            petalCurveFactorNaughtX2: random(0.5, 0.9),
            petalCurveFactorNaughtY2: random(0.5, 0.9),
            petalBaseColor: color(random(100, 180), random(100, 180), random(100, 180)),
        });

        this.stem = new Stem({
            fullLength: this.pos.y + height / 2,
            posX: this.pos.x,
            posZ: this.posZ,
            width: this.width,
            head: this.head,
        });
    }

    update()
    {
        this.head.update();
        this.stem.update();
    }

    draw()
    {
        this.stem.draw();
        this.head.draw();
    }
}