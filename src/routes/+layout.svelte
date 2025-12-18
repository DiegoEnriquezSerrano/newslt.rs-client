<script lang="ts">
  import '../app.css';
  import favicon from '$lib/Assets/favicon.svg';
  import FlashMessage from '$lib/Components/FlashMessage.svelte';
  import { viewHeight, viewWidth } from '$lib/Stores/LayoutStore';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/root.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/index.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/background.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/border.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/colors.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/container.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/font.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/fx.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/margin.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/opacity.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/padding.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/position.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/size.min.css" />
  <link rel="stylesheet" href="https://styles.diegoenriquezserrano.dev/gz/text.min.css" />
  <link rel="stylesheet" href="https://fonts.diegoenriquezserrano.dev/css/gz/open-sans.min.css" />
  <link
    rel="stylesheet"
    href="https://fonts.diegoenriquezserrano.dev/css/gz/liberation-mono.min.css"
  />
</svelte:head>

<svelte:window bind:innerWidth={$viewWidth} bind:innerHeight={$viewHeight} />

{@render children()}

<FlashMessage />
