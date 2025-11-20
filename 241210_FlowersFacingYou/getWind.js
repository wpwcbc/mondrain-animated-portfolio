const WIND_MULTIPLIER = 1;

function getWind(refX, refY) {
    // Convert mouse position to WEBGL coordinates (center origin)
    let mouseXCentered = mouseX - width/2;
    let mouseYCentered = -(mouseY - height/2);  // Flip Y for WEBGL
    
    // Calculate wind direction based on relative position
    let windX = (mouseXCentered - refX) / width * WIND_MULTIPLIER;
    let windY = (mouseYCentered - refY) / height * WIND_MULTIPLIER;
    
    return createVector(windX, windY);
}