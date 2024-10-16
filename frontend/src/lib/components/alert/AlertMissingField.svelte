<script>
  import { fly, fade } from "svelte/transition";
  export let title;
  export let content;
  export let visible = false;
</script>

{#if visible}
  <div class="absolute inset-x-0 top-0 flex justify-center">
    <div
      class="mt-2 bg-red-500 text-sm text-white rounded-lg p-4 z-[99]
      transition-transform transform max-w-sm sm:max-w-md lg:max-w-lg
      xl:max-w-xl"
      role="alert"
      in:fly={{ y: -20, duration: 300 }}
      out:fly={{ y: -20, duration: 300 }}>
      <span class="font-bold block">{title}</span>
      <p class="mt-2">{content}</p>
    </div>
  </div>
{/if}
