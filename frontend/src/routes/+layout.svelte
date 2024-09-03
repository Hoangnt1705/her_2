<script>
  import DefaultLayOut from "$lib/components/DefaultLayOut.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import SessionExpired from "$lib/components/dialog/SessionExpired.svelte";
  import { sidebar } from "$lib/stores.js";
  import { page } from "$app/stores";

  // import { setContext } from 'svelte'

  // import { writable } from 'svelte/store'
  // const writableStore = writable(0)
  // setContext('myContext', writableStore)
  export let data;
  const path = ["/"];
  $: console.log($page.url.pathname);
</script>

<DefaultLayOut>
  {#if path.includes($page.url.pathname)}
    <section class="session-main-page">
      <!-- <Sidebar/> -->
      <slot />
    </section>
    <SessionExpired/>
  {:else}
    <slot />
  {/if}
</DefaultLayOut>
