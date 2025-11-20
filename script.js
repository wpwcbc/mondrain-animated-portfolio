// Linear interpolation helper
function lerp(a, b, t) {
	return a + (b - a) * t;
}

// Parse track from data-track="0,1,1,2"
// If missing, build a default [0,1,2,...] track from number of panels
function getTrackForElement(el) {
	const attr = el.dataset.track;
	if (attr) {
		const values = attr
			.split(",")
			.map((v) => Number(v.trim()))
			.filter((v) => Number.isFinite(v));
		if (values.length >= 2) return values;
	}

	// Default track: straight scroll through all panels inside
	const panels = el.querySelectorAll(".panel").length;
	const track = [];
	for (let i = 0; i < panels; i++) {
		track.push(i);
	}
	return track;
}

// Any element with data-track is a scroll container (top-level cell OR sub-cell)
const containers = Array.from(document.querySelectorAll("[data-track]"));
const tracks = new Map();
let maxSegments = 0;

containers.forEach((el) => {
	const track = getTrackForElement(el);
	tracks.set(el, track);
	maxSegments = Math.max(maxSegments, track.length - 1);
});

// Adjust main height based on longest track
const main = document.querySelector("main");
if (maxSegments > 0) {
	main.style.minHeight = `${(maxSegments + 1) * 100}vh`;
}

function updateContent() {
	const viewportH = window.innerHeight;
	const scrollMax = main.offsetHeight - viewportH;
	const scrollY = window.scrollY;

	// Normalize scroll to [0, 1]
	const s = scrollMax > 0 ? Math.min(Math.max(scrollY / scrollMax, 0), 1) : 0;

	containers.forEach((container) => {
		const track = tracks.get(container);
		const n = track.length;
		const segments = n - 1;
		if (segments <= 0) return;

		// Map s ∈ [0,1] to segment index + local progress
		const pos = s * segments;
		const idx = Math.floor(pos);
		const local = pos - idx;

		const fromIdx = track[idx];
		const toIdx = track[Math.min(idx + 1, n - 1)];
		const units = lerp(fromIdx, toIdx, local); // can be fractional

		// Size of this container (panel / cell / sub-cell)
		const rect = container.getBoundingClientRect();
		const height = rect.height;
		const width = rect.width;

		// ----- VERTICAL STRIPS within this container -----
		const verticalStrips = container.querySelectorAll(
			".column, .column-reverse"
		);
		verticalStrips.forEach((strip) => {
			// Only control strips whose nearest [data-track] ancestor is this container
			if (strip.closest("[data-track]") !== container) return;

			const style = getComputedStyle(strip);
			let gap = parseFloat(style.rowGap);
			if (!Number.isFinite(gap)) gap = 0;

			const step = height + gap; // panel size + gap
			const sign = strip.classList.contains("column") ? -1 : 1;
			const offsetY = units * step * sign;
			strip.style.transform = `translateY(${offsetY}px)`;
		});

		// ----- HORIZONTAL STRIPS within this container -----
		const horizontalStrips =
			container.querySelectorAll(".row, .row-reverse");
		horizontalStrips.forEach((strip) => {
			if (strip.closest("[data-track]") !== container) return;

			const style = getComputedStyle(strip);
			let gap = parseFloat(style.columnGap);
			if (!Number.isFinite(gap)) gap = 0;

			const step = width + gap; // panel size + gap
			const sign = strip.classList.contains("row") ? -1 : 1;
			const offsetX = units * step * sign;
			strip.style.transform = `translateX(${offsetX}px)`;
		});
	});
}

window.addEventListener("scroll", updateContent);
window.addEventListener("resize", updateContent);
updateContent();
