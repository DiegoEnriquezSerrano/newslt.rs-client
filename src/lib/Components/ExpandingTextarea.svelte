<script lang="ts">
  let {
    id,
    limit = undefined,
    name,
    placeholder,
    required = false,
    value = $bindable(''),
  }: {
    id: string;
    limit?: number | undefined;
    name: string;
    placeholder: string;
    required?: boolean;
    value: string;
  } = $props();

  let counter = $derived(limit);
  let element: HTMLTextAreaElement;

  $effect(() => {
    if (limit) counter = limit - value.length;
  });

  $effect(() => {
    fluffTextarea(element);
  });

  function evaluateKeypress(): void {
    fluffTextarea(element);
  }

  function fluffTextarea(textarea: HTMLTextAreaElement): void {
    if (textarea.value === '') {
      textarea.style.height = '';
    } else if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
</script>

<textarea
  {id}
  {name}
  {placeholder}
  {required}
  class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 line-height-large squeeze-16 squish-16 sunken-1 surface-char text-color-white"
  onkeyup={evaluateKeypress}
  rows="2"
  bind:this={element}
  bind:value
></textarea>
{#if limit && counter}
  <div class="full-width text-align-end" class:text-color-scarlet={counter < 0}>
    {counter}
  </div>
{/if}

<style>
  textarea {
    height: auto;
    max-height: 24rem;
    resize: vertical;
    transition: all 100ms ease-in-out;
  }
</style>
