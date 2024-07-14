<script>
    import { fly, fade } from 'svelte/transition';
    export let title;
    export let content;
    export let visible = false;
  </script>
  
  {#if visible}
  <div class="absolute inset-x-0 top-0 flex justify-center">
    <div class="mt-2 bg-teal-500 text-sm text-white rounded-lg p-4 max-w-md z-[99]" role="alert" in:fly={{ y: -20, duration: 300 }} out:fly={{ y: -20, duration: 300 }}>
      <span class="font-bold">{title}</span> {content}
    </div>
  </div>
  {/if}
  