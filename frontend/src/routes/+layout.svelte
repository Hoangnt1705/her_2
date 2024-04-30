<script>
  import DefaultLayOut from '$lib/components/DefaultLayOut.svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { page } from '$app/stores'
  // import { setContext } from 'svelte'

  // import { writable } from 'svelte/store'
  // const writableStore = writable(0)
  // setContext('myContext', writableStore)

  const path = ['/homepage', '/account/login']
</script>

<DefaultLayOut>
  {#if !path.includes($page.url.pathname)}
    <section class="session-main-page" data-sveltekit-reload>
      <Sidebar />
      <slot />
    </section>
  {:else}
    <slot />
  {/if}
</DefaultLayOut>
