<script>
  import { fade, fly } from "svelte/transition";
  import { selectLoginAuthorizationDiaLog } from "$lib/stores.js";
  import { END_POINT } from "$lib/constants.js";
  import axios from "axios";
  function toggleDialog() {
    selectLoginAuthorizationDiaLog.update((s) => !s);
  }
</script>

{#if $selectLoginAuthorizationDiaLog}
  <div
    in:fade
    out:fly
    data-dialog-backdrop="web-3-dialog"
    data-dialog-backdrop-close="true"
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen
    place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity
    duration-300">

    <!-- Dialog Content -->
    <div
      class="relative m-4 w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%]
      lg:max-w-[60%] xl:max-w-[40%] rounded-lg bg-white font-sans text-sm
      md:text-base font-light leading-relaxed text-blue-gray-500 antialiased
      shadow-2xl">

      <!-- Dialog Header -->
      <div
        class="flex items-center justify-between p-3 md:p-6 font-sans text-lg
        md:text-2xl antialiased font-semibold leading-snug text-blue-gray-900">
        <div>
          <h5
            class="block font-sans text-lg md:text-xl antialiased font-semibold
            leading-snug tracking-normal text-blue-gray-900">
            Connect an Account
          </h5>
          <p
            class="block font-sans text-sm md:text-base antialiased font-light
            leading-relaxed text-gray-700">
            Select the provider you want to use for login authorization
          </p>
        </div>
        <button
          data-ripple-dark="true"
          data-dialog-close="true"
          class="relative h-8 w-8 select-none rounded-lg text-center
          align-middle font-sans text-xs font-medium uppercase
          text-blue-gray-500 transition-all hover:bg-blue-gray-500/10
          active:bg-blue-gray-500/30"
          type="button"
          on:click={toggleDialog}>
          <span
            class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2
            left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              class="w-5 h-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>

      <!-- Dialog Body -->
      <div
        class="relative overflow-y-scroll p-4 pt-2 pb-2 md:p-6 font-sans text-sm
        md:text-base font-light leading-relaxed text-blue-gray-500 antialiased">
        <div class="mb-6">
          <p
            class="block py-3 font-sans text-sm md:text-base antialiased
            font-semibold leading-relaxed uppercase text-blue-gray-900
            opacity-70">
            Popular
          </p>
          <ul class="flex flex-col gap-1 mt-3">
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/google/login`;
              }}
              class="mb-4 flex w-full items-center justify-center gap-3
              rounded-md px-3 py-4 text-start leading-tight shadow-md
              transition-all hover:bg-blue-gray-50 hover:bg-opacity-80
              focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50">
              <img src="/login/google.png" alt="google" class="w-6 h-6" />
              <h6 class="font-semibold text-blue-gray-900 uppercase">
                Continue with Google
              </h6>
            </button>
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/facebook/login`;
              }}
              class="mb-2 flex w-full items-center justify-center gap-3
              rounded-md px-3 py-4 text-start leading-tight shadow-md
              transition-all hover:bg-blue-gray-50 hover:bg-opacity-80
              focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50">
              <img src="/login/facebook.png" alt="facebook" class="w-6 h-6" />
              <h6 class="font-semibold text-blue-gray-900 uppercase">
                Continue with Facebook
              </h6>
            </button>
          </ul>
        </div>
        <div>
          <p
            class="block py-2 font-sans text-sm md:text-base font-semibold
            leading-relaxed uppercase text-blue-gray-900 opacity-70">
            Other
          </p>
          <ul class="mt-4 flex flex-col gap-1">
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/linkedin/login`;
              }}
              class="mb-4 flex w-full items-center justify-center gap-3
              rounded-md px-3 py-4 text-start leading-tight shadow-md
              transition-all hover:bg-blue-gray-50 hover:bg-opacity-80
              focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50">
              <img src="/login/linkedin.png" alt="linkedin" class="w-7 h-7 rounded-md" />
              <h6 class="font-semibold text-blue-gray-900 uppercase">
                Continue with Linkedin
              </h6>
            </button>
          </ul>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div
        class="flex flex-wrap items-center justify-between gap-2 p-4 md:p-6
        shrink-0 text-blue-gray-500">
        <p class="text-sm md:text-base font-normal text-gray-700">
          Why do we only use authorized login?
        </p>
        <button
          class="rounded-lg border border-gray-900 py-2 px-4 text-xs
          font-bold uppercase text-gray-900 transition-all hover:opacity-75">
          Learn More
        </button>
      </div>
    </div>
  </div>
{/if}