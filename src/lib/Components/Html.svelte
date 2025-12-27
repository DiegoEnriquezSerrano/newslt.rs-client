<script lang="ts">
  let { markupText }: { markupText: string } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{@html markupText}
