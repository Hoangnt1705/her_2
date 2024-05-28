<script>
    import { tweened } from 'svelte/motion';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
  
    export let sender;
    let isOpen = false;
    let collapseHeight = tweened(0, {
      duration: 50,
      easing: quintOut
    });
  
    function toggleCollapse() {
      isOpen = !isOpen;
      collapseHeight.set(isOpen ? content.scrollHeight : 20);
    }
    let content;
    $: collapseHeight.set(20);
  </script>
  
  <style>
    .overflow-hidden {
      overflow: hidden;
    }
  </style>
  
      
      <div
        bind:this={content}
        class="overflow-hidden transition-[height] duration-300 "
        style="height: {$collapseHeight}px;"
        aria-labelledby="hs-show-hide-collapse"
      >
        <div class="hs-collapse w-full">
          <p class="">
            {sender}
        </p>
        </div>
      </div>
      
      <p class="mt-2">
        {#if sender.length > 65}
        <button type="button" class="hs-collapse-toggle inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" on:click={toggleCollapse}>
          <span class:hidden={isOpen}>Read more</span>
          <span class:hidden={!isOpen}>Read less</span>
          <svg class="{isOpen ? 'rotate-180' : ''} flex-shrink-0 size-4 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {/if}
      </p>
  