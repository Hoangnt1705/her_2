<script>
  import TailwindCSS from '../../TailwindCSS.svelte';
  import { slide, fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { logOutHandle } from '$lib/context/MainContext.js';
  import {tick} from 'svelte';

  export let user, accessToken;
  let userMenu = true;
  let showAnimate = false
  async function toggleUserMenu() {
    userMenu = !userMenu
    console.log(userMenu)
    await tick();
    setTimeout(() => {
      showAnimate = !showAnimate
    }, 200)
  }
</script>

<TailwindCSS />
<div class='flex items-center justify-center space-x-4 user-menu' style="color: #1b254b !important" on:click={toggleUserMenu}>
    <img class='w-10 h-10 rounded-full' src={user.role.avatarUrl} alt='Media rounded avatar'>
    <div class='font-medium'>
    <h5 class='text-base font-semibold text-gray-900'>{user.role.name}</h5>
    <span class='text-sm text-gray-500'>{user.email}</span>
    </div>
   <div class:hidden={userMenu} class:show-animate={showAnimate} transition:slide={{ duration: 200, easing: quintOut }}
    id="dropdown-with-dropup"
    class="dropdown-menu rounded-xl shadow-lg bg-white absolute top-10 -translate-y-40 w-60 mt-2 open" aria-labelledby="dropdown-with-dropup">
      <ul class="py-2">
       <li>
         <a class="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium" href="javascript:;"> Notifications </a>
       </li>
       <li>
         <a class="block px-6 py-2 hover:bg-gray-100 text-red-500 font-medium" on:click={() => logOutHandle(accessToken)}> Log Out </a>
       </li>
      </ul>
      </div>
    </div>
