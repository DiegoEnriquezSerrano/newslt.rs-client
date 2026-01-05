<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

{#if data.ok}
  <h3 class="drop-32 center-horizontal">Subscription sucessfully confirmed!</h3>
{:else}
  <h3 class="drop-32 center-horizontal">Invalid confirmation token.</h3>
{/if}
