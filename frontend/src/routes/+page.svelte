<script>
  import { user, accessToken } from "$lib/stores.js";
  import "$lib/css/main.css";
  import { getContext, onMount, setContext, tick, onDestroy } from "svelte";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import { svg } from "$lib/constants.js";
  import Nav from "$lib/components/Nav.svelte";
  import { slide, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import UserChooseModel from "$lib/components/UserChooseModel.svelte";
  import ButtonLoginChooseModel from "$lib/components/ButtonLoginChooseModel.svelte";
  let speedDial = true;
  const handleHover = () => {
    speedDial = !speedDial ;
  };
  let clickResumeAI = true;
  let clickParseRecruiter = true;
  const selectHidden = (i) => {
    if (!clickResumeAI || !clickParseRecruiter) return;
    if (i) clickResumeAI = false;
    else clickParseRecruiter = false;
  };
</script>

<svelte:head>
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
  <script
    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" ✂prettier:content✂="CgogIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script> -->
</svelte:head>
<main class="main-page relative" style="padding-bottom:40px">
  <!-- <Nav hiddenNavItems={true} /> -->
  <div
  class="flex items-center justify-end space-x-4 mx-10"
  style="color: #1b254b !important;">
  <div class="home-button-container font-extrabold leading-6 " style="border">
    <a href="/homepage" class="text-base font-semibold m-6 mr-2 group relative w-max items-center gap-1 flex">
      <svg class="shrink-0 size-4 font-extrabold" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span>Home</span>
      <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-slate-900 group-hover:w-3/6"></span>
      <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-slate-900 group-hover:w-3/6"></span>
    </a>
  </div>
  {#if $user && $accessToken}
    <UserChooseModel user={$user} accessToken={$accessToken} />
    {:else}
        <ButtonLoginChooseModel />
  {/if}
  
</div>
  
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
        class="relative h-[200px] w-[350px] border border-solid border-gray-200
        rounded-2xl bg-white p-4 transition-all duration-500 col-span-12 xl:p-7
        lg:col-span-3 md:col-span-6 shadow-none transition-shadow duration-300
        cursor-pointer hover:shadow-lg hover:shadow-gray-400 w">
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
          class="absolute top-0 start-0 size-full bg-white/50 rounded-2xl" />

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
        class="relative h-[200px] w-[350px] border border-solid border-gray-200
        rounded-2xl p-4 transition-all duration-500 col-span-12 xl:p-7
        lg:col-span-3 md:col-span-6 bg-white shadow-none transition-shadow
        duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
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
          class="absolute top-0 start-0 size-full bg-white/50 rounded-2xl" />

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
        on:focus={handleHover}
        on:click={handleHover}
        on:blur={handleHover}>
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
                    5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V16.3823C3
                    19.3402 3 20.8192 3.96543 21.4028C4.93086 21.9863 6.24035
                    21.2988 8.85934 19.9238L10.1407 19.2512C11.0515 18.773
                    11.5069 18.5339 12 18.5339C12.4931 18.5339 12.9485 18.773
                    13.8593 19.2512Z"
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
                    17.9873M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2
                    12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
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
       
        class="flex items-center justify-center text-white rounded-full w-16 h-16 focus:outline-none ml-auto
          bg-gradient-to-r from-[#FF0844] to-[#FED7AA] hover:bg-gradient-to-r hover:from-[#e5073d] hover:to-[#e4c199]">
          {#if speedDial}
          <svg in:fade={{duration:150}}
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            viewBox="0 0 128 128"
            fill="none"
            stroke="#fff"
            stroke-width="3">
            <!-- Adjust stroke-width to make the lines thicker -->
            <path
              fill="#fff"
              d="M29.854 61.262h-3.989V38.316C25.864 17.188 43.253 0 64.626
              0c21.375 0 38.765 17.188 38.765
              38.316v2.903H99.4v-2.903c0-18.928-15.6-34.327-34.774-34.327S29.854
              19.388 29.854 38.316v22.946zM108.134
              127.663h-3.99v-19.824c0-5.166-4.934-9.368-11-9.368H36.111c-6.066
              0-11.003 4.202-11.003 9.368v19.824h-3.989v-19.824c0-7.366
              6.726-13.357 14.992-13.357h57.032c8.266 0 14.99 5.991 14.99
              13.357v19.824z" />
            <path
              fill="#fff"
              d="M65.378 91.94c-14.555
              0-27.228-9.724-30.819-23.648l3.862-.997c3.138 12.162 14.223 20.656
              26.957 20.656 15.338 0 27.816-12.316
              27.816-27.456V38.183h3.989v22.313c.001 17.339-14.267 31.444-31.805
              31.444zM37.33 41.843h-3.989v-2.405c0-5.091 4.181-9.232
              9.318-9.232h50.874c6.307 0 11.437-5.058
              11.437-11.273v-8.86H84.966v-3.99h23.993v12.85c0 8.416-6.92
              15.263-15.426 15.263H42.659c-2.938 0-5.329 2.352-5.329
              5.243v2.404z" />
            <path
              fill="#fff"
              d="M29.675 72.901h-.663c-5.498
              0-9.971-4.428-9.971-9.871V48.588c0-5.443 4.473-9.872
              9.971-9.872h.663c5.497 0 9.97 4.429 9.97 9.872V63.03c0 5.444-4.473
              9.871-9.97 9.871zm-.663-30.195c-3.298 0-5.981 2.639-5.981
              5.882V63.03c0 3.243 2.684 5.882 5.981 5.882h.663c3.298 0
              5.98-2.639
              5.98-5.882V48.588c0-3.243-2.683-5.882-5.98-5.882h-.663zM98.966
              72.901h-.66a9.93 9.93 0 0 1-5.962-1.96l2.379-3.202a5.957 5.957 0 0
              0 3.583 1.173h.66c3.3 0 5.982-2.639
              5.982-5.882V48.588c0-3.243-2.683-5.882-5.982-5.882h-.66a6.01 6.01
              0 0 0-2.549.557l-1.681-3.618a9.957 9.957 0 0 1
              4.229-.928h.66c5.499 0 9.973 4.429 9.973 9.872V63.03c0 5.444-4.473
              9.871-9.972 9.871z" />
            <path
              fill="#fff"
              d="M29.854 61.262h-3.989V38.316C25.864 17.188 43.253 0 64.626
              0v3.989c-19.174 0-34.772 15.399-34.772 34.327v22.946zM69.693
              107.287H58.419l-5.068-8.673 3.444-2.011 3.913
              6.695h6.696l3.914-6.696 3.445 2.013z" />
            <path
              fill="#fff"
              d="m69.87 104.904 3.848 22.424-3.932.675-3.848-22.424zM58.238
              104.895l3.932.674-3.843 22.426-3.932-.674zM93.664
              80.931H70.897v-3.989h22.767c3.163 0 5.736-2.53
              5.736-5.642h3.99c.001 5.31-4.364 9.631-9.726 9.631zM64.425
              50.052h3.989v15.702h-3.989z" />
          </svg>
          {:else}
          <svg in:fade={{duration:150}}
          class="w-5 h-5 transition-transform rotate-45"
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
          {/if}
          <span class="sr-only">Open actions menu</span>
        </button>
      </div>

    </div>
  </div>

</main>
<div class="recommendations fixed bottom-2 text-center">
  <span class="font-normal text-gray-400 text-xs">
    Her can make mistakes. Consider checking important information.
  </span>
</div>
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
