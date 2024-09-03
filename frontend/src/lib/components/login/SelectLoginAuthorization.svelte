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
      class="relative m-4 w-full md:w-[80%] lg:w-[50%] xl:w-[30%] min-w-[25%]
      max-w-full rounded-lg bg-white font-sans text-base font-light
      leading-relaxed text-blue-gray-500 antialiased shadow-2xl">

      <!-- Dialog Header -->
      <div
        class="flex items-center justify-between p-4 md:p-6 font-sans text-xl
        md:text-2xl antialiased font-semibold leading-snug text-blue-gray-900">
        <div>
          <h5
            class="block font-sans text-lg md:text-xl antialiased font-semibold
            leading-snug tracking-normal text-blue-gray-900"
            style="margin-bottom: 0px !important">
            Connect an Account
          </h5>
          <p
            class="block font-sans text-sm md:text-base antialiased font-light
            leading-relaxed text-gray-700"
            style="margin-bottom: 0px !important">
            Select the provider you want to use for login authorization
          </p>
        </div>
        <button
          data-ripple-dark="true"
          data-dialog-close="true"
          class="relative h-8 w-8 select-none rounded-lg text-center
          align-middle font-sans text-xs font-medium uppercase
          text-blue-gray-500 transition-all hover:bg-blue-gray-500/10
          active:bg-blue-gray-500/30 disabled:pointer-events-none
          disabled:opacity-50 disabled:shadow-none"
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
        class="relative overflow-y-scroll p-4 md:p-6 !px-5 font-sans text-base
        font-light leading-relaxed text-blue-gray-500 antialiased">
        <div class="mb-6">
          <p
            class="block py-3 font-sans text-base antialiased font-semibold
            leading-relaxed uppercase text-blue-gray-900 opacity-70"
            style="margin-bottom: 0px !important">
            Popular
          </p>
          <ul class="flex flex-col gap-1 mt-3 -ml-2">
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/google/login`;
              }}
              role="menuitem"
              class="mb-4 flex w-full cursor-pointer select-none items-center
              justify-center gap-3 rounded-md px-3 !py-4 pt-[9px] pb-2
              text-start leading-tight shadow-md outline-none transition-all
              hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900
              active:bg-blue-gray-50 active:bg-opacity-80
              active:text-blue-gray-900">
              <img src="/login/google.png" alt="metamask" class="w-6 h-6" />
              <h6
                class="block font-sans text-base antialiased font-semibold
                leading-relaxed tracking-normal uppercase text-blue-gray-900">
                Continue with Google
              </h6>
            </button>
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/facebook/login`;
              }}
              role="menuitem"
              class="mb-1 flex w-full cursor-pointer select-none items-center
              justify-center gap-3 rounded-md px-3 !py-4 pt-[9px] pb-2
              text-start leading-tight shadow-md outline-none transition-all
              hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900
              active:bg-blue-gray-50 active:bg-opacity-80
              active:text-blue-gray-900">
              <img
                src="/login/facebook.png"
                alt="coinbase"
                class="w-6 h-6 rounded-md" />
              <h6
                class="block font-sans text-base antialiased font-semibold
                leading-relaxed tracking-normal uppercase text-blue-gray-900">
                Continue with Facebook
              </h6>
            </button>
          </ul>
        </div>
        <div>
          <p
            class="block py-4 font-sans text-base antialiased font-semibold
            leading-relaxed uppercase text-blue-gray-900 opacity-70"
            style="margin-bottom: 0px !important">
            Other
          </p>
          <ul class="mt-4 -ml-2.5 flex flex-col gap-1">
            <button
              on:click={() => {
                window.location.href = `${END_POINT}/auth/linkedin/login`;
              }}
              role="menuitem"
              class="mb-4 flex w-full cursor-pointer select-none items-center
              justify-center gap-3 rounded-md px-3 !py-4 pt-[9px] pb-2
              text-start leading-tight shadow-md outline-none transition-all
              hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900
              focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900
              active:bg-blue-gray-50 active:bg-opacity-80
              active:text-blue-gray-900">
              <img
                src="/login/linkedin.png"
                alt="trust-wallet"
                class="border rounded-md h-7 w-7 border-blue-gray-50" />
              <h6
                class="block font-sans text-base antialiased font-semibold
                leading-relaxed tracking-normal uppercase text-blue-gray-900">
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
        <p
          class="block font-sans text-sm md:text-base antialiased font-normal
          leading-normal text-gray-700"
          style="margin-bottom: 0px !important">
          Why do we only use authorized login?
        </p>
        <button
          class="select-none rounded-lg border border-gray-900 py-2 px-4
          text-center align-middle font-sans text-xs font-bold uppercase
          text-gray-900 transition-all hover:opacity-75 focus:ring
          focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none
          disabled:opacity-50 disabled:shadow-none"
          type="button">
          Learn More
        </button>
      </div>
    </div>
  </div>
{/if}
