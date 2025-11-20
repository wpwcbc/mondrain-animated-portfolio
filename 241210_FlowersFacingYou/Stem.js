class Stem
{
    constructor(args)
    {
        let defaults = {
            fullLength: 100,
            posX: 0,
            posZ: -100,
            width: 20,
            head: null,
        }

        this.green = random(50, 255);

        Object.assign(this, defaults, args);
    }

    update() 
    {
        //
    }

    draw()
    {
        push();
        translate(this.posX, -height / 2, this.posZ);
        stroke(0, this.green, 0);
        strokeWeight(this.width);
        
        if (this.head === null) {
            // Draw straight stem when head hasn't been created yet
            line(0, 0, 0, this.fullLength);
        } else {
            // Draw curved stem following head position
            noFill();  // Prevent fill color
            beginShape();
            vertex(0, 0);  // Start at base
            
            // Control points for curve
            let cp1x = 0;
            let cp1y = this.fullLength * 0.5;
            let cp2x = this.head.pos.x - this.posX;
            let cp2y = this.fullLength * 0.75 + (this.head.pos.y - this.head.originalPos.y) * 0.75;
            let endX = this.head.pos.x - this.posX;
            let endY = this.fullLength + (this.head.pos.y - this.head.originalPos.y);
            
            // Calculate z-offset based on displacement
            let displacement = dist(0, 0, endX, endY - this.fullLength);
            let zOffset = -this.posZ - 50
            
            bezierVertex(cp1x, cp1y, 0, cp2x, cp2y, 0, endX, endY, zOffset);
            endShape();
        }
        
        pop();
    }
}