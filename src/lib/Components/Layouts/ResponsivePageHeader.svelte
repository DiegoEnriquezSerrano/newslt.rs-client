<script lang="ts">
  let { title }: { title: string } = $props();
</script>

<header
  class="border-width-0 border-bottom-width-1 border-color-gray border-style-solid flex-row font-weight-bold full-height full-width justify-content-space-between overflow-x-hidden surface-char"
  style="grid-area: home-page-header;"
  id="home-page-header"
>
  <div class="align-items-center flex-row full-height overflow-x-hidden squeeze-16 text-medium">
    {title}
  </div>
</header>
