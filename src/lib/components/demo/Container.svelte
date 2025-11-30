<script>
	let {
		children,
		maxWidth = '1200px',
		padding = '1rem',
		allowOverflow = false,
		class: className = '',
		...restProps
	} = $props();
</script>

<div
	class="container {className}"
	style:--max-width={maxWidth}
	style:--padding={padding}
	style:overflow-x={allowOverflow ? 'visible' : 'hidden'}
	{...restProps}
>
	{@render children()}
</div>

<style>
	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		padding-left: var(--padding);
		padding-right: var(--padding);
		width: 100%;
		box-sizing: border-box;
	}

	/* Kada je allowOverflow true, sadržaj može "pobjeći" iz kontejnera */
	.container :global(.overflow-content) {
		margin-left: calc(-1 * var(--padding));
		margin-right: calc(-1 * var(--padding));
		padding-left: var(--padding);
		padding-right: var(--padding);
	}

	/* Utility klasa za horizontalne skrolere */
	.container :global(.horizontal-scroller) {
		margin-left: calc(-1 * var(--padding));
		margin-right: calc(-1 * var(--padding));
		padding-left: var(--padding);
		padding-right: var(--padding);
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
	}

	/* Responsive padding */
	@media (max-width: 768px) {
		.container {
			padding-left: max(var(--padding), env(safe-area-inset-left));
			padding-right: max(var(--padding), env(safe-area-inset-right));
		}
	}
</style>
