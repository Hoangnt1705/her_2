<script>
  import { fade, fly } from 'svelte/transition'
  import { screenSize } from '$lib/stores.js'
  export let visible
  export let title
  export let content
  export let iconNotification
  let size = 0
  if ($screenSize.width < 760) {
    size = -200
  } else {
    size = 200
  }
</script>

<style>
  .custom {
    z-index: 15;
    position: absolute;
    left: 9%;
    bottom: 50%;
    width: 340px;
  }
  @media screen and (max-width: 760px) {
    .custom {
      left: 20%;
      width: 280px;
      font-size: 12px;
      top: 7%;
    }
  }
</style>

{#if visible}

  <div class="m-auto custom" in:fly={{ y: size, duration: 2000 }} out:fade>
    <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
      <div class="flex flex-row">
        <div class="px-2">
          {@html iconNotification}
        </div>
        <div class="ml-2 mr-6">
          <span class="font-semibold">{title}</span>
          <span class="block text-gray-500">{content}</span>
        </div>
      </div>
    </div>
  </div>
{/if}
