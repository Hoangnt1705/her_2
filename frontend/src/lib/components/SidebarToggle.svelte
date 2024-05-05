<script>
  // import clickOutside from '$lib/utils/clickOutside.js'
  import { sidebar } from '$lib/stores.js'
  import Swipe from '$lib/components/Swipe.svelte'
  import { svg } from '$lib/constants.js'
  import { screenSize } from '$lib/stores.js'

  //   import Swipe from "$lib/components/Swipe.svelte";
  // const handleClickOutside = () => {
  //   if ($sidebar) {
  //     sidebar.set(false)
  //     direction = ''
  //   }
  // }
  export let visible;

  function toggleSidebar() {
    sidebar.update((s) => (s = !s))
  }

  // let direction

  // $: if (direction == 'right') {
  //   sidebar.set(true)
  // } else if (direction == 'left') {
  //   sidebar.set(false)
  // }
</script>

<!-- use:clickOutside on:click_outside={handleClickOutside} -->
  <button class="open-sidebar-responsive" style="visibility:{visible}" on:click={toggleSidebar}>
    {@html svg.openSidebarResponsive}
  </button>
<!-- <Swipe bind:direction /> -->
