<script>
  import { slide, fade, fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import ButtonLogin from '$lib/components/ButtonLogin.svelte';
  import { accessToken, user, sidebar } from '$lib/stores.js'
  import { spring } from 'svelte/motion';
  import { Button, Overlay, MaterialApp } from 'svelte-materialify';
  import { onMount, tick } from 'svelte';
  import { svg, END_POINT } from '$lib/constants.js'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'
  import UserMenu from '$lib/components/UserMenu.svelte';
  import tippy from 'tippy.js';
  import axios from 'axios';
	import 'tippy.js/dist/tippy.css';

  export let isHovered;


  let active = !$sidebar;
  let pathValue = "M12 17V7";
  let rotate = '0deg';
  let content = 'Close sidebar';
  let openSidebarResponsive = $sidebar;

  $: openSidebarResponsive = $sidebar;
  $: active = !$sidebar;
  $: $sidebar ? content = 'Close sidebar' : content = 'Open sidebar';
  $: $sidebar ? rotate = '180deg' : rotate = '0deg';

  function handleHover() {
      pathValue = "M12 17L14 12L12 7";
  }
  function handleOverlay(){
    active = !active;
    sidebar.update(s => s = !s)
  }

  function handleHoverOut() {
    pathValue = "M12 17V7";
  }

  function tooltip(node, options) {
		const tooltip = tippy(node, options);

		return {
			update(options) {
				tooltip.setProps(options);
			},
			destroy() {
				tooltip.destroy();
			}
		};
	};
  onMount(async() => {
    try {
      await axios.get(`${END_POINT}/v1/parse-recruiter/chat`)
    } catch (error) {
      console.log(error)
    }
  })
  
</script>

<div class="wrap-sidebar">
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
    <ul class="conversations h-[600px] max-w-xs flex flex-col overflow-y-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <li class="cursor-pointer inline-flex items-center gap-x-2 py-3 px-4 text-base font-medium text-gray-800 ">
        <button class="conversation-button"><span class="w-2 h-2 inline-block bg-gray-900 rounded-full mr-1"></span> This is a very super long conversation title that doesn't fit</button>
          <div class="fade"></div>
          <div class="edit-buttons">
              <button><i class="fa fa-edit"></i></button>
              <button><i class="fa fa-trash"></i></button>
          </div>
      </li>
      <li class="inline-flex items-center gap-x-2 py-3 px-4 text-base font-medium text-gray-800 ">
        <button class="conversation-button"><span class="w-2 h-2 inline-block bg-emerald-400 rounded-full mr-1"></span> This is a very super long conversation title that doesn't fit</button>
          <div class="fade"></div>
          <div class="edit-buttons">
              <button><i class="fa fa-edit"></i></button>
              <button><i class="fa fa-trash"></i></button>
          </div>
      </li>
      
    </ul>
 

  </div>
  {#if $user && $user?.role}
    <UserMenu user={$user} accessToken={$accessToken}/> 
  {:else}
    <ButtonLogin />
  {/if}
</div>
{#if !openSidebarResponsive}
<div on:click={handleOverlay}>
    <button class="open-sidebar-responsive" style="border: #f5f5f5 solid;">
      {@html svg.openSidebarResponsive}
    </button>
</div>
{/if}
<div class="wrap-open-sidebar-full-screen">
  <div class="open-sidebar-full-screen"
   on:click={async () => {
     sidebar.update((s) => s = !s );
     await tick();
     active = false;

    }}
   on:mouseover={handleHover}
     on:mouseout={handleHoverOut}
     use:tooltip={{ content, delay: 300, theme: 'light', placement: 'right', offset: [0, -1]}}>
    <svg  id="arrow-svg" style="transform: rotate({rotate})" width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Interface / Line_M">
          <path id="Vector" d={pathValue} stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
  </div>  
</div>
</div>
<Overlay
  {active}
  on:click={handleOverlay} />

     <!-- <ul class="conversations">
      <li class="grouping">Yesterday</li>
      <li>
          <button class="conversation-button"><i class="fa fa-message fa-regular"></i> This is a very super long conversation title that doesn't fit</button>
          <div class="fade"></div>
          <div class="edit-buttons">
              <button><i class="fa fa-edit"></i></button>
              <button><i class="fa fa-trash"></i></button>
          </div>
      </li>
      
    </ul> -->