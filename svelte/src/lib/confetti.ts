import type confetti from 'canvas-confetti';

const COLORS = ['#203864', '#8faadc', '#d1dbed'];

let module: Promise<typeof confetti> | undefined;

/** Loads `canvas-confetti` once, on first use. */
export function loadConfetti(): Promise<typeof confetti> {
	module ??= import('canvas-confetti').then((imported) => imported.default);
	return module;
}

/** Fires confetti from both sides of the screen on every animation frame until the returned function is called. */
export function celebrate(): () => void {
	let frame: number | undefined;
	let stopped = false;

	void loadConfetti().then((fire) => {
		function burst() {
			fire({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: COLORS });
			fire({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: COLORS });
			frame = requestAnimationFrame(burst);
		}

		if (!stopped) frame = requestAnimationFrame(burst);
	});

	return () => {
		stopped = true;
		if (frame !== undefined) cancelAnimationFrame(frame);
	};
}
