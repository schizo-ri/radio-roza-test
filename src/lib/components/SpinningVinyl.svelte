<script>
  let { playing = $bindable(true), ...rest } = $props();
</script>

<div class="vinyl-container" {...rest}>
  <svg
    class="vinyl-record"
    class:spinning={playing}
    style="--rotation-speed: 3s"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Main record disc -->
    <circle cx="100" cy="100" r="95" fill="var(--primary-600)" stroke="#333" stroke-width="1" />

    <!-- Partial groove rings - visible only on opposite sides -->
    <g class="grooves">
      <!-- Left side grooves -->
      <path
        d="M 20 100 A 80 80 0 0 1 60 40"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />
      <path
        d="M 35 100 A 65 65 0 0 1 65 52"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />
      <path
        d="M 50 100 A 50 50 0 0 1 70 65"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />

      <!-- Right side grooves -->
      <path
        d="M 180 100 A 80 80 0 0 1 140 160"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />
      <path
        d="M 165 100 A 65 65 0 0 1 135 148"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />
      <path
        d="M 150 100 A 50 50 0 0 1 130 135"
        fill="none"
        stroke="#ffffff"
        stroke-width="2"
        opacity="0.6"
      />
    </g>

    <!-- Label area -->
    <circle cx="100" cy="100" r="25" fill="#8B0000" stroke="#ffffff" stroke-width="0.5" />

    <!-- Center hole -->
    <circle cx="100" cy="100" r="2" fill="#ffffff" />
  </svg>
</div>

<style>
  .vinyl-container {
    display: inline-block;
    position: relative;
  }

  .vinyl-record {
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  .vinyl-record.spinning {
    animation: spin var(--rotation-speed, 3s) linear infinite;
  }

  .vinyl-record.spinning .grooves {
    animation: fadeGrooves var(--rotation-speed, 3s) linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeGrooves {
    0%,
    25% {
      opacity: 1;
    }
    50%,
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  /* Add a subtle shadow for depth */
  .vinyl-container::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: -1;
    pointer-events: none;
  }
</style>
