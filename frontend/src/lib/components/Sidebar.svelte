<script>
  import { slide, fade, fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import Nav from '$lib/components/Nav.svelte'
  import ButtonLogin from '$lib/components/ButtonLogin.svelte';
  import { accessToken, user, sidebar } from '$lib/stores.js'
  import { spring } from 'svelte/motion';
  import { logOutHandle } from '$lib/context/MainContext.js';
  let userMenu = false
  let showAnimate = false
  let isHovered = false;
  let pathValue;

  async function toggleUserMenu() {
    userMenu = !userMenu
    setTimeout(() => {
      showAnimate = !showAnimate
    }, 200)
  }
  
  function handleHover() {
    isHovered = !isHovered;
    if($sidebar){
      if (isHovered) {
      pathValue = "M16 17L14 12L16 7";
    } else {
      pathValue = "M12 17V7";
    }
    }
    else{
      if (isHovered) {
      pathValue = "M12 17L14 12L12 7";
    } else {
      pathValue = "M12 17V7";
    }
    }
    
  }
</script>

<style>
  @keyframes animations{
    0%{
      opacity: 0
    }
    100%{
      opacity: 1;
    }
  }

  #arrow-svg:hover path {
    animation: animations .5s ease-in-out forwards; 
  }
</style>


<div style="display:flex;">
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
<div style="display:flex; align-items: center; opacity: 0.3; transform:translateX(20px); margin-left:-40px; cursor:pointer" on:click={() => sidebar.update((s) => s = !s ) }>
  <div>
    <svg id="arrow-svg" width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" on:mouseover={handleHover} on:mouseout={handleHover}>
        <g id="Interface / Line_M" style="cursor:pointer">
          <path id="Vector" d={pathValue} stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
  </div>  
</div>
</div>
