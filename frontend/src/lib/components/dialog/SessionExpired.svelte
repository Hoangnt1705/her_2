<script>
  import {sessionExpired} from "$lib/stores.js";
  import { onMount } from 'svelte';
  import {fly} from "svelte/transition";
  import {goto} from "$app/navigation";

  // Function to show the alert dialog when JWT expires
  function handleTokenExpiration() {
    sessionExpired.update(expired => expired = true);
  }

  // Simulating a token expiration event for demonstration
  
  function closeDialog() {
    sessionExpired.update(expired => expired = false);
  }

  function handleLoginAgain() {
    // Logic to redirect user to login page or refresh token
    sessionExpired.update(expired => expired = false);
    goto('/account/login'); // Replace with actual navigation logic
  }
</script>

{#if $sessionExpired}
<div
  data-dialog-backdrop="dialog"
  data-dialog-backdrop-close="true"
  class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
>
  <!-- Dialog content -->
  <div transition:fly={{ y: 20, duration: 300 }}
    data-dialog="dialog"
    class="relative m-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl min-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
  >
    <!-- Dialog header -->
    <div
      class="flex items-center p-4 font-sans text-xl md:text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900"
    >
      Login Timeout
    </div>
    <!-- Dialog message -->
    <div
      class="relative p-4 font-sans text-sm md:text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500"
    >
      Your login session has expired. Please sign in again to continue saving your resume and managing job listings.
    </div>
    <!-- Dialog buttons -->
    <div class="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500 space-x-2">
      <!-- Continue button -->
      <button
        on:click={closeDialog}
        data-ripple-dark="true"
        data-dialog-close="true"
        class="px-4 py-2 md:px-6 md:py-3 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Continue
      </button>
      <!-- Login Again button -->
      <button
        on:click={handleLoginAgain}
        data-ripple-light="true"
        data-dialog-close="true"
        class="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-white border border-red-500 font-sans text-xs font-bold uppercase text-red-500 shadow-md transition-all hover:shadow-lg hover:bg-red-50 active:bg-red-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Login Again
      </button>
    </div>
  </div>
</div>
{/if}
<style>
    /* Adding transition effects */
    [data-dialog-backdrop] {
      pointer-events: none;
    }
    
    [data-dialog="dialog"] {
      transform: translateY(-30px);
      transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }
  
    [data-dialog-backdrop="dialog"].pointer-events-auto {
      opacity: 1;
      pointer-events: auto;
    }
  
    [data-dialog="dialog"].pointer-events-auto {
      opacity: 1;
      transform: translateY(0);
    }
</style>