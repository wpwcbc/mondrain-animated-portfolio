let holdedFrames = 0;
const HOLD_THRESHOLD = 15;

function mouseDown_custom() {
    if (mouseIsPressed) {
        holdedFrames++;

        return holdedFrames === 1 || holdedFrames >= HOLD_THRESHOLD;
    } else {
        holdedFrames = 0;
        return false;
    }
}