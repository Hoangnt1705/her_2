<script>
  import "$lib/css/main.css";
  import { getContext, onMount, setContext, tick, onDestroy } from "svelte";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import { svg } from "$lib/constants.js";
  import Nav from "$lib/components/Nav.svelte";
  import { slide, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {activeChatId} from '$lib/stores.js';

  let speedDial = true;
  const handleHover = () => {
    speedDial = !speedDial;
  };
  let clickResumeAI = true;
  let clickParseRecruiter = true;
  const selectHidden = (i) => {
    if(!clickResumeAI || !clickParseRecruiter) return;
    if (i) clickResumeAI = false;
    else clickParseRecruiter = false;
  };
  $: console.log($activeChatId);
</script>


<style>

</style>

<svelte:head>
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
  <script
    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js">

  </script> -->
</svelte:head>
  <main class="main-page relative ">
    <!-- <Nav hiddenNavItems={true} /> -->
    <div
      class="choose-wrap text-justify grid grid-cols-2 h-[95%] m-[auto] .max-h-1
      gap-4 font-bold leading-6 items-center view new-func-view
      -margin-choose-model">
      <div class="text-2xl my-10">
        <h1>Choose the appropriate AI model</h1>
      </div>
      <div class="flex parse-recruiter">
        <a
          on:click={() => selectHidden(false)}
          href="/parse-recruiter"
          data-sveltekit-preload-code
          class="relative h-[200px] w-[350px] border border-solid
          border-gray-200 rounded-2xl bg-white p-4 transition-all duration-500
          col-span-12 xl:p-7 lg:col-span-3 md:col-span-6 shadow-none
          transition-shadow duration-300 cursor-pointer hover:shadow-lg
          hover:shadow-gray-400 w">
          <div class=" mb-6 ">
            {@html svg.internAi}
          </div>
          <h4
            class="text-sm font-semibold mb-2 capitalize transition-all
            duration-500 ">
            Condense Job Posting Information
          </h4>
          <p
            class="text-xs font-normal text-gray-500 transition-all duration-500
            leading-5 ">
            Great information Analysis Functionality
          </p>
          <div
            class:hidden={clickParseRecruiter}
            class="absolute top-0 start-0 size-full bg-white/50 rounded-2xl
            dark:bg-neutral-800/40" />

          <div
            class:hidden={clickParseRecruiter}
            class="absolute top-1/2 start-1/2 transform -translate-x-1/2
            -translate-y-1/2">
            <!-- <div
              class="animate-spin inline-block size-6 border-[3px]
              border-current border-t-transparent text-red-600 rounded-full
              dark:text-blue-500"
              role="status"
              aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div> -->
            <div class="grid gap-3">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin border-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none">
                  <circle
                    cx="15"
                    cy="15"
                    r="14"
                    stroke="#DC2626"
                    stroke-width="2"
                    stroke-dasharray="6 6" />
                </svg>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </a>
        <div style="margin: auto 0;">
          {@html svg.orMain}
        </div>
        <a
          on:click={() => selectHidden(true)}
          href="/resume-ai"
          data-sveltekit-preload-code
          class="relative h-[200px] w-[350px] border border-solid
          border-gray-200 rounded-2xl p-4 transition-all duration-500
          col-span-12 xl:p-7 lg:col-span-3 md:col-span-6 bg-white shadow-none
          transition-shadow duration-300 cursor-pointer hover:shadow-lg
          hover:shadow-gray-400">
          <div class=" mb-6 ">
            {@html svg.seniorAi}
          </div>
          <h4
            class="text-sm font-semibold mb-2 capitalize transition-all
            duration-500 ">
            Resume AI
          </h4>
          <p
            class="text-xs font-normal text-gray-500 transition-all duration-500
            leading-5 ">
            Generate a Resume with AI Using Two-Way Data for Precision.
          </p>
          <div
            class:hidden={clickResumeAI}
            class="absolute top-0 start-0 size-full bg-white/50 rounded-2xl
            dark:bg-neutral-800/40" />

          <div
            class:hidden={clickResumeAI}
            class="absolute top-1/2 start-1/2 transform -translate-x-1/2
            -translate-y-1/2">
            <!-- <div
              class="animate-spin inline-block size-6 border-[3px]
              border-current border-t-transparent text-red-600 rounded-full
              dark:text-blue-500"
              role="status"
              aria-label="loading">
              <span class="sr-only">Loading...</span>
            </div> -->
            <div class="grid gap-3">
              <div class="flex items-center justify-center">
                <svg
                  class="animate-spin border-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none">
                  <circle
                    cx="15"
                    cy="15"
                    r="14"
                    stroke="#DC2626"
                    stroke-width="2"
                    stroke-dasharray="6 6" />
                </svg>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </a>
      </div>
      <div class="relative " style="position: absolute; right: 0; bottom: 10%;">
        <div
          class="absolute right-6 bottom-6 group z-50 speeddial-button"
          aria-hidden="true"
          on:mouseover={handleHover}
          on:focus={handleHover}
          on:mouseout={handleHover}
          on:blur={handleHover}
          on:click={handleHover}>
          <div
            id="speed-dial-menu-dropdown"
            class="speed-dial-menu flex flex-col items-center mb-4 space-y-2
            bg-white shadow-[0px_15px_60px_-4px_rgba(16,24,40,0.10)] rounded-xl
            border border-gray-200"
            class:hidden={speedDial}>
            <ul class="text-sm text-gray-600 p-5">
              <li>
                <a
                  href="javascript:;"
                  class="flex items-center py-4 border-b border-gray-200
                  hover:text-gray-900 ">
                  <svg
                    class="w-6 h-6 mr-3 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.5 11L11 12.5L15 8.5M13.8593 19.2512L15.1407
                      19.9238C17.7596 21.2988 19.0691 21.9863 20.0346 21.4028C21
                      20.8192 21 19.3402 21 16.3823V10C21 6.22876 21 4.34315
                      19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2
                      5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3
                      10V16.3823C3 19.3402 3 20.8192 3.96543 21.4028C4.93086
                      21.9863 6.24035 21.2988 8.85934 19.9238L10.1407
                      19.2512C11.0515 18.773 11.5069 18.5339 12 18.5339C12.4931
                      18.5339 12.9485 18.773 13.8593 19.2512Z"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                  <span class="text-sm font-medium">Favorite</span>
                </a>
              </li>
              <li>
                <a
                  href="javascript:;"
                  class="flex items-center py-4 border-gray-200
                  hover:text-gray-900 ">
                  <svg
                    class="w-6 h-6 mr-3 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 8.94473C9 5.01842 15 5.01842 15 8.94473C15 11.7495
                      12.2737 11.1898 12.2737 14.5543M12.2726 18L12.2829
                      17.9873M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715
                      2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12
                      22Z"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                  <span class="text-sm font-medium">Support</span>
                </a>
              </li>

            </ul>
          </div>
          <button
            type="button"
            aria-expanded="false"
            class="flex items-center justify-center text-white bg-red-500
            rounded-full w-16 h-16 hover:bg-red-600 focus:outline-none ml-auto">
            <svg
              class="w-5 h-5 transition-transform group-hover:rotate-45"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16" />
            </svg>
            <span class="sr-only">Open actions menu</span>
          </button>
        </div>

      </div>
    </div>
    <div class="recommendations fixed bottom-2 text-center">
      <span class="font-normal text-gray-400 text-xs">
        Her can make mistakes. Consider checking important information.
      </span>
    </div>
  </main>
<!-- <Row>
            <Col xs="3">.col-3</Col>
            <Col xs="auto">.col-auto - variable width content</Col>
            <Col xs="3">.col-3</Col>
          </Row>
          <Row>
            <Col xs="6">.col-6</Col>
            <Col xs="6">.col-6</Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col sm="4">.col-sm-4</Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 1 }}>
              .col-sm-6 .order-sm-2 .offset-sm-1
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              .col-sm-12 .col-md-6 .offset-md-3
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
            <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
          </Row>
          <Row cols={2}>
            <Col>col-1</Col>
            <Col>col-2</Col>
            <Col>col-3</Col>
            <Col>col-4</Col>
            <Col>col-5</Col>
            <Col>col-6</Col>
          </Row>
          <Row cols={{ lg: 3, md: 2, sm: 1 }}>
            <Col>col-1</Col>
            <Col>col-2</Col>
            <Col>col-3</Col>
            <Col>col-4</Col>
            <Col>col-5</Col>
            <Col>col-6</Col>
          </Row> -->

<!-- 
          <div class="model-selector">
            <button
            class="gpt-4"
            class:selected={selectedModel === 'gpt-4'}
            on:click={() => selectModel('gpt-4')}>
              <i class="fa fa-wand-magic-sparkles" />
              GPT-4
              <div class="model-info">
                <div class="model-info-box">
                  <p>Our most capable model, great for creative stuff.</p>
  
                  <p class="secondary">Available for Plus users.</p>
                </div>
              </div>
            </button>
            <button
              class="gpt-4"
              class:selected={selectedModel === 'gpt-4'}
              on:click={() => selectModel('gpt-4')}>
              <i class="fa fa-wand-magic-sparkles" />
              GPT-4
              <div class="model-info">
                <div class="model-info-box">
                  <p>Our most capable model, great for creative stuff.</p>
  
                  <p class="secondary">Available for Plus users.</p>
                </div>
              </div>
            </button>
          </div>
         -->

<!-- <div id="message-form">
          <div class="message-wrapper">
            <textarea
              id="message"
              rows="1"
              placeholder="Send a message"
              on:input={updateMessageBoxHeight} />
            <button class="send-button">
              <i class="fa fa-paper-plane" />
            </button>
          </div>
          <div class="disclaimer">
            Her can make mistakes. Consider checking important information.
          </div>
        </div> -->
