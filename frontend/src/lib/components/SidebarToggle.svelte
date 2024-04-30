<script>
  // import clickOutside from '$lib/utils/clickOutside.js'
  import { sidebar } from '$lib/stores.js'
  import Swipe from '$lib/components/Swipe.svelte'
  //   import Swipe from "$lib/components/Swipe.svelte";
  const handleClickOutside = () => {
    if ($sidebar) {
      sidebar.set(false)
      direction = ''
    }
  }

  function toggleSidebar() {
    sidebar.update((s) => (s = !s))
  }

  let direction

  $: if (direction == 'right') {
    sidebar.set(true)
  } else if (direction == 'left') {
    sidebar.set(false)
  }

</script>

<!-- use:clickOutside on:click_outside={handleClickOutside} -->
<div>
  <button on:click={toggleSidebar} class="hide-sidebar">
    <i class="fa fa-chevron-left" />
  </button>
</div>
<Swipe bind:direction />
