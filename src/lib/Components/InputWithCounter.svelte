<script lang="ts">
  let {
    value = $bindable(''),
    limit,
    id,
    name,
    placeholder,
    type,
    required = false,
  }: {
    value: string;
    limit: number;
    id: string;
    name: string;
    placeholder: string;
    type: string;
    required?: boolean;
  } = $props();

  let counter = $derived(limit);

  $effect(() => {
    counter = limit - value.length;
  });
</script>

<input
  class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-16 squish-16 sunken-1 surface-char text-color-white"
  {id}
  {name}
  {placeholder}
  {required}
  {type}
  bind:value
/>
<div class="full-width stack-8 text-align-end" class:text-color-scarlet={counter < 0}>
  {counter}
</div>
