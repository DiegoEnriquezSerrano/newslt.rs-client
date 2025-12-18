<script lang="ts">
  import { fly } from 'svelte/transition';
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import FlashMessageStore from '$lib/Stores/FlashMessageStore';
</script>

{#if $FlashMessageStore.length > 0}
  <div
    id="flash-message-container"
    class="flex-column width-100 position-fixed center-horizontal"
    data-testid="flash-message-container"
    in:fly
    out:fly
  >
    {#each $FlashMessageStore as flashMessage}
      <dialog
        class="align-items-start border-rounded-8 border-width-0 flex-row raised-2 squeeze-24 squish-16 stack-16 text-medium width-100 position-relative"
        class:surface-green={flashMessage.type == 'success'}
        class:surface-tomato={flashMessage.type == 'error'}
        onclick={() => FlashMessageService.dismissMessage(Number(flashMessage.id))}
        in:fly
        out:fly
      >
        {flashMessage.message}
      </dialog>
    {/each}
  </div>
{/if}
