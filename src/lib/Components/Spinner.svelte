<figure
  id="lds-ring"
  class="aspect-ratio-medium-format display-inline-block full-width position-relative"
>
  <div
    class="aspect-ratio-medium-format border-rounded-circle border-style-solid border-color-cyan border-width-5 full-width position-absolute"
    style="animation-delay: -0.45s;"
  ></div>
  <div
    class="aspect-ratio-medium-format border-rounded-circle border-style-solid border-color-cyan border-width-5 full-width position-absolute"
    style="animation-delay: -0.3s;"
  ></div>
  <div
    class="aspect-ratio-medium-format border-rounded-circle border-style-solid border-color-cyan border-width-5 full-width position-absolute"
    style="animation-delay: -0.15s;"
  ></div>
  <div
    class="aspect-ratio-medium-format border-rounded-circle border-style-solid border-color-cyan border-width-5 full-width position-absolute"
  ></div>
</figure>

<style>
  #lds-ring div {
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--color-cyan) transparent transparent transparent;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
