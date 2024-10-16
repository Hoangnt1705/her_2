<script>
    import TailwindCSS from "../../TailwindCSS.svelte";
    import { slide, fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { logOutHandle } from "$lib/context/MainContext.js";
    import { tick } from "svelte";
    import { statusLogout, messageLogout } from "$lib/stores.js";
  
    export let user, accessToken;
    let userMenu = true;
    let showAnimate = false;
    async function toggleUserMenu() {
      userMenu = !userMenu;
      console.log(userMenu);
      await tick();
      setTimeout(() => {
        showAnimate = !showAnimate;
      }, 200);
    }
  </script>
  
  <TailwindCSS />

    <img
      on:click={toggleUserMenu}
      class="w-10 h-10 rounded-full hover:cursor-pointer shadow-xl"
      src={user.role.avatarUrl}
      alt="Media rounded avatar" />
    <div
      class:hidden={userMenu}
      class:show-animate={showAnimate}
      transition:slide={{ duration: 200, easing: quintOut }}
      id="dropdown-with-dropup"
      class="dropdown-menu rounded-xl shadow-lg bg-white absolute top-[225px]
      -translate-y-40 w-60 mt-2 open z-10"
      aria-labelledby="dropdown-with-dropup">
      <ul class="py-2">
        <li>
          <a
            class="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium hover:cursor-pointer"
            href="javascript:;">
            Notifications
          </a>
        </li>
        <li>
          <a
            class="block px-6 py-2 hover:bg-gray-100 text-red-500 font-medium hover:cursor-pointer"
            on:click={() => logOutHandle(accessToken)}>
            Log Out
          </a>
        </li>
      </ul>
    </div>
  