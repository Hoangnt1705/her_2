<script>
  import { fade, fly, slide } from "svelte/transition";
  import { svg } from "$lib/constants.js";
  import "$lib/css/main.css";
  import { onMount, onDestroy } from "svelte";
  import { activeRTSidebar, resumeTemplateID, loadingSelectTemplate } from "$lib/stores.js";
  import { Dialog, Overlay } from "svelte-materialify";
  import FullScreenResumeTemplate from "$lib/components/resume_ai/FullScreenResumeTemplate.svelte";
  import axios from "axios";
  import { END_POINT } from "$lib/constants.js";
  import { lottieExport } from "$lib/utils/lottieFile.js";
  import { selectResume, checkedSelect } from "$lib/context/MainContext.js";
  export let resumeTemplateValue; 
  let lottieContainer;
  let lottiePath =
    "https://lottie.host/1721e596-df86-4ffe-9f5c-67a8a302916f/Eq3csNgIUO.json"; // the path to your animation JSON file;
    let animationInstance;
    let active = false;
  let responsive = false;
  let selectedIndex = null;
  let isOpenFullScreenRT = false;
  let templateData = [];
  $: if (responsive) active = $activeRTSidebar;
  $: if (!$loadingSelectTemplate) resumeTemplateValue = $resumeTemplateID;
  onMount(() => {
    animationInstance = lottieExport(lottieContainer, lottiePath);
  });
  onMount(async () => {
    try {
      const response = await axios.get(`${END_POINT}/v1/resume-template/`);
      templateData = response.data.data.result;
    } catch (error) {
      console.log(error);
    }
  });
  onMount(async () => {
    await checkedSelect();
  })

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust the width as needed

    function handleScreenChange(event) {
      if (event.matches) {
        responsive = true;
        if ($activeRTSidebar) active = true;
      } else {
        responsive = false;
        active = false;
      }
    }

    mediaQuery.addEventListener("change", handleScreenChange);

    // Initial check
    handleScreenChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  });
  onDestroy(() => {
    if (animationInstance) {
      animationInstance.destroy();
    }
  });
  onDestroy(() => activeRTSidebar.update((a) => (a = false)));

  function handleOverlay() {
    active = !active;
    return activeRTSidebar.update((s) => (s = !s));
  }
  function toggleSidebar() {
    if (responsive) {
      active = !active;
    }
    return activeRTSidebar.update((s) => (s = !s));
  }

  function handleClick(index) {
    selectedIndex = selectedIndex === index ? null : index;
  }

  function openModalFullScreenRT() {
    isOpenFullScreenRT = true;
  }

  function closeModalFullScreenRT() {
    isOpenFullScreenRT = false;
  }
</script>

<style>
  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-closed {
    transform: translateX(100%);
  }
  /* .selected {
    border: 2px solid #1E293B; 
    border-radius: 5px;
  } */

  .success-icon {
    position: absolute;
    top: 10px;
    right: 60px;
    width: 24px;
    height: 24px;
  }
</style>

<svelte:head>
  <!-- from node_modules -->
  <!-- <script async src="node_modules/@material-tailwind/html/scripts/ripple.js">

  </script> -->
  <!-- from cdn -->
  <script
    async
    src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js">

  </script>
</svelte:head>

{#if !$activeRTSidebar}
  <div class="relative">
    <button
      out:fade={{ duration: 100 }}
      type="button"
      class="resumeTemplateSidebarBtn absolute inline-flex top-2.5 right-0
      items-center justify-center px-3 py-1.5 overflow-hidden tracking-tighter
      text-white bg-gray-800 rounded-lg group text-[11px] z-[9] hover:bg-gray-900"
      on:click={toggleSidebar}
      aria-label="Toggle navigation">
      <span class="sr-only">Toggle Navigation</span>

      <div class=" wrap-title-resume-template-btn relative gap-1">
        <div>
          <svg
            fill="#fff"
            width="18px"
            height="18px"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon-sidebar-resume-template">
            <path
              d="M 7.7148 49.5742 L 48.2852 49.5742 C 53.1836 49.5742 55.6446
              47.1367 55.6446 42.3086 L 55.6446 13.6914 C 55.6446 8.8633 53.1836
              6.4258 48.2852 6.4258 L 7.7148 6.4258 C 2.8398 6.4258 .3554 8.8398
              .3554 13.6914 L .3554 42.3086 C .3554 47.1602 2.8398 49.5742
              7.7148 49.5742 Z M 7.7851 45.8008 C 5.4413 45.8008 4.1288 44.5586
              4.1288 42.1211 L 4.1288 13.8789 C 4.1288 11.4414 5.4413 10.1992
              7.7851 10.1992 L 34.1523 10.1992 L 34.1523 45.8008 Z M 48.2147
              10.1992 C 50.5350 10.1992 51.8708 11.4414 51.8708 13.8789 L
              51.8708 42.1211 C 51.8708 44.5586 50.5350 45.8008 48.2147 45.8008
              L 37.8319 45.8008 L 37.8319 10.1992 Z M 42.3319 18.8945 L 47.3478
              18.8945 C 48.0740 18.8945 48.6836 18.2617 48.6836 17.5820 C
              48.6836 16.8789 48.0740 16.2696 47.3478 16.2696 L 42.3319 16.2696
              C 41.6288 16.2696 40.9960 16.8789 40.9960 17.5820 C 40.9960
              18.2617 41.6288 18.8945 42.3319 18.8945 Z M 42.3319 24.9649 L
              47.3478 24.9649 C 48.0740 24.9649 48.6836 24.3320 48.6836 23.6289
              C 48.6836 22.9258 48.0740 22.3398 47.3478 22.3398 L 42.3319
              22.3398 C 41.6288 22.3398 40.9960 22.9258 40.9960 23.6289 C
              40.9960 24.3320 41.6288 24.9649 42.3319 24.9649 Z M 42.3319
              31.0118 L 47.3478 31.0118 C 48.0740 31.0118 48.6836 30.4258
              48.6836 29.7227 C 48.6836 29.0196 48.0740 28.4102 47.3478 28.4102
              L 42.3319 28.4102 C 41.6288 28.4102 40.9960 29.0196 40.9960
              29.7227 C 40.9960 30.4258 41.6288 31.0118 42.3319 31.0118 Z" />
          </svg>
        </div>

        <span class="content-center">Resume Templates</span>
      </div>
    </button>
  </div>
{/if}
<!-- End Navigation Toggle -->

<!-- Sidebar -->
<div
  id="docs-sidebar"
  class:sidebar-open={$activeRTSidebar}
  class:sidebar-closed={!$activeRTSidebar}
  class="transition-all duration-300 fixed top-0 right-0 bottom-0 z-10 w-64
  bg-white border-l border-gray-200 pt-10 pb-10 overflow-y-auto lg:block">
  <div class="absolute top-1 left-1">
    <button
      style="padding:5px"
      type="button"
      class="text-gray-500 hover:text-gray-600 text-sm font-semibold
      rounded-full border border-transparent text-gray-800 hover:bg-gray-100
      disabled:opacity-50 disabled:pointer-events-none s-Ya-e_a9uP7N4"
      on:click={toggleSidebar}
      aria-label="Toggle navigation">
      <span class="sr-only">Toggle Navigation</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.75732 7.75745L16.2426 16.2427"
          stroke="black"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path" />
        <path
          d="M16.2426 7.75745L7.75732 16.2427"
          stroke="black"
          stroke-width="null"
          stroke-linecap="round"
          class="my-path" />
      </svg>
    </button>

  </div>

  <nav
    class="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
    data-hs-accordion-always-open>

    <ul class="space-y-1.5">
      {#each templateData as template (template._id)}
        <li
          class="mb-5"
          style="box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3)
          0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;">
          <div
            class="sm:self-end col-span-12 sm:col-span-5 md:col-span-4
            lg:col-span-3 relative">
            <!-- Card -->
            <div class="group relative block rounded-xl overflow-hidden">
              <div
                data-ripple-light="true"
                role="button"
                on:click={() => handleClick(template._id)}
                on:keydown={() => handleClick(template._id)}
                tabindex="0"
                class="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl
                overflow-hidden">
                <img
                  class="h-full group-hover:scale-105 transition-transform
                  duration-500 ease-in-out rounded-xl w-full object-cover"
                  src={template.image_url}
                  alt={template.name} />
                {#if resumeTemplateValue === template._id}
                  <div class="success-icon">
                    <span
                      style=" box-shadow: 4.0px 8.0px 8.0px hsl(0deg 0% 0% /
                      0.38);"
                      class="py-1 px-2 inline-flex items-center gap-x-1 text-xs
                      font-medium bg-teal-100 text-teal-800 rounded-full">
                      <svg
                        class="shrink-0 size-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477
                          2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      Picked
                    </span>
                  </div>
                {/if}
              </div>
              <div class="absolute bottom-0 start-0 end-0 p-2">
                <div
                  class="font-semibold text-gray-800 rounded-lg shadow-xl
                  shadow-blue-gray-900/50 backdrop-blur-sm p-3">
                  <div>
                    <span>{template.name}</span>
                  </div>
                  {#if selectedIndex === template._id}
                    <div class="flex flex-col space-y-2">
                      <button
                        type="button"
                        on:click={() => selectResume(template._id)}
                        class="w-full gap-2 flex content-center items-center
                        delay-50 select-none rounded-lg {resumeTemplateValue == template._id ? 'bg-gray-900' : 'bg-emerald-300'}
                        py-2 px-4 text-center align-middle font-sans text-xs
                        font-bold uppercase text-white shadow-md
                        shadow-gray-900/10 transition-all hover:shadow-lg
                        hover:shadow-gray-900/20 focus:opacity-[0.85]
                        focus:shadow-none active:opacity-[0.85]
                        active:shadow-none disabled:pointer-events-none
                        disabled:opacity-50 disabled:shadow-none">
                        {#if resumeTemplateValue == template._id}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M18.9985 12H5.00146"
                              stroke="#fff"
                              stroke-width="null"
                              stroke-linecap="round"
                              class="my-path" />
                          </svg>
                        {:else}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3
                              16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21
                              7.02944 21 12Z"
                              stroke="#ffffff"
                              stroke-width="null"
                              class="my-path" />
                            <path
                              d="M8 11.7236L9.53269 13.2563C10.1994 13.923
                              10.5327 14.2563 10.9469 14.2563C11.3611 14.2563
                              11.6945 13.923 12.3611 13.2563L16.6704 8.94702"
                              stroke="#ffffff"
                              stroke-width="null"
                              stroke-linecap="round"
                              class="my-path" />
                          </svg>
                        {/if}
                        {resumeTemplateValue == template._id ? 'Unselect' : 'Select'}
                      </button>
                      <button
                        on:click={openModalFullScreenRT}
                        class="w-full gap-2 flex content-center items-center
                        select-none rounded-lg bg-gray-900 py-2 px-4 text-center
                        align-middle font-sans text-xs font-bold uppercase
                        text-white shadow-md shadow-gray-900/10 transition-all
                        hover:shadow-lg hover:shadow-gray-900/20
                        focus:opacity-[0.85] focus:shadow-none
                        active:opacity-[0.85] active:shadow-none
                        disabled:pointer-events-none disabled:opacity-50
                        disabled:shadow-none"
                        type="button">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 6V18M12 6L10 8M12 6L14 8M12 18L14 16M12 18L10
                            16M18 12L6 12M18 12L16 10M18 12L16 14M6 12L8 14M6
                            12L8 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21
                            3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21
                            7.02944 21 12Z"
                            stroke="#ffffff"
                            stroke-width="null"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="my-path" />
                        </svg>
                        Full screen
                      </button>
                    </div>
                  {/if}
                </div>

              </div>
            </div>
            <!-- End Card -->
          </div>
          <!-- End Col -->
        </li>
      {/each}
      <!-- <li>
        <a
          class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm
          text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700
          dark:text-white"
          href="#">
          <svg
            class="size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Dashboard
        </a>
      </li> -->

      <!-- Add more items as needed -->

    </ul>
    <div
      class:hidden={!$loadingSelectTemplate}
      class="absolute top-0 start-0 size-full bg-gray-300 bg-opacity-60
      backdrop-blur-sm ">
      <div
        class="absolute top-1/2 start-1/2 transform -translate-x-1/2
        -translate-y-1/2">
        <div class="grid gap-3">
          <div class="flex items-center justify-center">
            <div
              bind:this={lottieContainer}
              class="mx-auto grid place-items-center w-[200px] h-[200px]" />
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </nav>
</div>

<FullScreenResumeTemplate
  bind:open={isOpenFullScreenRT}
  on:close={closeModalFullScreenRT} />
<!-- Overlay model -->
<Overlay {active} on:click={handleOverlay} />
<!-- End Sidebar -->
