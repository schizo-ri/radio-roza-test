<script>
	import SpinningVinyl from '$lib/components/SpinningVinyl.svelte';

	let playing = $state(true);
	let size = $state(200);
	let speed = $state(3);
</script>

<div class="demo-container">
	<h1>🎵 Spinning Vinyl Record</h1>

	<div class="vinyl-showcase">
		<SpinningVinyl bind:playing {size} {speed} />
	</div>

	<div class="controls">
		<div class="control-group">
			<label>
				<input type="checkbox" bind:checked={playing} />
				Playing
			</label>
		</div>

		<div class="control-group">
			<label for="size">Size: {size}px</label>
			<input
				id="size"
				type="range"
				min="100"
				max="400"
				bind:value={size}
			/>
		</div>

		<div class="control-group">
			<label for="speed">Speed: {speed}s per rotation</label>
			<input
				id="speed"
				type="range"
				min="0.5"
				max="10"
				step="0.5"
				bind:value={speed}
			/>
		</div>
	</div>

	<div class="info">
		<h2>Features</h2>
		<ul>
			<li>🎛️ Controllable play/pause</li>
			<li>📏 Adjustable size (100px - 400px)</li>
			<li>⚡ Variable rotation speed (0.5s - 10s)</li>
			<li>🎨 Realistic vinyl record design</li>
			<li>✨ Smooth CSS animations</li>
			<li>📱 Responsive and scalable SVG</li>
		</ul>
	</div>
</div>

<style>
	.demo-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		color: white;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.vinyl-showcase {
		display: flex;
		justify-content: center;
		margin: 3rem 0;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.controls {
		display: grid;
		gap: 1.5rem;
		margin: 2rem 0;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		backdrop-filter: blur(10px);
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.control-group label {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.control-group input[type="range"] {
		width: 100%;
		height: 8px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 5px;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
	}

	.control-group input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: #fff;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.control-group input[type="range"]::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: #fff;
		border-radius: 50%;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.control-group input[type="checkbox"] {
		width: 20px;
		height: 20px;
		margin-right: 0.5rem;
		accent-color: #ff6b6b;
	}

	.control-group label:has(input[type="checkbox"]) {
		flex-direction: row;
		align-items: center;
		font-size: 1.2rem;
	}

	.info {
		margin-top: 3rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 15px;
		backdrop-filter: blur(10px);
	}

	.info h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.info ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.info li {
		padding: 0.5rem 0;
		font-size: 1.1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.info li:last-child {
		border-bottom: none;
	}

	@media (max-width: 600px) {
		.demo-container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.vinyl-showcase {
			padding: 1rem;
		}
	}
</style>
