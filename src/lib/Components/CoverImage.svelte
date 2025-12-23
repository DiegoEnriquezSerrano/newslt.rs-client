<script lang="ts">
  let { src = '', alt = '' }: { src: string; alt: string } = $props();
</script>

{#if Boolean(src.trim())}
  <figure
    class="flex-row border-style-outset border-color-gray border-width-2 border-rounded-8 overflow-hidden"
  >
    <img class="aspect-ratio-hd full-width" {src} {alt} />
  </figure>
{/if}
