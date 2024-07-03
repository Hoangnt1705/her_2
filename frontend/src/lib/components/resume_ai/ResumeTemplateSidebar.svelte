<script>
  import { fade, fly } from 'svelte/transition'
  let sidebarOpen = false

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen
  }
</script>

<style>
  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-closed {
    transform: translateX(100%);
  }
</style>

{#if !sidebarOpen}
  <button
    out:fade={{ duration: 100 }}
    type="button"
    class="absolute right-10 inline-flex items-center justify-center px-8 py-2.5
    overflow-hidden tracking-tighter text-white bg-gray-800 rounded-lg group"
    on:click={toggleSidebar}
    aria-label="Toggle navigation">
    <span class="sr-only">Toggle Navigation</span>
    <span
      class="absolute w-0 h-0 transition-all duration-500 ease-out
      bg-emerald-600 rounded-full group-hover:w-56 group-hover:h-56" />
    <span
      class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30
      bg-gradient-to-b from-transparent via-transparent to-gray-700" />

    <span class="relative text-base font-semibold flex gap-2">
      <svg
        fill="#fff"
        width="25px"
        height="25px"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 7.7148 49.5742 L 48.2852 49.5742 C 53.1836 49.5742 55.6446
          47.1367 55.6446 42.3086 L 55.6446 13.6914 C 55.6446 8.8633 53.1836
          6.4258 48.2852 6.4258 L 7.7148 6.4258 C 2.8398 6.4258 .3554 8.8398
          .3554 13.6914 L .3554 42.3086 C .3554 47.1602 2.8398 49.5742 7.7148
          49.5742 Z M 7.7851 45.8008 C 5.4413 45.8008 4.1288 44.5586 4.1288
          42.1211 L 4.1288 13.8789 C 4.1288 11.4414 5.4413 10.1992 7.7851
          10.1992 L 34.1523 10.1992 L 34.1523 45.8008 Z M 48.2147 10.1992 C
          50.5350 10.1992 51.8708 11.4414 51.8708 13.8789 L 51.8708 42.1211 C
          51.8708 44.5586 50.5350 45.8008 48.2147 45.8008 L 37.8319 45.8008 L
          37.8319 10.1992 Z M 42.3319 18.8945 L 47.3478 18.8945 C 48.0740
          18.8945 48.6836 18.2617 48.6836 17.5820 C 48.6836 16.8789 48.0740
          16.2696 47.3478 16.2696 L 42.3319 16.2696 C 41.6288 16.2696 40.9960
          16.8789 40.9960 17.5820 C 40.9960 18.2617 41.6288 18.8945 42.3319
          18.8945 Z M 42.3319 24.9649 L 47.3478 24.9649 C 48.0740 24.9649
          48.6836 24.3320 48.6836 23.6289 C 48.6836 22.9258 48.0740 22.3398
          47.3478 22.3398 L 42.3319 22.3398 C 41.6288 22.3398 40.9960 22.9258
          40.9960 23.6289 C 40.9960 24.3320 41.6288 24.9649 42.3319 24.9649 Z M
          42.3319 31.0118 L 47.3478 31.0118 C 48.0740 31.0118 48.6836 30.4258
          48.6836 29.7227 C 48.6836 29.0196 48.0740 28.4102 47.3478 28.4102 L
          42.3319 28.4102 C 41.6288 28.4102 40.9960 29.0196 40.9960 29.7227 C
          40.9960 30.4258 41.6288 31.0118 42.3319 31.0118 Z" />
      </svg>
      <span>Resume Templates</span>
    </span>
  </button>
{/if}
<!-- End Navigation Toggle -->

<!-- Sidebar -->
<div
  id="docs-sidebar"
  class:sidebar-open={sidebarOpen}
  class:sidebar-closed={!sidebarOpen}
  class="transition-all duration-300 fixed top-0 right-0 bottom-0 z-50 w-64
  bg-white border-l border-gray-200 pt-10 pb-10 overflow-y-auto lg:block">
  <div class="absolute top-1 left-1">
    <button
    style="padding:5px"
    type="button"
    class="text-gray-500 hover:text-gray-600 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 s-Ya-e_a9uP7N4"
    on:click={toggleSidebar}
    aria-label="Toggle navigation">
    <span class="sr-only">Toggle Navigation</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75732 7.75745L16.2426 16.2427" stroke="black" stroke-width="null" stroke-linecap="round" class="my-path"></path>
        <path d="M16.2426 7.75745L7.75732 16.2427" stroke="black" stroke-width="null" stroke-linecap="round" class="my-path"></path>
    </svg>
  </button>
  </div>
  <div class="px-6 pt-5">
    <span
      class="flex-none text-xl font-semibold dark:text-white"
      href="#"
      aria-label="Brand">
      Please select a resume template for her to create for you.
    </span>
  </div>
  <nav
    class="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
    data-hs-accordion-always-open>
    <ul class="space-y-1.5">
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
      <li>
            <div class="w-full group bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5 transition-all duration-500 hover:shadow-gray-300">
            <div class="rounded-3xl ">
            <img src="https://pagedone.io/asset/uploads/1695365240.png" alt="image" class="rounded-xl w-full h-auto relative z-10 shadow-lg shadow-stone-300">
            </div>
            <div class="flex flex-col items-center justify-center py-6 px-4 gap-4 text-center">

            <p class="text-base font-medium text-gray-500 mb-4 text-left">Basic template</p>
            <div class="flex items-center justify-start w-full gap-4 mb-4">
             
              <a href="#" class="w-10 aspect-square rounded-full bg-gray-50 border-gray-600 border flex items-center justify-center transition-all duration-500 hover:bg-gray-100 hover:border-gray-900"> +20 </a>
            </div>
            <button class="rounded-lg py-2.5 px-6 text-center w-full text-white bg-indigo-600 font-semibold text-lg transition-all duration-500 hover:bg-indigo-700">contact us</button>
            </div>
            </div>
      </li>
      <!-- Add more items as needed -->
    </ul>
  </nav>
</div>
<!-- End Sidebar -->
