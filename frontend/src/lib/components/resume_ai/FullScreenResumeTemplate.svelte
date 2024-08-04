<script>
  import { fade, fly } from "svelte/transition";
  export let open = false;

  function closeModal() {
    open = false;
    dispatchEvent(new CustomEvent("close"));
  }

  $: if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
</script>

<style>
  :global(body) {
    overflow: auto;
  }
</style>

{#if open}
  <div
    in:fade={{ duration: 200 }}
    out:fly={{ duration: 150, y: -500 }}
    class="fixed inset-0 z-50 flex items-center justify-center bg-black
    bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
    <div
      class="wrap-full-screen-resume-template relative m-4 w-2/5 min-w-[40%]
      max-w-[40%] rounded-lg bg-white text-base font-light leading-relaxed
      text-blue-gray-500 shadow-2xl">
      <!-- <div
        class="title-content-dialog-full-screen-resume-template flex items-center p-4 text-2xl font-semibold leading-snug
        text-blue-gray-900">
        It's a simple dialog.
      </div> -->
      <div
        class="relative p-4 border-t border-b border-t-blue-gray-100
        border-b-blue-gray-100">
        <div class="w-full relative h-auto">
          <img
            src="https://www.resumehelp.com/wp-content/uploads/2023/09/Harvard-Resume-Template-Example.svg"
            alt="Image"
            class="w-full max-w-full h-auto" />
        </div>
      </div>
      <div
        class="exit-full-screen-resume-template flex flex-wrap items-center
        justify-end p-2">
        <button
          on:click={closeModal}
          class="px-6 py-3 mr-1 text-xs font-bold text-red-500 uppercase
          transition-all rounded-lg hover:bg-red-500/10 active:bg-red-500/30">
          Cancel
        </button>
        <!-- <button
          on:click={closeModal}
          class="px-6 py-3 text-xs font-bold text-white uppercase transition-all
          rounded-lg bg-gradient-to-tr from-green-600 to-green-400 shadow-md
          hover:shadow-lg active:opacity-[0.85]">
          Confirm
        </button> -->
      </div>

    </div>
    <div
      class="full-screen-template-resume-max-width-screen-exit-btn absolute
      right-0 top-0">
      <button
        on:click={closeModal}
        class="px-5 py-2 mr-1 text-xs font-bold text-red-500 uppercase
        transition-all rounded-lg hover:bg-red-500/10 active:bg-red-500/30">
        <svg
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.75732 7.75745L16.2426 16.2427"
            stroke="#ffffff"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M16.2426 7.75745L7.75732 16.2427"
            stroke="#ffffff"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
        </svg>
      </button>
    </div>
  </div>
{/if}
