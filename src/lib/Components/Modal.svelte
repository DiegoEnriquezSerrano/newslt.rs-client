<script lang="ts">
  import Icon from '$lib/Components/Icon.svelte';
  import { classList } from '$lib/utils';
  import type { Snippet } from 'svelte';

  type Size = 'small' | 'medium' | 'large';

  let {
    children,
    show = $bindable(false),
    size = 'small',
  }: { children: Snippet; show: boolean; size?: Size } = $props();

  function close() {
    show = false;
  }
</script>

{#if show}
  <section class="modal-overlay width-100 surface-black-quasi-transparent unblur">
    <section
      class:modal-large={size == 'large'}
      class:modal-medium={size == 'medium'}
      class:modal-small={size == 'small'}
      class={classList([
        'border-color-gray',
        'border-rounded-16',
        'border-style-outset',
        'border-width-2',
        'center-horizontal',
        'drop-32',
        'pull-8',
        'push-8',
        'squeeze-24',
        'squish-24',
        'surface-char',
      ])}
      id="main"
    >
      <section id="base">
        <div class="flex-row justify-content-end">
          <button
            onclick={close}
            onkeypress={close}
            class={classList([
              'align-items-center',
              'border-style-solid',
              'border-width-0',
              'cursor-pointer',
              'flex-row',
              'justify-content-center',
              'squeeze-8',
              'squish-8',
              'surface-char',
              'text-color-cyan',
            ])}
          >
            <Icon type="x" fill="var(--color-gray)" height={[1.5, 'rem']} width={[1.5, 'rem']} />
          </button>
        </div>
        <div
          class="center-horizontal"
          class:max-width-tablet={size === 'medium' || size === 'small'}
        >
          <div class="">
            {@render children()}
          </div>
        </div>
      </section>
    </section>
  </section>
{/if}
