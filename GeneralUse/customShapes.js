function ellipseCurve(cx, cy, w, h, startAngle, endAngle, isComposite = false)
{
    if (!isComposite)
    {
        beginShape();
    }

    for (let angle = startAngle; angle <= endAngle; angle += 0.01)
    {
        let x = cx + (w / 2) * cos(angle);
        let y = cy + (h / 2) * sin(angle);
        curveVertex(x, y);
    }

    if (!isComposite)
    {
        endShape();
    }
}

function getEndPointsOfEllipseCurve(cx, cy, w, h, startAngle, endAngle)
{
    let x1 = cx + (w / 2) * cos(startAngle);
    let y1 = cy + (h / 2) * sin(startAngle);
    let x2 = cx + (w / 2) * cos(endAngle);
    let y2 = cy + (h / 2) * sin(endAngle);
    return [createVector(x1, y1), createVector(x2, y2)];
}
