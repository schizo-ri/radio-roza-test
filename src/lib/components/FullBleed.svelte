<script>
  let { children, background = true, variant = 'primary', className = '' } = $props();
  import Wrapper from '$lib/components/Wrapper.svelte';
</script>

<div class="container {background ? 'background' : ''} {className}" data-variant={variant}>
  <Wrapper class={background && variant === 'split' ? 'split-background' : ''}>
    {@render children()}
  </Wrapper>
</div>

<style>
  .background {
    --_noise-texture: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><defs><filter id='n' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='3' stitchTiles='stitch' result='t'/><feColorMatrix type='saturate' values='0' in='t' result='g'/><feComponentTransfer in='g' result='a'><feFuncA type='linear' slope='0.5'/></feComponentTransfer></filter></defs><rect width='100%' height='100%' filter='url(%23n)'/></svg>");

    --_noise-size: 6.5%;

    background-image: var(--_noise-texture), var(--_gradient);
    background-size: var(--_noise-size), auto;
    background-position: center, center;
  }

  .background {
    --_gradient: linear-gradient(
      45deg,
      var(--primary-500),
      var(--primary-600) 20%,
      var(--primary-700) 75%,
      var(--primary-800) 90%,
      var(--primary-900) 100%
    );
  }

  .background[data-variant='secondary'] {
    --_gradient: linear-gradient(
      45deg,
      var(--secondary-500),
      var(--secondary-600) 20%,
      var(--secondary-700) 75%,
      var(--secondary-800) 90%,
      var(--secondary-900) 100%
    );
  }

  .background[data-variant='split'] {
    background-image: var(--_noise-texture);
  }

  :global(.split-background > div) {
    background-image: linear-gradient(
      90deg,
      var(--primary-500) 0%,
      var(--primary-600) 10%,
      var(--primary-700) 30%,
      var(--primary-800) 50%,
      var(--secondary-800) 50%,
      var(--secondary-700) 70%,
      var(--secondary-600) 90%,
      var(--secondary-500) 100%
    );
  }
</style>
