<script>
  import SidebarToggle from './SidebarToggle.svelte'
  import { slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { sidebar } from '$lib/stores.js'
  import Nav from '$lib/components/Nav.svelte'
  import { onMount, getContext } from 'svelte'
  import ButtonLogin from '$lib/components/ButtonLogin.svelte';
  import { accessToken, user } from '$lib/stores.js'
  import { logOutHandle } from '$lib/context/MainContext.js';
  let userMenu = false
  let showAnimate = false
  const myContext = getContext('myContext')
  async function toggleUserMenu() {
    userMenu = !userMenu
    setTimeout(() => {
      showAnimate = !showAnimate
    }, 200)
  }
</script>

<div
  id="sidebar"
  class:hidden={!$sidebar}
  transition:slide={{ duration: 200, quintOut: quintOut }}>
  <div class="float-top">
    <div class="sidebar-controls">
      <button class="new-chat">
        <i class="fa fa-plus" />
        New chat
      </button>
      <SidebarToggle />
    </div>

    <Nav />
  </div>
  {#if $user && $user?.role}
    <div  on:click={toggleUserMenu} class="user-menu" >
      <img src={$user.role.avatarUrl} class="avatar-user"/>
      <button style="overflow: hidden;">
        {$user.role.name}
      </button>
      <i class="fa fa-ellipsis dots" />
      <ul
        class:show={userMenu}
        class:show-animate={showAnimate}
        transition:slide={{ duration: 200, easing: quintOut }}>
        <li>
          <button>My plan</button>
        </li>
        <li>
          <button>Custom instructions</button>
        </li>
        <li>
          <button>Settings &amp; Beta</button>
        </li>
        <li >
          <button on:click={() => logOutHandle($accessToken)}>Log out</button>
        </li>
      </ul>
    </div>
  {:else}
    <ButtonLogin />
  {/if}
</div>
