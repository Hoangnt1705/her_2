<script>
  import { isLoadGenerateResume } from '$lib/stores.js'
  export let generateResume
</script>

<div class="relative">
  <div class="flex w-full items-center rounded-full">
    <div class="flex-1 border-b border-gray-700" />

    <span class="text-gray-700 text-lg font-semibold leading-8 px-5 py-3">
      {#if $isLoadGenerateResume}
        <svg
          class="animate-spin border-indigo-300"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none">
          <circle
            cx="15"
            cy="15"
            r="14"
            stroke="#000"
            stroke-width="2"
            stroke-dasharray="6 6" />
        </svg>
      {:else}
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11
            3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21
            11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13
            21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3
            13V11Z"
            stroke="black"
            stroke-width="null"
            class="my-path" />
          <path
            d="M16.7695 17.9986L16.7695 10.6152"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M12 6L12 12"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M7.53906 17.9986L7.53906 10.6152"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M16.7695 7.38488L16.7695 6.00146"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M12 15.6953L12 18"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M7.53906 7.38488L7.53906 6.00146"
            stroke="black"
            stroke-width="null"
            stroke-linecap="round"
            class="my-path" />
          <path
            d="M16.6151 10.6154C15.8504 10.6154 15.2305 9.99551 15.2305
            9.23081C15.2305 8.4661 15.8504 7.84619 16.6151 7.84619C17.3798
            7.84619 17.9997 8.4661 17.9997 9.23081C17.9997 9.99551 17.3798
            10.6154 16.6151 10.6154Z"
            stroke="black"
            stroke-width="null"
            class="my-path" />
          <path
            d="M12.0018 12.4634C12.7665 12.4634 13.3864 13.0833 13.3864
            13.848C13.3864 14.6127 12.7665 15.2326 12.0018 15.2326C11.2371
            15.2326 10.6172 14.6127 10.6172 13.848C10.6172 13.0833 11.2371
            12.4634 12.0018 12.4634Z"
            stroke="black"
            stroke-width="null"
            class="my-path" />
          <path
            d="M7.38461 10.6154C6.61991 10.6154 6 9.99551 6 9.23081C6 8.4661
            6.61991 7.84619 7.38462 7.84619C8.14932 7.84619 8.76923 8.46611
            8.76923 9.23081C8.76923 9.99551 8.14932 10.6154 7.38461 10.6154Z"
            stroke="black"
            stroke-width="null"
            class="my-path" />
        </svg>
      {/if}
    </span>
    <div class="flex-1 border-b border-gray-700" />
  </div>
</div>
<div class="relative">
  <button
    on:click={generateResume}
    type="button"
    style="cursor:{$isLoadGenerateResume ? 'not-allowed' : 'pointer'}"
    class="relative group inline-flex items-center px-8 py-2.5 px-6 text-sm
    rounded-lg bg-red-500 text-white cursor-pointer font-semibold text-center
    shadow-xs transition-all duration-500 {$isLoadGenerateResume ? 'opacity-30' : 'hover:bg-red-700'}">
    <svg
      class="mt-[-5px]"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.4816 7.45885C15.7931 6.35499 17.4489 5.80306 18.323
        6.67709C19.197 7.55112 18.6451 9.20691 17.5412 12.5185L15.8077
        17.7189C14.5993 21.3442 13.9951 23.1568 12.7092 23.2878C11.4233 23.4188
        10.4659 21.7653 8.5513 18.4582L8.34896 18.1087C8.08327 17.6497 7.95042
        17.4203 7.7651 17.235C7.57977 17.0496 7.35031 16.9168 6.8914
        16.6511L6.54189 16.4488C3.23479 14.5341 1.58124 13.5768 1.71224
        12.2909C1.84324 11.005 3.65587 10.4007 7.28113 9.19233L12.4816 7.45885Z"
        stroke="#fff"
        stroke-width="null"
        class="my-path" />
      <path
        d="M11.5615 13.4385L7.81384 17.1861"
        stroke="#fff"
        stroke-width="null"
        stroke-linecap="round"
        class="my-path" />
    </svg>
    Generate Resume
  </button>
</div>
